const knex = require("knex");
const config = require("../knexfile");

const environment = process.env.NODE_ENV || "development";
const db = knex(config[environment]);

const getDataCrawl = async () => {
  return await db("job_details").select(
    "job_details.id",
    "job_details.Title",
    "job_details.Company",
    "job_details.Salary",
    "job_details.YOE",
    "job_details.Type",
    "job_details.Posting_date",
    "job_details.Level",
    "job_details.Education",
    "job_details.Sex",
    "job_details.Career",
    "job_details.Age",
    "job_details.ID_Job",
    "job_details.Location",
    "job_details.Note",
    "job_details.Phone_number",
    "job_details.Language",
    "job_details.Describe_job",
    "job_details.Benefits",
    "job_details.Skills",
    "job_details.Link",
    "job_details.Deadline",
  );
};
module.exports = {
  getDataCrawl,
};
