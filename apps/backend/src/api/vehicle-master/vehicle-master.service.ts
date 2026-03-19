import { Injectable } from '@nestjs/common';
import { VehicleMasterModel } from 'models/vehicle-master.model';
import { IQuery } from 'utils/interfaces/query';

@Injectable()
export class VehicleMasterService {
  async list(query: IQuery) {
    const results = await VehicleMasterModel.query()
      .where((builder) => {
        if (query.q) {
          builder
            .whereILike('merk', `%${query.q}%`)
            .orWhereILike('type', `%${query.q}%`);
        }
      })
      .orderBy('merk', 'asc');

    const grouped = results.reduce((acc: any, current) => {
      // Kita ambil 'type' sebagai parent
      const { type, merk, cc, id, status } = current;

      let existingGroup = acc.find((item: any) => item.type === type);

      if (!existingGroup) {
        existingGroup = {
          type: type, // Contoh: "ACCORD" atau "AVANZA"
          children: [],
        };
        acc.push(existingGroup);
      }

      // Masukkan detail merk dan CC ke dalam children
      existingGroup.children.push({
        id,
        merk, // Contoh: "HONDA" atau "TOYOTA"
        cc,
        status,
      });

      return acc;
    }, []);

    return grouped;
  }
}
