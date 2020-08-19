import bcrypt from 'bcryptjs';
import { db } from '../database/connection';

function encryptsField(field: string) {
  const field_hash = bcrypt.hash(field, 8);

  return field_hash;    
}

async function passwordCompare(password: string) {
  const users = await db('users').returning('*');

  const user = users.find(user => user.password_hash);

  const password_compare = bcrypt.compare(password, user.password_hash);

  return password_compare
}

export {encryptsField, passwordCompare};