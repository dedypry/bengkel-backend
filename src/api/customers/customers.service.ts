import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/customer.dto';
import { IAuth } from 'utils/interfaces/IAuth';
import { CustomersModel } from 'models/customers.model';
import { formatPhoneNumber } from 'utils/helpers/format';
import { sendWelcomeMessage } from 'utils/helpers/send-wa';
import { CompaniesModel } from 'models/companies.model';

@Injectable()
export class CustomersService {
  async createCustomer(body: CreateCustomerDto, auth: IAuth) {
    if (!body?.id) {
      body.vehicles = body.vehicles.map((item) => ({
        ...item,
        company_id: auth.company_id,
        updated_by: auth.id,
      }));
    }

    const phone = formatPhoneNumber(body.phone);
    await CustomersModel.transaction(async (trx) => {
      await CustomersModel.query(trx).upsertGraph(
        {
          id: body?.id || undefined,
          ...body,
          company_id: auth.company_id,
          updated_by: auth.id,
          phone,
        } as any,
        { relate: ['vehicles'] },
      );
    });

    const company = await CompaniesModel.query().findById(auth.company_id);

    sendWelcomeMessage({
      customerName: body.name,
      vehicleName: `${body.vehicles[0].brand} - ${body.vehicles[0].model}`,
      plateNumber: body.vehicles[0].plate_number,
      workshopName: company?.name || '',
      to: phone,
    });
    return true;
  }
}
