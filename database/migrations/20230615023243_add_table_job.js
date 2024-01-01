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
	.createTable('job_data', function (table) {
		table.increments('id').primary();
		table.string('Title');
		table.string('Time');
		table.string('City');
		table.string('Age');
		table.string('Sexual');
		table.string('Probation_Time');
		table.string('Work_Way');
		table.string('Right');
		table.string('Company_Name');
		table.string('Job');
		table.string('Place');
		table.string('Number_Employee');
		table.string('Experience');
		table.string('Level');
		table.string('Salary');
		table.string('Education');
		table.string('Description');
		table.string('Requirement');
		table.string('Deadline');
		table.string('Source_Picture');	
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
	return knex.schema
	.dropTable('users').dropTable('job_data')
	
};
