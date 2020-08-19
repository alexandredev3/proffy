import knex from 'knex';
import dotenv from 'dotenv';

import databaseConfig from '../config/database';

dotenv.config();

const { client, host, user, password, database } = databaseConfig;

const db = knex({
  client,
  connection: {
    host,
    user,
    password,
    database
  },
});

export { db };