/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
	return knex.schema
	.createTable('users', function (table) {
		table.string('id').primary();
		table.string('name');
		table.string('email');
		table.string('password');
		table.string('salt');
		table.string('role');
		table.string('avatar');
		table.string('age');
		table.timestamp('created_at').defaultTo(knex.fn.now());
		table.timestamp('updated_at').defaultTo(knex.fn.now());
	})
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
	return knex.schema
	.dropTable('users')
};
