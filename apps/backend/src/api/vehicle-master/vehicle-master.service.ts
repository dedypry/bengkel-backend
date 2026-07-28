import { Injectable } from '@nestjs/common';
import { VehicleMasterModel } from 'models/vehicle-master.model';
import { IQueryVehicles, VehicleCreateDto } from './dto/vehicle-master.dto';
import { IAuth } from 'utils/interfaces/IAuth';

@Injectable()
export class VehicleMasterService {
  async list(query: IQueryVehicles) {
    let dataQuery: any = VehicleMasterModel.query().where((builder) => {
      if (query.q) {
        builder
          .whereILike('merk', `%${query.q}%`)
          .orWhereILike('type', `%${query.q}%`);
      }

      if (query.merk) {
        builder.where('type', query.merk);
      }
    });
    if (query.page) {
      const page = Math.max(Number(query.page) || 1, 1);
      const pageSize = Math.max(Number(query.pageSize) || 10, 1);

      return await dataQuery
        .orderBy('created_at', 'desc')
        .page(page - 1, pageSize);
    }

    const results = await dataQuery.orderBy('merk', 'asc');

    const grouped = results.reduce((acc: any, current) => {
      // Kita ambil 'type' sebagai parent
      const { type, merk, cc, id, status } = current;

      let existingGroup = acc.find((item: any) => item.type === type);

      if (!existingGroup) {
        existingGroup = {
          type: type,
          children: [],
        };
        acc.push(existingGroup);
      }

      existingGroup.children.push({
        type,
        id,
        merk,
        cc,
        status,
      });

      return acc;
    }, []);

    return grouped;
  }

  async create(body: VehicleCreateDto, auth: IAuth) {
    const vehicle = await VehicleMasterModel.query().findOne(
      body.id
        ? { id: body.id }
        : {
            type: body.type,
            merk: body.merk,
          },
    );

    const payload = {
      ...body,
      updated_id: auth.id,
    };

    if (vehicle) {
      await vehicle.$query().patch(payload);
    } else {
      await VehicleMasterModel.query().insert(payload);
    }

    return `Data kendaraan berhasil ${body.id ? 'di Ubah' : 'di buat'}`;
  }

  async destroy(id: number) {
    await VehicleMasterModel.query().deleteById(id);

    return `Data berhasil dihapus`;
  }

  async exportList(query: IQueryVehicles) {
    return VehicleMasterModel.query()
      .where((builder) => {
        if (query.q) {
          builder
            .whereILike('merk', `%${query.q}%`)
            .orWhereILike('type', `%${query.q}%`);
        }

        if (query.merk) {
          builder.where('type', query.merk);
        }
      })
      .orderBy('type', 'asc')
      .orderBy('merk', 'asc');
  }
}
