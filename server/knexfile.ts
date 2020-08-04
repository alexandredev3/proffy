import { resolve } from 'path';
import databaseConfig from './src/config/database'

const { client, host, user, password, database } = databaseConfig;

module.exports = {
  client,
  connection: {
    host,
    user,
    password,
    database
  },
  migrations: {
    directory: resolve(__dirname, 'src', 'database', 'migrations')
  }
};