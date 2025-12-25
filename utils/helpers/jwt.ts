import jwt from 'jsonwebtoken';
// Token secret key
const key = process.env.SECRET_KEY || 'SECRET_KEY';

// Generate encoded token from payload
export function sign(payload: any) {
  return jwt.sign(payload, key);
}

// Generate decoded payload from token
export function verify(token: string) {
  return jwt.verify(token, key);
}
