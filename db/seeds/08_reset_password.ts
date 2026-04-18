import { Knex } from 'knex';
import * as bcrypt from 'bcrypt';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  const hashedPassword = await bcrypt.hash('hcp@2026', 10);

  await knex('users').whereNot('email', 'admin@bengkel.com').update({
    password: hashedPassword,
  });
}
