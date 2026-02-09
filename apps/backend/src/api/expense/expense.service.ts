import { Injectable } from '@nestjs/common';
import { ExpenseCategoriesModel } from 'models/expense-categories.model';
import { IAuth } from 'utils/interfaces/IAuth';
import { ExpenseCreateDto } from './dto/expense.dto';
import { ExpensesModel } from 'models/expenses.model';
import { IQuery } from 'utils/interfaces/query';

@Injectable()
export class ExpenseService {
  async list(query: IQuery, auth: IAuth) {
    return await ExpensesModel.query()
      .where('company_id', auth.company_id)
      .where((builder) => {
        if (query.q) {
          builder.whereILike('title', `%${query.q}%`);
        }
      })
      .orderBy('id', 'desc')
      .page(query.page, query.pageSize);
  }

  async listCategories(auth: IAuth) {
    return await ExpenseCategoriesModel.query()
      .where('company_id', auth.company_id)
      .orWhereNull('company_id');
  }

  async createExpense(body: ExpenseCreateDto, auth: IAuth) {
    const payload: any = {
      ...body,
      company_id: auth.company_id,
      updated_by: auth.id,
    };
    if (!body.id) {
      const lastExpense = await ExpensesModel.query()
        .where('company_id', auth.company_id)
        .orderBy('id', 'desc')
        .first();

      let nextNumber = 1;

      if (lastExpense && lastExpense.expense_code) {
        const lastNumberStr = lastExpense.expense_code.split('-')[1];
        if (lastNumberStr) {
          nextNumber = parseInt(lastNumberStr, 10) + 1;
        }
      }

      const paddedNumber = String(nextNumber).padStart(4, '0');
      payload['expense_code'] = `EXP-${paddedNumber}`;
    }
    await ExpensesModel.query().upsertGraph(payload as any);

    return 'Pengeluaran berhasil dicatat';
  }
}
