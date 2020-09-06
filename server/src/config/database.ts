import dotenv from 'dotenv'
import { resolve } from 'path';

dotenv.config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
});

export default {
  client: process.env.DB_CLIENT,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  filename: resolve(__dirname, '..', '..', '__tests__', 'database.sqlite')
}