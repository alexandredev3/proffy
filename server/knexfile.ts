import dotenv from 'dotenv';
import { resolve } from 'path';
import databaseConfig from './src/config/database'

dotenv.config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
});

const { client, host, user, password, database, filename } = databaseConfig;

module.exports = {
  client,
  connection: {
    filename: resolve(__dirname, '__tests__', 'database.sqlite'),
    host,
    user,
    password,
    database
  },
  migrations: {
    directory: resolve(__dirname, 'src', 'database', 'migrations')
  },
  useNullAsDefault: false
};