import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/products.dto';
import { IAuth } from 'utils/interfaces/IAuth';
import { ProductsModel } from 'models/products.model';
import slugify from 'slugify';
import { ImagesModel } from 'models/images.model';
import { IQuery } from 'utils/interfaces/query';
@Injectable()
export class ProductsService {
  async list(query: IQuery, auth: IAuth) {
    return await ProductsModel.query()
      .withGraphFetched('[category,uom]')
      .where((builder) => {
        if (query.q) {
          builder.whereILike('name', `%${query.q}%`);
        }
      })
      .where('company_id', auth.company_id)
      .page(query.page, query.pageSize);
  }
  async create(body: CreateProductDto, auth: IAuth) {
    const payload = {
      ...body,
      company_id: auth.company_id,
      slug: slugify(body.name, { lower: true, strict: true }),
      image: body.images.length > 0 ? body.images[0] : undefined,
      images: undefined,
    };

    const product = await ProductsModel.query().upsertGraphAndFetch(payload);

    await ImagesModel.query().whereIn('path', body.images).update({
      parent_id: product.id,
      updated_by: auth.id,
      model: 'products',
      company_id: auth.company_id,
    });
    return product;
  }
}
