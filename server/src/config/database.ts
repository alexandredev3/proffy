import dotenv from 'dotenv';

dotenv.config();

export default {
  client: process.env.DB_CLIENT,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
}