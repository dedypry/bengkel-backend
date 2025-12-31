import { Table } from 'utils/decorators/objections.decorator';
import { BaseModel } from './base.model';

@Table('images')
export class ImagesModel extends BaseModel {
  // === FIELD START ===
  model?: string;
  parent_id?: number;
  company_id?: number;
  filename: string;
  original_name: string;
  mime_type: string;
  size: number;
  path: string;
  is_primary?: boolean;
  updated_by?: number;
  // === FIELD END ===
}
