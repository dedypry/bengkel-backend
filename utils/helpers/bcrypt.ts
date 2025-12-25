import bcrypt from 'bcrypt';

export function hashPassword(password: string) {
  return bcrypt.hashSync(password, 10);
}

export function comparePassword(password: string, encrypted: string) {
  return bcrypt.compareSync(password, encrypted);
}
