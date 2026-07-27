import { Injectable, NotFoundException } from '@nestjs/common';
import { ServiceCategoriesModel } from 'models/service-categories.model';
import { ServicesModel } from 'models/services.model';
import { IQuery } from 'utils/interfaces/query';
import { CreateCategoryDto } from './dto/category.dto';
import { IAuth } from 'utils/interfaces/IAuth';
import { CreateServiceDto } from './dto/service.dto';
import { fn } from 'objection';

@Injectable()
export class ServicesService {
  private buildServiceQuery(query: IQuery, auth: IAuth) {
    return ServicesModel.query()
      .withGraphFetched('[category]')
      .orderBy('created_at', 'desc')
      .where((build) => {
        if (query.q) {
          build
            .whereILike('name', `%${query.q}%`)
            .orWhereILike('code', `%${query.q}%`);
        }
      })
      .where('company_id', auth.company_id);
  }

  async list(query: IQuery, auth: IAuth) {
    const qb = this.buildServiceQuery(query, auth);

    if (query.noPaginate == 1) {
      return await qb;
    }

    return qb.page(query.page, query.pageSize);
  }

  async exportList(query: IQuery, auth: IAuth): Promise<ServicesModel[]> {
    return await this.buildServiceQuery(query, auth);
  }

  async createService(body: CreateServiceDto, auth: IAuth) {
    const payload = {
      ...body,
      company_id: auth.company_id,
    };

    if (body.id) {
      const service = await ServicesModel.query().findById(body.id);
      if (!service) throw new NotFoundException();
      return await service.$query().patch(payload as any);
    }
    return await ServicesModel.query().insert(payload as any);
  }

  async listCategory() {
    return await ServiceCategoriesModel.query();
  }

  async createCategory(body: CreateCategoryDto, auth: IAuth) {
    const category = await ServiceCategoriesModel.query().upsertGraph({
      id: body?.id || undefined,
      name: body.name,
      description: body.description,
      company_id: auth.company_id,
    });

    return category;
  }

  private importCellString(row: Record<string, unknown>, key: string): string {
    const value = row[key];
    if (value == null || value === '') return '';
    if (typeof value === 'string' || typeof value === 'number') {
      return String(value).trim();
    }
    return '';
  }

  private parseImportNumber(value?: string | number | null): number {
    if (value == null || value === '') return 0;
    if (typeof value === 'number') return Number.isFinite(value) ? value : 0;
    // Format ID: 100.000 / 100,5 → hapus pemisah ribuan, koma jadi desimal
    const normalized = String(value)
      .replace(/\s/g, '')
      .replace(/\./g, '')
      .replace(/,/g, '.');
    const parsed = Number(normalized);
    return Number.isFinite(parsed) ? parsed : 0;
  }

  private parseDurationType(value?: string): string {
    const unit = (value || '').toLowerCase().trim();
    if (unit.includes('menit')) return 'minutes';
    if (unit.includes('hari')) return 'days';
    if (unit.includes('jam')) return 'hours';
    return 'hours';
  }

  async createFromImport(row: Record<string, unknown>, auth: IAuth) {
    // Format: A KODE, B NAMA, C GRUP, D SUB GRUP, E HARGA JUAL,
    // F PAJAK %, G WAKTU, H KETERANGAN (Menit/Jam/Hari)
    const code = this.importCellString(row, 'A');
    const name = this.importCellString(row, 'B');
    if (!code || !name) return;

    const group = this.importCellString(row, 'C');
    const subGroup = this.importCellString(row, 'D');
    const categoryName = subGroup || group;
    if (!categoryName) return;

    const category = await ServiceCategoriesModel.findOrCreate(
      categoryName,
      subGroup ? group : undefined,
      auth.company_id,
    );

    const payload = {
      code,
      name,
      price: this.parseImportNumber(row.E as string | number | null),
      ppn: this.parseImportNumber(row.F as string | number | null),
      estimated_duration: this.parseImportNumber(
        row.G as string | number | null,
      ),
      estimated_type: this.parseDurationType(this.importCellString(row, 'H')),
      category_id: category?.id,
      updated_by: auth.id,
      company_id: auth.company_id,
    };

    const service = await ServicesModel.query()
      .where({ code: payload.code, company_id: auth.company_id })
      .first();

    if (service) {
      await service.$query().patch(payload as any);
    } else {
      await ServicesModel.query().insert(payload as any);
    }
  }

  async destroy(id: number, auth: IAuth) {
    console.log(auth, id);
    const find = await ServicesModel.query().findOne({
      id,
      company_id: auth.company_id,
    });

    if (!find) throw new NotFoundException();

    await find.$query().patch({
      deleted_at: fn.now(),
      updated_by: auth.id,
    });

    return 'Data berhasil dihapus';
  }
}
