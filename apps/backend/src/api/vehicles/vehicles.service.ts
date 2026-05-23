import { Injectable, NotFoundException } from '@nestjs/common';
import { VehiclesModel } from 'models/vehicles.model';
import { WorkOrdersModel } from 'models/work-orders.model';
import { IQuery } from 'utils/interfaces/query';
import { CreateVehiclesDto } from './dto/vehicles.dto';
import { IAuth } from 'utils/interfaces/IAuth';

@Injectable()
export class VehiclesService {
  async list(query: IQuery) {
    return await VehiclesModel.query()
      .withGraphFetched('[customers.profile]')
      .where((builder) => {
        if (query.q) {
          builder
            .whereILike('plate_number', `%${query.q}%`)
            .orWhereILike('brand', `%${query.q}%`)
            .orWhereILike('color', `%${query.q}%`)
            .orWhereILike('engine_number', `%${query.q}%`)
            .orWhereILike('fuel_type', `%${query.q}%`)
            .orWhereILike('model', `%${query.q}%`)
            .orWhereILike('vin_number', `%${query.q}%`);
        }
      })
      .orderBy('created_at', 'desc')
      .page(query.page, query.pageSize);
  }

  async getHistoryByPlateNo(plateNo: string) {
    return await WorkOrdersModel.query()
      .leftJoinRelated('[vehicle]')
      .withGraphFetched('[services,spareparts]')
      .where('vehicle.plate_number', plateNo);
  }

  async detailByPlate(plateNo: string) {
    return await VehiclesModel.query()
      .withGraphFetched('[customers.profile]')
      .findOne('plate_number', plateNo);
  }

  async updateOrCreateVehicle(body: CreateVehiclesDto, auth: IAuth) {
    const vehiclePayload = {
      ...body.vehicle,
      company_id: auth.company_id,
      updated_by: auth.id,
    };

    return await VehiclesModel.transaction(async (trx) => {
      let vehicle: VehiclesModel;
      if (body.vehicle.id) {
        const existingVehicle = await VehiclesModel.query(trx).findOne({
          id: body.vehicle.id,
          company_id: auth.company_id,
        });

        if (!existingVehicle) {
          throw new NotFoundException('Data kendaraan tidak ditemukan');
        }

        vehicle = await existingVehicle
          .$query(trx)
          .patchAndFetch(vehiclePayload);
      } else {
        vehicle = await VehiclesModel.query(trx).insertAndFetch(vehiclePayload);
      }

      let wo: WorkOrdersModel | null = null;
      if (body.wo.id) {
        const existingWo = await WorkOrdersModel.query(trx).findOne({
          id: body.wo.id,
          company_id: auth.company_id,
        });

        if (!existingWo) {
          throw new NotFoundException('Data work order tidak ditemukan');
        }

        wo = await existingWo.$query(trx).patchAndFetch({
          current_km: body.wo.current_km,
          next_km: body.wo.next_km,
          vehicle_id: vehicle.id,
          updated_by: auth.id,
        });
      }

      return {
        vehicle,
        wo,
      };
    });
  }
}
