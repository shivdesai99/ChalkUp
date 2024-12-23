import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  console.log('Knex configuration:', knex.client.config.connection);
  await knex('users').del();

  // Inserts seed entries
  await knex('users').insert([
    { email: 'user1@example.com', password_hash: 'hash1', name: 'User One' },
    { email: 'user2@example.com', password_hash: 'hash2', name: 'User Two' },
  ]);
}