export async function up(knex) {
  return knex.schema.createTable('emails', (table) => {
    table.increments('id').primary();
    table.string('to').notNullable();
    table.string('cc');
    table.string('bcc');
    table.string('subject').notNullable();
    table.text('body').notNullable();
    table.timestamp('createdAt').defaultTo(knex.fn.now());
  });
}

export async function down(knex) {
  return knex.schema.dropTable('emails');
}
