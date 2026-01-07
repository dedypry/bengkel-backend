import { Table } from 'utils/decorators/objections.decorator';
import { BaseModel } from './base.model';
import slugify from 'slugify';

@Table('service_categories', {
  hide: ['created_at', 'updated_at', 'deleted_at', 'company_id'],
})
export class ServiceCategoriesModel extends BaseModel {
  // === FIELD START ===
  company_id?: number;
  name: string;
  slug?: string;
  description?: string;
  is_active?: boolean;
  updated_by?: number;
  parent_id?: number;
  // === FIELD END ===

  static async findOrCreate(
    name: string,
    parent?: string,
    company_id?: number,
  ) {
    const trimmedName = name.trim();
    const slug = slugify(trimmedName, { lower: true, strict: true });

    // 1. Cari dulu dengan menyertakan company_id agar tidak tertukar antar tenant
    let category = await this.query()
      .where({ company_id })
      .andWhere((q) => {
        q.whereRaw('LOWER(name) = ?', [trimmedName.toLowerCase()]).orWhere(
          'slug',
          slug,
        );
      })
      .first();

    if (!category) {
      let parentId: number | null = null;

      if (parent && parent.trim() !== '') {
        const parentCategory = await this.findOrCreate(
          parent.trim(),
          undefined,
          company_id,
        );
        parentId = parentCategory?.id as any;
      }

      try {
        category = await this.query()
          .insertAndFetch({
            name: trimmedName,
            slug,
            parent_id: parentId,
            company_id,
          } as any)
          .onConflict(['company_id', 'slug'])
          .ignore();

        if (!category) {
          category = await this.query().findOne({ company_id, slug });
        }
      } catch (err) {
        console.error(err);
        category = await this.query().findOne({ company_id, slug });
      }
    }

    return category;
  }
}
