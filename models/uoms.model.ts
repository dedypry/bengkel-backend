import { Table } from 'utils/decorators/objections.decorator';
import { BaseModel } from './base.model';

@Table('uoms', { hide: ['company_id', 'created_at', 'updated_at'] })
export class UomsModel extends BaseModel {
  // === FIELD START ===
  code?: string;
  name?: string;
  description?: string;
  company_id?: number;
  // === FIELD END ===

  static async findOrCreate(code: string, name: string, company_id?: number) {
    let uom = await this.query()
      .whereRaw('LOWER(code) = ?', [code])
      .orWhereRaw('LOWER(name) = ?', [name.toLowerCase()])
      .first();
    if (!uom) {
      try {
        uom = await this.query().insertAndFetch({ code, name, company_id });
      } catch (err) {
        console.error(err);
        // Jika ada proses paralel yang insert di waktu yang sama
        uom = await this.query().where('code', code).first();
      }
    }

    return uom;
  }
}
