import { Injectable } from '@nestjs/common';
import { CreateVehicleDto } from './dto/vehicle.dto';
import { IAuth } from 'utils/interfaces/IAuth';
import { VehiclesModel } from 'models/vehicles.model';

@Injectable()
export class VehicleService {
  async create(body: CreateVehicleDto, auth: IAuth) {
    const payload: any = {
      ...body,
      updated_by: auth.id,
    };

    let vehicle: VehiclesModel = null as any;
    if (body.id) {
      vehicle = await VehiclesModel.query().updateAndFetchById(
        body.id,
        payload,
      );
    } else {
      vehicle = await VehiclesModel.query().insert(payload);
      await vehicle.$relatedQuery('customers').relate(auth.id);
    }

    return 'data berhasil disimpan';
  }
}
