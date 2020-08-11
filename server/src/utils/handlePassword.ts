import bcrypt from 'bcryptjs';
import db from '../database/connection';

function encryptsPassword(password: string) {
  const password_hash = bcrypt.hash(password, 8);

  return password_hash;
}

async function passwordCompare(password: string) {
  const users = await db('users').returning('*');

  const user = users.find(user => user.password_hash);

  const password_compare = bcrypt.compare(password, user.password_hash);

  return password_compare
}

export {encryptsPassword, passwordCompare};