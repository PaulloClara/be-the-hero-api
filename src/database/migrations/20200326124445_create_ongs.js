exports.up = knex => {
  return knex.schema.createTable("ongs", table => {
    table.string("id").primary();
    table.string("name").notNullable();
    table.string("email").notNullable();
    table.string("password").notNullable();
    table.string("whatsapp").notNullable();
    table.string("city").notNullable();
    table.string("uf", 2).notNullable();

    table.timestamp("created_at").defaultTo(knex.fn.now());

    table.unique("email");
  });
};

exports.down = knex => {
  return knex.schema.dropTable("ongs");
};
