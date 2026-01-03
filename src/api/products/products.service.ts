import { Injectable } from '@nestjs/common';
import { CreateProductDto, ProductQueryDto } from './dto/products.dto';
import { IAuth } from 'utils/interfaces/IAuth';
import { ProductsModel } from 'models/products.model';
import slugify from 'slugify';
import { ImagesModel } from 'models/images.model';
@Injectable()
export class ProductsService {
  async list(query: ProductQueryDto, auth: IAuth) {
    const result = await ProductsModel.query()
      .withGraphFetched('[category,uom]')
      .where((builder) => {
        if (query.q) {
          builder.whereILike('name', `%${query.q}%`);
        }
        if (query.categoryId) {
          builder.where('category_id', query.categoryId);
        }
      })
      .where('company_id', auth.company_id)
      .page(query.page, query.pageSize);

    const stats = await ProductsModel.query()
      .where('company_id', auth.company_id)
      .first()
      .select([
        ProductsModel.raw(
          'COUNT(CASE WHEN stock <= min_stock THEN 1 END)::INTEGER as low_stock_count',
        ),
        ProductsModel.raw(
          'SUM(stock * purchase_price)::BIGINT as total_inventory_value',
        ),
        ProductsModel.raw(
          'SUM(stock * sell_price)::BIGINT as total_potential_revenue',
        ),
      ]);
    return {
      ...result,
      stats,
    };
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
