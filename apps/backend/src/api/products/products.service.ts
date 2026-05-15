/* eslint-disable @typescript-eslint/no-base-to-string */
import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateProductDto,
  ProductQueryDto,
  UpdateStockDto,
} from './dto/products.dto';
import { IAuth } from 'utils/interfaces/IAuth';
import { ProductsModel } from 'models/products.model';
import slugify from 'slugify';
import { ImagesModel } from 'models/images.model';
import { Row } from 'exceljs';
import { UomsModel } from 'models/uoms.model';
import { ProductCategoriesModel } from 'models/product-categories.model';
import { fn, raw } from 'objection';
import { WorkOrderItemsModel } from 'models/work-order-items.model';
import { OrderItemsModel } from 'models/order-items.model';
import { UploadService } from '../upload/upload.service';
@Injectable()
export class ProductsService {
  constructor(private readonly uploadService: UploadService) {}

  private categoryRowWithoutGraph(
    category: ProductCategoriesModel,
  ): Record<string, unknown> {
    const row = { ...category } as Record<string, unknown>;
    delete row.parent;
    delete row.children;
    return row;
  }

  private groupCategoriesByParent(categories: ProductCategoriesModel[]) {
    const grouped = new Map<number, Record<string, unknown>>();

    for (const category of categories) {
      if (category.parent_id && category.parent) {
        const parentId = category.parent.id;
        if (!grouped.has(parentId)) {
          grouped.set(parentId, {
            ...this.categoryRowWithoutGraph(category.parent),
            children: [],
          });
        }
        (grouped.get(parentId)!.children as Record<string, unknown>[]).push(
          this.categoryRowWithoutGraph(category),
        );
      } else if (!grouped.has(category.id)) {
        grouped.set(category.id, {
          ...this.categoryRowWithoutGraph(category),
          children: [],
        });
      }
    }

    return [...grouped.values()];
  }
  async list(query: ProductQueryDto, auth: IAuth, isDownload: boolean = false) {
    let queryData: any = ProductsModel.query()
      .withGraphFetched('[category.parent,uom]')
      .where((builder) => {
        if (query.q) {
          builder
            .whereILike('products.name', `%${query.q}%`)
            .orWhereILike('products.code', `%${query.q}%`);
        }
        if (query.categoryId) {
          builder.where('category_id', query.categoryId);
        }
      })
      .where('products.company_id', auth.company_id)
      .orderByRaw('CAST(stock AS NUMERIC) ASC');

    if (isDownload) {
      return await queryData;
    }

    queryData = queryData.page(query.page, query.pageSize);

    if (query.noStats === 1) {
      return await queryData;
    }

    const catIds = await ProductsModel.query()
      .select('category_id')
      .where('products.company_id', auth.company_id)
      .groupBy('category_id');

    const [result, stats, categories] = await Promise.all([
      queryData,
      ProductsModel.query()
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
        ]),
      ProductCategoriesModel.query()
        .withGraphFetched('parent')
        .whereIn(
          'id',
          catIds.map((e) => e.category_id),
        ),
    ]);

    return {
      ...result,
      stats: {
        ...stats,
        categories: this.groupCategoriesByParent(categories),
      },
    };
  }

  async detail(id: number, auth: IAuth) {
    return await ProductsModel.query()
      .withGraphFetched('[category.parent,uom,images]')
      .findOne({
        id,
        company_id: auth.company_id,
      });
  }

  async create(body: CreateProductDto, auth: IAuth) {
    const payload = {
      ...body,
      company_id: auth.company_id,
      slug: slugify(body.name, { lower: true, strict: true }),
      image: body.images.length > 0 ? body.images[0] : undefined,
      images: undefined,
    };

    const result = await ProductsModel.transaction(async (trx) => {
      let product = null as ProductsModel | null;

      if (body?.id) {
        product = await ProductsModel.query(trx).updateAndFetchById(
          body.id,
          payload,
        );
      } else {
        product = await ProductsModel.query(trx).insert(payload);
      }

      const images = await ImagesModel.query()
        .where('parent_id', product?.id)
        .whereNotIn('path', body.images);

      if (images.length > 0) {
        await Promise.all(
          images.map((e) => this.uploadService.deleteFileByUrl(e.path)),
        );
      }

      await ImagesModel.query().whereIn('path', body.images).update({
        parent_id: product.id,
        updated_by: auth.id,
        model: 'products',
        company_id: auth.company_id,
      });

      return product;
    });

    return result;
  }

  async updateStock(id: number, body: UpdateStockDto, auth: IAuth) {
    const product = await ProductsModel.query().findById(id);

    if (!product) throw new NotFoundException();

    await product.$query().patch({
      stock: body.stock,
      updated_by: auth.id,
    });

    return 'Stock berhasil diperbaharui';
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

  async destroy(id: number, auth: IAuth) {
    const product = await ProductsModel.query().findOne({
      id,
      company_id: auth.company_id,
    });

    if (!product) throw new NotFoundException();

    await product.$query().patch({
      updated_by: auth.id,
      deleted_at: fn.now(),
    });

    return 'Product berhasil di hapus';
  }

  async topParts(auth: IAuth) {
    const wo: any = await WorkOrderItemsModel.query()
      .select(raw("(data->>'id')::int").as('product_id'))
      .joinRelated('work_order')
      .where('work_order.company_id', auth.company_id);

    const order = await OrderItemsModel.query()
      .select('product_id')
      .joinRelated('order')
      .where('order.company_id', auth.company_id);

    const allProductIds = [
      ...wo.map((item: { product_id: number }) => item.product_id),
      ...order.map((item) => item.product_id),
    ];

    const counts: Record<number, number> = {};
    allProductIds.forEach((id) => {
      counts[id] = (counts[id] || 0) + 1;
    });

    const sortedProducts = Object.entries(counts)
      .map(([id, count]) => ({
        product_id: Number(id),
        total: count,
      }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 10);

    const products = await ProductsModel.query()
      .withGraphFetched('[category,uom]')
      .whereIn(
        'id',
        sortedProducts.map((item) => item.product_id),
      );

    const result = sortedProducts.map((sp) => ({
      sold: sp.total,
      ...products.find((p) => p.id === sp.product_id),
    }));

    return result;
  }

  async getByIds(ids: any, auth: IAuth) {
    return await ProductsModel.query()
      .withGraphFetched('[category.parent,uom,images]')
      .where('company_id', auth.company_id)
      .where((builder) => {
        if (ids != 'all') {
          builder.whereIn('id', ids);
        }
      });
  }
}
