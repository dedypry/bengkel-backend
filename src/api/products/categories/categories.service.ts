import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductCategoriesModel } from 'models/product-categories.model';
import { IAuth } from 'utils/interfaces/IAuth';
import { IQuery } from 'utils/interfaces/query';
import { CreateCategoryDto } from './dto/categories.dto';
import slugify from 'slugify';
import { fn } from 'objection';

@Injectable()
export class CategoriesService {
  async list(query: IQuery, auth: IAuth) {
    return await ProductCategoriesModel.query()
      .select([
        'product_categories.*',
        ProductCategoriesModel.relatedQuery('products')
          .count()
          .as('total_product'),
      ])
      .where((builder) => {
        if (query.q) {
          builder.whereILike('name', `%${query.q}%`);
        }
      })
      .where((builder) => {
        builder.where('company_id', auth.company_id).orWhereNull('company_id');
      });
  }

  async create(body: CreateCategoryDto, auth: IAuth) {
    const payload = {
      ...body,
      slug: slugify(body.name, { lower: true, strict: true }),
      company_id: auth.company_id,
      updated_by: auth.id,
    };

    if (body.id) {
      const category = await ProductCategoriesModel.query().findById(body.id);

      if (!category) throw new NotFoundException();

      await category.$query().patch(payload);
    } else {
      await ProductCategoriesModel.query().insert(payload);
    }
  }

  async destroy(id: number, auth: IAuth) {
    const category = await ProductCategoriesModel.query().findById(id);

    if (!category) throw new NotFoundException();

    await category.$query().patch({
      deleted_at: fn.now(),
      updated_by: auth.id,
    });
  }
}
