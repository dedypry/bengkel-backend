/* eslint-disable @typescript-eslint/no-misused-promises */
import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductCategoriesModel } from 'models/product-categories.model';
import { IAuth } from 'utils/interfaces/IAuth';
import { CategoryQueryDto, CreateCategoryDto } from './dto/categories.dto';
import slugify from 'slugify';
import { fn, raw } from 'objection';

@Injectable()
export class CategoriesService {
  async list(query: CategoryQueryDto, auth: IAuth) {
    return await ProductCategoriesModel.query()
      .modify('childrens')
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
      })
      .orderBy('id', 'desc');
  }

  async detail(id: number, auth: IAuth) {
    const cat = await ProductCategoriesModel.query().findOne({
      id,
      company_id: auth.company_id,
    });

    if (!cat) throw new NotFoundException();

    return cat;
  }

  async slug(name: string, counter: number = 0): Promise<string> {
    const suffix = counter > 0 ? `-${counter}` : '';
    const sl = slugify(name + suffix, { lower: true, strict: true });
    const findSlug = await ProductCategoriesModel.query()
      .where('slug', sl)
      .first();

    if (!findSlug) return sl;

    return await this.slug(name, counter + 1);
  }

  async create(body: CreateCategoryDto, auth: IAuth) {
    const subCategories = await Promise.all(
      (body.subCategories || []).map(async (e) => ({
        ...e,
        slug: await this.slug(e.name),
      })),
    );

    const payload = {
      ...body,
      slug: await this.slug(body.name),
      company_id: auth.company_id,
      updated_by: auth.id,
    };

    delete payload.subCategories;

    await ProductCategoriesModel.transaction(async (trx) => {
      if (body.id) {
        const category = await ProductCategoriesModel.query(trx).findById(
          body.id,
        );

        if (!category) throw new NotFoundException();

        await category.$query(trx).patch(payload);

        const ids: number[] = [];

        for (const cat of subCategories || []) {
          if (cat?.id) {
            ids.push(cat.id);
            await ProductCategoriesModel.query(trx).updateAndFetchById(cat.id, {
              ...cat,
              parent_id: category.id,
            });
          } else {
            const dt = await ProductCategoriesModel.query(trx).insert({
              ...cat,
              parent_id: category.id,
            });

            ids.push(dt.id);
          }
        }

        await ProductCategoriesModel.query(trx)
          .whereNotIn('id', ids)
          .where('parent_id', category.id)
          .update({
            deleted_at: fn.now(),
            updated_by: auth.id,
            slug: raw("CONCAT(slug, '_delete_', id)"),
          });
      } else {
        await ProductCategoriesModel.query(trx).insertGraph({
          ...payload,
          children: subCategories,
        } as any);
      }
    });
  }

  async destroy(id: number, auth: IAuth) {
    const category = await ProductCategoriesModel.query().findById(id);

    if (!category) throw new NotFoundException();

    await category.$query().patch({
      deleted_at: fn.now(),
      updated_by: auth.id,
      slug: category.slug + '_delete_' + category.id,
    });
  }
}
