import {
  BelongsToOne,
  HasMany,
  Table,
} from 'utils/decorators/objections.decorator';
import { BaseModel } from './base.model';
import { PoItemsModel } from './po-items.model';
import { SuppliersModel } from './suppliers.model';
import { WarehousesModel } from './warehouses.model';
import { UsersModel } from './users.model';

@Table('po', { softDelete: true })
export class PoModel extends BaseModel {
  // === FIELD START ===
  company_id?: number;
  po_no!: string;
  supplier_id?: number;
  warehouse_id?: number;
  date?: string;
  sub_total?: number;
  other_fee?: number;
  disc_value?: number;
  tax?: number;
  total?: number;
  term_credit!: number;
  dp!: number;
  payment_method!: string;
  status!: string;
  notes?: string;
  signature_id?: number;
  created_id?: number;
  requested_date?: string;
  disc_percentage?: number;
  closed_notes?: string;
  // === FIELD END ===

  @HasMany(() => PoItemsModel, {
    to: 'po_id',
  })
  items: PoItemsModel[];

  @BelongsToOne(() => SuppliersModel, {
    from: 'supplier_id',
  })
  supplier: SuppliersModel;

  @BelongsToOne(() => WarehousesModel, {
    from: 'warehouse_id',
  })
  warehouse: WarehousesModel;

  @BelongsToOne(() => UsersModel, {
    from: 'created_id',
  })
  created_by: UsersModel;

  @BelongsToOne(() => UsersModel, {
    from: 'signature_id',
  })
  signature: UsersModel;
}
