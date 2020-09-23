import bcrypt from 'bcryptjs';
import { db } from '../database/connection';

function encryptsPassword(password: string) {
  const field_hash = bcrypt.hash(password, 8);

  return field_hash;    
}

async function passwordCompare(password: string, email: string) {
  const user = await db('users')
    .where('email', '=', email)
    .first();

  const password_compare = bcrypt.compare(password, user.password_hash);

  return password_compare;
}

export { encryptsPassword, passwordCompare };