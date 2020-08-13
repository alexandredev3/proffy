import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.alterTable('users', table => {
    table.integer('avatar_id')
      .references('id')
      .inTable('files')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  })
}

export async function down(knex: Knex) {
 return knex.schema.alterTable('users', table => {
   table.dropColumn('avatar_id')
 })
}