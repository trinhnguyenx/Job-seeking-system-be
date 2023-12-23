const knex = require("knex");
const config = require("../knexfile");

const environment = process.env.NODE_ENV || "development";
const db = knex(config[environment]);

const getDataCrawl = async () => {
  return await db("job_data").select(
    "job_data.id",
    "job_data.Title",
    "job_data.Company_Name",
    "job_data.Job",
    "job_data.Place",
    "job_data.Number_Employee",
    "job_data.Experience",
    "job_data.Level",
    "job_data.Salary",
    "job_data.Education",
    "job_data.Description",
    "job_data.Requirement",
    "job_data.Deadline",
    "job_data.Source_Picture"

  );
};
const getDataCrawlById = async (id) => {
  return await db("job_data").where({ id }).first();
};
module.exports = {
  getDataCrawl,
  getDataCrawlById
};
