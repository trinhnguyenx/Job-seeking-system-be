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
		table.mediumtext('Title');
		table.mediumtext('Image');
		table.mediumtext('Company');
		table.mediumtext('Posting_date');
		table.mediumtext('Deadline');
		table.mediumtext('Salary');
		table.mediumtext('YOE');
		table.mediumtext('Type');
		table.mediumtext('Level');
		table.mediumtext('Education');
		table.mediumtext('Sex');
		table.mediumtext('Career');
		table.mediumtext('Age');
		table.mediumtext('ID_Job');
		table.mediumtext('Contact_with');
		table.mediumtext('Location');
		table.mediumtext('Note');
		table.mediumtext('Phone_number');
		table.mediumtext('Email');
		table.mediumtext('Language');
		table.mediumtext('Describe_job');
		table.mediumtext('Benefits');
		table.mediumtext('Skills')
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
