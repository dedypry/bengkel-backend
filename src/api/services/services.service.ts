import { Injectable, NotFoundException } from '@nestjs/common';
import { ServiceCategoriesModel } from 'models/service-categories.model';
import { ServicesModel } from 'models/services.model';
import { IQuery } from 'utils/interfaces/query';
import { CreateCategoryDto } from './dto/category.dto';
import { IAuth } from 'utils/interfaces/IAuth';
import { CreateServiceDto } from './dto/service.dto';

@Injectable()
export class ServicesService {
  async list(query: IQuery, auth: IAuth) {
    return await ServicesModel.query()
      .withGraphFetched('[category]')
      .orderBy('created_at', 'desc')
      .where((build) => {
        if (query.q) {
          build.whereILike('name', `%${query.q}%`);
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
}
