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
	.createTable('job_detail', function (table) {
		table.increments('id').primary();
		table.string('Title');
		table.string('Company');
		table.string('Posting Date');
		table.string('Deadline');
		table.string('Salary');
		table.string('YOE');
		table.string('Type');
		table.string('Level');
		table.string('Education');
		table.string('Sex');
		table.string('Career');
		table.string('Age');
		table.string('ID_Job');
		table.string('Contact_with');
		table.string('Location');
		table.string('Note');
		table.string('Phone_number');
		table.string('Language');
		table.string('Describe_job');
		table.string('Benefits');
		table.string('Skills');
	  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
	return knex.schema
	.dropTable('users').dropTable('job_detail')
	
};
