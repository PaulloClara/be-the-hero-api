exports.up = knex => {
  return knex.schema.createTable("incidents", table => {
    table.increments();
    table.string("title").notNullable();
    table.string("description").notNullable();
    table.decimal("value").notNullable();
    table.string("ong_id").notNullable();

    table.timestamp("created_at").defaultTo(knex.fn.now());

    table
      .foreign("ong_id")
      .references("id")
      .inTable("ongs");
  });
};

exports.down = knex => {
  return knex.schema.dropTable("incidents");
};
