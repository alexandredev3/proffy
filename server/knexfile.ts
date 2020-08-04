import { resolve } from 'path';
import dotenv from 'dotenv';

dotenv.config();

module.exports = {
  client: 'pg',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  },
  migrations: {
    directory: resolve(__dirname, 'src', 'database', 'migrations')
  }
};