/* eslint-disable @typescript-eslint/no-base-to-string */
import { Injectable } from '@nestjs/common';
import { CreateProductDto, ProductQueryDto } from './dto/products.dto';
import { IAuth } from 'utils/interfaces/IAuth';
import { ProductsModel } from 'models/products.model';
import slugify from 'slugify';
import { ImagesModel } from 'models/images.model';
import { Row } from 'exceljs';
import { UomsModel } from 'models/uoms.model';
import { ProductCategoriesModel } from 'models/product-categories.model';
@Injectable()
export class ProductsService {
  async list(query: ProductQueryDto, auth: IAuth) {
    const result = await ProductsModel.query()
      .withGraphFetched('[category,uom]')
      .where((builder) => {
        if (query.q) {
          builder
            .whereILike('name', `%${query.q}%`)
            .orWhereILike('code', `%${query.q}%`);
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

  async createFromImport(row: Row, auth: IAuth) {
    const uomValue = row.getCell('E').value?.toString(); // Ambil value as string
    if (!uomValue) return; // Skip jika kolom E kosong

    const code = uomValue.toLowerCase().trim();
    const name = uomValue.trim();

    // Gunakan variabel uom untuk menyimpan hasil
    const uom = await UomsModel.findOrCreate(code, name, auth.company_id);

    const catValue = row.getCell('D').value?.toString().trim() || '';
    const catParentValue = row.getCell('C').value?.toString().trim() || '';
    const category = await ProductCategoriesModel.findOrCreate(
      catValue,
      catParentValue,
      auth.company_id,
    );

    const payload = {
      code: row.getCell('A').value as string,
      company_id: auth.company_id,
      name: row.getCell('B').value,
      unit: row.getCell('E').value,
      location: row.getCell('H').value,
      updated_by: auth.id,
      slug: slugify(row.getCell('B').value as any, {
        lower: true,
        trim: true,
        strict: true,
      }),
      uom_id: uom?.id,
      category_id: category?.id,
      purchase_price: row.getCell('F').value as number,
      sell_price: row.getCell('F').value as number,
    };

    const product = await ProductsModel.query()
      .where('code', payload.code)
      .first();

    await ProductsModel.query().upsertGraph({
      ...(product && {
        id: product.id,
      }),
      ...payload,
    } as any);
    return payload;
  }
}
