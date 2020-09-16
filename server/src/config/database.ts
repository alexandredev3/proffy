import dotenv from 'dotenv'
import { resolve } from 'path';

dotenv.config({
  path: process.env.NODE_ENV === 'test' 
    ? resolve(__dirname, '..', '..', '.env.test') 
    : resolve(__dirname, '..', '..', '.env')
});

export default {
  development: {
    client: process.env.DB_CLIENT,
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    },
  },

  test: {
    client: process.env.DB_CLIENT_TEST,
    connection: {
      host: process.env.DB_HOST_TEST,
      user: process.env.DB_USER_TEST,
      password: process.env.DB_PASSWORD_TEST,
      database: process.env.DB_NAME_TEST
    },
  }
}