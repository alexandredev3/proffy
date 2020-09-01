import knex from 'knex';

import databaseConfig from '../config/database';

const { client, host, user, password, database, filename } = databaseConfig;

const db = knex({
  client,
  connection: {
    filename,
    host,
    user,
    password,
    database
  },
  useNullAsDefault: false
});

export { db };