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
		table.string('isVerified');
		table.timestamp('created_at').defaultTo(knex.fn.now());
		table.timestamp('updated_at').defaultTo(knex.fn.now());
	})
	.createTable('job_data', function (table) {
		table.increments('id').primary();
		table.specificType('Title', 'MEDIUMTEXT');
		table.specificType('Time', 'MEDIUMTEXT');
		table.specificType('City', 'MEDIUMTEXT');
		table.specificType('Age', 'MEDIUMTEXT');
		table.specificType('Sexual', 'MEDIUMTEXT');
		table.specificType('Probation_Time', 'MEDIUMTEXT');
		table.specificType('Work_Way', 'MEDIUMTEXT');
		table.specificType('Right', 'MEDIUMTEXT');
		table.specificType('Company_Name', 'MEDIUMTEXT');
		table.specificType('Job', 'MEDIUMTEXT');
		table.specificType('Place', 'MEDIUMTEXT');
		table.specificType('Number_Employee', 'MEDIUMTEXT');
		table.specificType('Experience', 'MEDIUMTEXT');
		table.specificType('Level', 'MEDIUMTEXT');
		table.specificType('Salary', 'MEDIUMTEXT');
		table.specificType('Education', 'MEDIUMTEXT');
		table.specificType('Description', 'MEDIUMTEXT');
		table.specificType('Requirement', 'MEDIUMTEXT');
		table.specificType('Deadline', 'MEDIUMTEXT');
		table.specificType('Source_Picture', 'MEDIUMTEXT');	
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
