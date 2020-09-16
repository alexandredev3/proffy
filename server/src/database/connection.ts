// import 'dotenv/config';
import knex from 'knex';
import databaseConfig from '../config/database';

const config = process.env.NODE_ENV === 'test' 
  ? databaseConfig.test 
  : databaseConfig.development;

const db = knex(config);

export { db };