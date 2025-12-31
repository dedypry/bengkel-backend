import { BelongsToOne, Table } from 'utils/decorators/objections.decorator';
import { BaseModel } from './base.model';
import { ServiceCategoriesModel } from './service-categories.model';

@Table('services', {
  softDelete: true,
  hide: ['created_at', 'updated_at', 'deleted_at', 'company_id', 'category_id'],
})
export class ServicesModel extends BaseModel {
  // === FIELD START ===
  company_id?: number;
  name: string;
  code?: string;
  description?: string;
  price?: number;
  estimated_duration?: number;
  difficulty?: any;
  category_id?: number;
  is_active?: boolean;
  updated_by?: number;
  // === FIELD END ===

  @BelongsToOne(() => ServiceCategoriesModel, {
    from: 'category_id',
  })
  category?: ServiceCategoriesModel;
}
