import { Injectable, NotFoundException } from '@nestjs/common';
import { RolesModel } from 'models/roles.model';
import { CreateRoleDto } from './dto/roles.dto';
import { IAuth } from 'utils/interfaces/IAuth';
import slugify from 'slugify';
import { fn } from 'objection';

@Injectable()
export class RolesService {
  async list() {
    return await RolesModel.query()
      .withGraphFetched('permissions')
      .orderBy('id', 'desc');
  }

  async create(body: CreateRoleDto, auth: IAuth) {
    return await RolesModel.transaction(async (trx) => {
      let role: RolesModel;

      const roleData = {
        name: body.name,
        description: body.description,
        company_id: auth.company_id,
        updated_by: auth.id,
        slug: slugify(body.name, { lower: true, strict: true }),
      };

      if (body.id) {
        role = await RolesModel.query(trx).patchAndFetchById(body.id, roleData);

        await role.$relatedQuery('permissions', trx).unrelate();
      } else {
        role = await RolesModel.query(trx).insertAndFetch(roleData);
      }

      if (body.permissionId && body.permissionId.length > 0) {
        await role.$relatedQuery('permissions', trx).relate(body.permissionId);
      }

      return {
        message: 'Data berhasil disimpan',
        data: role,
      };
    });
  }

  async destroy(id: number, auth: IAuth) {
    const role = await RolesModel.query().findOne({
      id,
      company_id: auth.company_id,
    });

    if (!role) throw new NotFoundException();

    await role.$query().patch({
      deleted_at: fn.now(),
      updated_by: auth.id,
    });

    return 'Data berhasil di hapus';
  }
}
