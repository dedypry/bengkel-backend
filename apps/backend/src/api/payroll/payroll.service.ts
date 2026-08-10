import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { EmployeeSalariesModel } from 'models/employee-salaries.model';
import { PayrollsModel } from 'models/payrolls.model';
import { PayrollItemsModel } from 'models/payroll-items.model';
import { AttendancesModel } from 'models/attendances.model';
import { UsersModel } from 'models/users.model';
import { IAuth } from 'utils/interfaces/IAuth';
import dayjs from 'utils/helpers/dayjs';
import {
  GeneratePayrollDto,
  PayrollQueryDto,
  SalaryDto,
  UpdatePayrollItemDto,
} from './dto/payroll.dto';
import { IQuery } from 'utils/interfaces/query';

@Injectable()
export class PayrollService {
  // ===================== MASTER GAJI KARYAWAN =====================

  async listSalaries(auth: IAuth, query: IQuery) {
    return await EmployeeSalariesModel.query()
      .withGraphFetched('[user.[profile]]')
      .where('employee_salaries.company_id', auth.company_id)
      .modify((builder) => {
        if (query.q) {
          builder.whereExists(
            UsersModel.query()
              .whereColumn('users.id', 'employee_salaries.user_id')
              .where((b) => {
                b.whereILike('users.name', `%${query.q}%`).orWhereILike(
                  'users.nik',
                  `%${query.q}%`,
                );
              }),
          );
        }
      })
      .orderBy('id', 'desc')
      .page(query.page, query.pageSize);
  }

  async upsertSalary(dto: SalaryDto, auth: IAuth) {
    const user = await UsersModel.query()
      .findById(dto.user_id)
      .where('company_id', auth.company_id)
      .whereNull('deleted_at');

    if (!user) throw new NotFoundException('Karyawan tidak ditemukan');

    const payload = {
      company_id: auth.company_id,
      user_id: dto.user_id,
      salary_type: dto.salary_type,
      base_salary: dto.base_salary,
      allowance: dto.allowance ?? 0,
      deduction: dto.deduction ?? 0,
      note: dto.note,
      is_active: dto.is_active ?? true,
      updated_by: auth.id,
    };

    const existing = await EmployeeSalariesModel.query()
      .where({ company_id: auth.company_id, user_id: dto.user_id })
      .whereNull('deleted_at')
      .first();

    if (existing) {
      return await existing.$query().patchAndFetch(payload as any);
    }

    return await EmployeeSalariesModel.query().insertAndFetch(payload as any);
  }

  async destroySalary(id: number, auth: IAuth) {
    const data = await EmployeeSalariesModel.query()
      .findById(id)
      .where('company_id', auth.company_id)
      .whereNull('deleted_at');

    if (!data) throw new NotFoundException('Data gaji tidak ditemukan');

    await (data.$query() as any).softDelete();
  }

  // ===================== PERIODE PENGGAJIAN =====================

  async list(auth: IAuth, query: PayrollQueryDto) {
    return await PayrollsModel.query()
      .where('company_id', auth.company_id)
      .modify((builder) => {
        if (query.period_type) {
          builder.where('period_type', query.period_type);
        }
        if (query.status) {
          builder.where('status', query.status);
        }
        if (query.q) {
          builder.whereILike('code', `%${query.q}%`);
        }
      })
      .select([
        'payrolls.*',
        PayrollsModel.relatedQuery('items').count().as('total_employee'),
      ])
      .orderBy('id', 'desc')
      .page(query.page, query.pageSize);
  }

  async detail(id: number, auth: IAuth) {
    const payroll = await PayrollsModel.query()
      .findById(id)
      .where('company_id', auth.company_id)
      .whereNull('deleted_at')
      .withGraphFetched('[items(orderByName).[user.[profile]]]')
      .modifiers({
        orderByName: (builder) => {
          builder.orderBy('id', 'asc');
        },
      });

    if (!payroll) throw new NotFoundException('Penggajian tidak ditemukan');

    return payroll;
  }

  async summary(auth: IAuth) {
    const [{ count: totalRun }]: any = await PayrollsModel.query()
      .where('company_id', auth.company_id)
      .whereNull('deleted_at')
      .count();

    const [{ sum: paidAmount }]: any = await PayrollsModel.query()
      .where('company_id', auth.company_id)
      .where('status', 'paid')
      .whereNull('deleted_at')
      .sum('total_amount');

    return {
      total_run: Number(totalRun) || 0,
      paid_amount: Number(paidAmount) || 0,
    };
  }

