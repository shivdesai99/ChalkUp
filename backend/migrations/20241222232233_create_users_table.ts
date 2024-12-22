import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('users', (table) => {
    table.increments('id').primary(); // Auto-incrementing primary key
    table.string('email').notNullable().unique(); // Email address (unique)
    table.string('password_hash').notNullable(); // Password hash
    table.string('name').notNullable(); // User's name
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('users'); // Drop the table if it exists
}