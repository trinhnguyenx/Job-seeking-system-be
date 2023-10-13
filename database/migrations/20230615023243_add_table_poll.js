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
	.createTable('polls', function (table) {
		table.string('id').primary();
		table.string('title');
		table.string('question');
		table.timestamp('created_at').defaultTo(knex.fn.now());
		table.timestamp('updated_at').defaultTo(knex.fn.now());
	})
	.createTable('options', function (table) {
			table.string('id').primary();
			table.string('content');
			table.string('poll_id');
			table.foreign('poll_id').references('polls.id');
			table.timestamp('created_at').defaultTo(knex.fn.now());
			table.timestamp('updated_at').defaultTo(knex.fn.now());
		})
	.createTable('votes', function (table) {
			table.string('id').primary();
			table.string('user_id');
			table.foreign('user_id').references('users.id');
			table.string('option_id');
			table.foreign('option_id').references('options.id');
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
	.dropTable('polls')
	.dropTable('options')
	.dropTable('votes')
};