  async generate(dto: GeneratePayrollDto, auth: IAuth) {
    if (dayjs(dto.period_end).isBefore(dayjs(dto.period_start))) {
      throw new BadRequestException(
        'Tanggal akhir tidak boleh sebelum tanggal mulai',
      );
    }

    const salaries = await EmployeeSalariesModel.query()
      .where('company_id', auth.company_id)
      .where('is_active', true)
      .whereNull('deleted_at');

    if (salaries.length === 0) {
      throw new BadRequestException(
        'Belum ada karyawan dengan konfigurasi gaji aktif',
      );
    }

    const code = await this.generateCode(auth.company_id);

    const payroll = await PayrollsModel.query().insertAndFetch({
      company_id: auth.company_id,
      code,
      period_type: dto.period_type,
      period_start: dto.period_start,
      period_end: dto.period_end,
      status: 'draft',
      note: dto.note,
      total_amount: 0,
      created_by: auth.id,
      updated_by: auth.id,
    } as any);

    let total = 0;

    for (const salary of salaries) {
      const attendance = await this.attendanceStats(
        auth.company_id,
        salary.user_id,
        dto.period_start,
        dto.period_end,
      );

      const base = this.computeBase(
        salary,
        dto.period_type,
        attendance.present_days,
      );
      const allowance = Number(salary.allowance) || 0;
      const deduction = Number(salary.deduction) || 0;
      const gross = base + allowance;
      const net = gross - deduction;

      await PayrollItemsModel.query().insert({
        company_id: auth.company_id,
        payroll_id: payroll.id,
        user_id: salary.user_id,
        salary_type: salary.salary_type,
        base_salary: base,
        allowance,
        overtime_amount: 0,
        bonus: 0,
        deduction,
        gross,
        net,
        present_days: attendance.present_days,
        absent_days: attendance.absent_days,
        late_count: attendance.late_count,
        status: 'pending',
      } as any);

      total += net;
    }

    await payroll.$query().patch({ total_amount: total } as any);

    return await this.detail(payroll.id, auth);
  }

  async updateItem(id: number, dto: UpdatePayrollItemDto, auth: IAuth) {
    const item = await PayrollItemsModel.query()
      .findById(id)
      .where('company_id', auth.company_id)
      .withGraphFetched('payroll');

    if (!item) throw new NotFoundException('Item penggajian tidak ditemukan');

    if (item.payroll?.status === 'paid') {
      throw new BadRequestException(
        'Penggajian sudah dibayar dan tidak dapat diubah',
      );
    }

    const base = dto.base_salary ?? (Number(item.base_salary) || 0);
    const allowance = dto.allowance ?? (Number(item.allowance) || 0);
    const overtime = dto.overtime_amount ?? (Number(item.overtime_amount) || 0);
    const bonus = dto.bonus ?? (Number(item.bonus) || 0);
    const deduction = dto.deduction ?? (Number(item.deduction) || 0);

    const gross = base + allowance + overtime + bonus;
    const net = gross - deduction;

    await item.$query().patch({
      base_salary: base,
      allowance,
      overtime_amount: overtime,
      bonus,
      deduction,
      gross,
      net,
      note: dto.note ?? item.note,
    } as any);

    await this.recalculateTotal(item.payroll_id);

    return await this.detail(item.payroll_id, auth);
  }

  async pay(id: number, auth: IAuth) {
    const payroll = await PayrollsModel.query()
      .findById(id)
      .where('company_id', auth.company_id)
      .whereNull('deleted_at');

    if (!payroll) throw new NotFoundException('Penggajian tidak ditemukan');

    if (payroll.status === 'paid') {
      throw new BadRequestException('Penggajian sudah dibayar');
    }

    await payroll.$query().patch({
      status: 'paid',
      paid_at: new Date().toISOString(),
      updated_by: auth.id,
    } as any);

    await PayrollItemsModel.query()
      .patch({ status: 'paid' } as any)
      .where('payroll_id', id);

    return await this.detail(id, auth);
  }

  async destroy(id: number, auth: IAuth) {
    const payroll = await PayrollsModel.query()
      .findById(id)
      .where('company_id', auth.company_id)
      .whereNull('deleted_at');

    if (!payroll) throw new NotFoundException('Penggajian tidak ditemukan');

    if (payroll.status === 'paid') {
      throw new BadRequestException(
        'Penggajian yang sudah dibayar tidak dapat dihapus',
      );
    }

    await (payroll.$query() as any).softDelete();
  }

  // ===================== HELPERS =====================

  private async generateCode(companyId: number) {
    const [{ count }]: any = await PayrollsModel.query()
      .where('company_id', companyId)
      .count();

    const sequence = (Number(count) + 1).toString().padStart(4, '0');

    return `PR-${dayjs().format('YYYYMM')}-${sequence}`;
  }

  private computeBase(
    salary: EmployeeSalariesModel,
    periodType: string,
    presentDays: number,
  ): number {
    const base = Number(salary.base_salary) || 0;

    if (salary.salary_type === 'daily') {
      return base * presentDays;
    }

    if (salary.salary_type === periodType) {
      return base;
    }

    if (salary.salary_type === 'monthly' && periodType === 'weekly') {
      return Math.round(base / 4);
    }

    if (salary.salary_type === 'weekly' && periodType === 'monthly') {
      return base * 4;
    }

    return base;
  }

  private async attendanceStats(
    companyId: number,
    userId: number,
    start: string,
    end: string,
  ) {
    const rows = await AttendancesModel.query()
      .where('company_id', companyId)
      .where('user_id', userId)
      .whereBetween('date', [start, end])
      .whereNull('deleted_at');

    const present_days = rows.filter((r) =>
      ['present', 'late'].includes(r.status || ''),
    ).length;
    const late_count = rows.filter((r) => r.status === 'late').length;
    const absent_days = rows.filter((r) => r.status === 'absent').length;

    return { present_days, late_count, absent_days };
  }

  private async recalculateTotal(payrollId: number) {
    const [{ sum }]: any = await PayrollItemsModel.query()
      .where('payroll_id', payrollId)
      .sum('net');

    await PayrollsModel.query()
      .findById(payrollId)
      .patch({ total_amount: Number(sum) || 0 } as any);
  }
}
