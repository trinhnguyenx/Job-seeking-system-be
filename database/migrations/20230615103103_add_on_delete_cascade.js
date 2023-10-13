/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
	return knex.schema.alterTable('polls', (table) => {
		table.dropForeign('user_id');
		table.foreign('user_id').references('users.id').onDelete('CASCADE');
	})
	.alterTable('options', (table) => {
		table.dropForeign('poll_id');
		table.foreign('poll_id').references('polls.id').onDelete('CASCADE');
	})
	.alterTable('votes', (table) => {
		table.dropForeign('user_id');
		table.foreign('user_id').references('users.id').onDelete('CASCADE');
		table.dropForeign('option_id');
		table.foreign('option_id').references('options.id').onDelete('CASCADE');
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
	return knex.schema.alterTable('polls', (table) => {
		table.dropForeign('user_id');
		table.foreign('user_id').references('users.id');
	}).alterTable('options', (table) => {
		table.dropForeign('poll_id');
		table.foreign('poll_id').references('polls.id');
	}).alterTable('votes', (table) => {
		table.dropForeign('user_id');
		table.foreign('user_id').references('users.id');
		table.dropForeign('option_id');
		table.foreign('option_id').references('options.id');
	});
};
