import { Injectable } from '@nestjs/common';
import { PermissionsModel } from 'models/permissions.model';

@Injectable()
export class PermissionsService {
  async list() {
    const permissions = await PermissionsModel.query();

    const groupedPermissions = permissions.reduce((acc, current) => {
      const groupName = current.group;
      if (!acc[groupName]) {
        acc[groupName] = [];
      }
      acc[groupName].push(current);

      return acc;
    }, {});
    return groupedPermissions;
  }
}
