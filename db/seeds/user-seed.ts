import type { Knex } from 'knex';
import * as bcrypt from 'bcrypt';

export async function seed(knex: Knex): Promise<void> {
  // 1. Bersihkan data lama dengan urutan yang benar (child table dulu)
  await knex('company_user').del();
  await knex('role_user').del();
  await knex('personal_access_token').del();
  await knex('address').del();
  await knex('users').del();
  await knex('companies').del();

  // 3. Insert Company (Bengkel)
  await knex('companies')
    .insert({
      id: 1,
      name: 'Bengkel Maju Jaya',
      slug: 'bengkel-maju-jaya',
      email: 'info@majujaya.com',
      phone_number: '021-123456',
      npwp: '01.234.567.8-901.000',
    })
    .returning('id');

  // 4. Insert Address untuk Company (Polymorphic: model = 'company')
  await knex('address').insert({
    parent_id: 1,
    model: 'company',
    title: 'Kantor Pusat',
    province: 'DKI Jakarta',
    city: 'Jakarta Selatan',
    district: 'Tebet',
    zip_code: '12810',
  });

  // 5. Insert Users (Password dihash agar bisa login)
  const hashedPassword = await bcrypt.hash('password123', 10);

  await knex('users').insert([
    {
      id: 1,
      name: 'Super Admin',
      email: 'admin@bengkel.com',
      password: hashedPassword,
    },
    {
      id: 2,
      name: 'Budi Advisor',
      email: 'sa@bengkel.com',
      password: hashedPassword,
    },
    {
      id: 3,
      name: 'Joko Mechanic',
      email: 'mechanic@bengkel.com',
      password: hashedPassword,
    },
  ]);

  // 6. Hubungkan User ke Role (role_user)
  await knex('role_user').insert([
    { user_id: 1, role_id: 1 }, // Admin -> Admin
    { user_id: 2, role_id: 4 }, // Budi -> SA
    { user_id: 3, role_id: 6 }, // Joko -> Mechanic
  ]);

  // 7. Hubungkan User ke Company (company_user)
  await knex('company_user').insert([
    { user_id: 1, company_id: 1 },
    { user_id: 2, company_id: 1 },
    { user_id: 3, company_id: 1 },
  ]);
}
