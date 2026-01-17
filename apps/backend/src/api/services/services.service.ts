import { Injectable, NotFoundException } from '@nestjs/common';
import { ServiceCategoriesModel } from 'models/service-categories.model';
import { ServicesModel } from 'models/services.model';
import { IQuery } from 'utils/interfaces/query';
import { CreateCategoryDto } from './dto/category.dto';
import { IAuth } from 'utils/interfaces/IAuth';
import { CreateServiceDto } from './dto/service.dto';
import { Row } from 'exceljs';
import { getRow } from 'utils/helpers/global';

@Injectable()
export class ServicesService {
  async list(query: IQuery, auth: IAuth) {
    return await ServicesModel.query()
      .withGraphFetched('[category]')
      .orderBy('created_at', 'desc')
      .where((build) => {
        if (query.q) {
          build
            .whereILike('name', `%${query.q}%`)
            .orWhereILike('code', `%${query.q}%`);
        }
      })
      .where('company_id', auth.company_id)
      .page(query.page, query.pageSize);
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

  async createFromImport(row: Row, auth: IAuth) {
    const category = await ServiceCategoriesModel.findOrCreate(
      getRow(row, 'D') || getRow(row, 'C'),
      getRow(row, 'C'),
      auth.company_id,
    );
    const payload = {
      code: getRow(row, 'A'),
      name: getRow(row, 'B'),
      price: getRow(row, 'E'),
      estimated_duration: getRow(row, 'G'),
      estimated_type: 'hours',
      category_id: category?.id,
      updated_by: auth.id,
      company_id: auth.company_id,
    };

    const es = getRow(row, 'G').toLowerCase();
    if (es) {
      if (es === 'menit') {
        payload.estimated_type = 'minutes';
      } else if (es === 'hari') {
        payload.estimated_type = 'days';
      }
    }

    const service = await ServicesModel.query().findOne('code', payload.code);

    if (service) {
      await service.$query().patch(payload as any);
    } else {
      await ServicesModel.query().insert(payload as any);
    }
  }
}
