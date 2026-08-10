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
import { UomsModel } from 'models/uoms.model';
import { ProductCategoriesModel } from 'models/product-categories.model';
import { fn, raw } from 'objection';
import { WorkOrderItemsModel } from 'models/work-order-items.model';
import { OrderItemsModel } from 'models/order-items.model';
import { UploadService } from '../upload/upload.service';
import { randomString } from 'utils/helpers/global';
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
      .where('products.company_id', auth.company_id)
      .where((builder) => {
        if (query.q) {
          builder
            .whereILike('products.name', `%${query.q}%`)
            .orWhereILike('products.code', `%${query.q}%`);
        }
      })
      .modify((builder) => {
        if (query.categoryId) {
          builder.where('category_id', query.categoryId);
        }
        if (query.status === 'empty') {
          builder.whereRaw('CAST(stock AS NUMERIC) = 0');
        } else if (query.status === 'low') {
          builder.whereRaw(
            'CAST(stock AS NUMERIC) > 0 AND CAST(stock AS NUMERIC) <= CAST(min_stock AS NUMERIC)',
          );
        } else if (query.status === 'ok') {
          builder.whereRaw(
            'CAST(stock AS NUMERIC) > CAST(min_stock AS NUMERIC)',
          );
        }
      })
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
          ProductsModel.raw(`
        COUNT(
          CASE WHEN stock <= min_stock THEN 1 END
        )::INTEGER as low_stock_count
      `),

          ProductsModel.raw(`
        COALESCE(
          SUM(
            CASE
              WHEN stock::TEXT = 'NaN'
                OR purchase_price::TEXT = 'NaN'
              THEN 0
              ELSE stock * purchase_price
            END
          ),
          0
        )::BIGINT as total_inventory_value
      `),

          ProductsModel.raw(`
        COALESCE(
          SUM(
            CASE
              WHEN stock::TEXT = 'NaN'
                OR sell_price::TEXT = 'NaN'
              THEN 0
              ELSE stock * sell_price
            END
          ),
          0
        )::BIGINT as total_potential_revenue
      `),
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

  private importCellString(row: Record<string, unknown>, key: string): string {
    const value = row[key];
    if (value == null || value === '') return '';
    if (value instanceof Date) return value.toISOString();
    if (typeof value === 'string' || typeof value === 'number') {
      return String(value).trim();
    }
    if (typeof value === 'boolean') return value ? 'true' : 'false';
    return '';
  }

  private importCellNumber(
    row: Record<string, unknown>,
    key: string,
  ): number | undefined {
    const value = row[key];
    if (value == null || value === '') return undefined;
    if (typeof value === 'number') return value;
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : undefined;
  }

  async createFromImport(row: Record<string, unknown>, auth: IAuth) {
    const code = this.importCellString(row, 'A');
    const name = this.importCellString(row, 'B');
    if (!code || !name) return;

    const uomValue = this.importCellString(row, 'E');
    let uom_id: number | undefined;
    if (uomValue) {
      const uom = await UomsModel.findOrCreate(
        uomValue.toLowerCase(),
        uomValue,
        auth.company_id,
      );
      uom_id = uom?.id;
    }

    const catValue = this.importCellString(row, 'D');
    const catParentValue = this.importCellString(row, 'C');
    let category_id: number | undefined;
    if (catValue) {
      const category = await ProductCategoriesModel.findOrCreate(
        catValue,
        catParentValue || undefined,
        auth.company_id,
      );
      category_id = category?.id;
    }

    const key = randomString(4);

    const price = this.importCellNumber(row, 'F');
    // Kolom mengikuti template/export:
    // A kode, B nama, C group, D sub group, E satuan, F harga, G rak, H stok, I min stok
    const payload: any = {
      code,
      company_id: auth.company_id,
      name,
      unit: uomValue || 'PCS',
      location: this.importCellString(row, 'G') || '',
      updated_by: auth.id,
      slug: slugify(name + '-' + key, {
        lower: true,
        trim: true,
        strict: true,
      }),
      uom_id,
      category_id,
      purchase_price: price,
      sell_price: price,
      stock: this.importCellNumber(row, 'H') ?? 0,
      min_stock: this.importCellNumber(row, 'I') ?? 0,
    };

    const product = await ProductsModel.query()
      .where({ code, company_id: auth.company_id })
      .first();

    if (product) {
      await product.$query().patch(payload);
    } else {
      await ProductsModel.query().insert(payload);
    }

    return 'Produk berhasil di import';
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
      .where('work_order.company_id', auth.company_id)
      .whereRaw("(data->>'id') ~ '^[0-9]+$'");

    const order = await OrderItemsModel.query()
      .select('product_id')
      .joinRelated('order')
      .where('order.company_id', auth.company_id)
      .whereNotNull('product_id');

    const allProductIds = [
      ...wo.map((item: { product_id: number }) => item.product_id),
      ...order.map((item) => item.product_id),
    ].filter((id): id is number => Number.isFinite(id) && id > 0);

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

    if (!sortedProducts.length) {
      return [];
    }

    const products = await ProductsModel.query()
      .withGraphFetched('[category,uom]')
      .where('company_id', auth.company_id)
      .whereIn(
        'id',
        sortedProducts.map((item) => item.product_id),
      );

    return sortedProducts
      .map((sp) => {
        const product = products.find((p) => p.id === sp.product_id);
        if (!product) return null;

        return {
          ...product,
          sold: sp.total,
        };
      })
      .filter(Boolean);
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
