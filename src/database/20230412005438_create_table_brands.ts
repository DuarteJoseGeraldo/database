import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("brands", function (table) {
    table.increments();
    table.string("name").notNullable();
    table.string("country").notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("brands");
}
