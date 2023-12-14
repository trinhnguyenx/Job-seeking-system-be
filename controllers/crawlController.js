const knex = require("knex");
const config = require("../knexfile");

const environment = process.env.NODE_ENV || "development";
const db = knex(config[environment]);

const getDataCrawl = async () => {
  return await db("job_detail").select(
    "job_detail.id",
    "job_detail.Title",
    "job_detail.Image",
    "job_detail.Company",
    "job_detail.Posting_date",
    "job_detail.Deadline",
    "job_detail.Salary",
    "job_detail.YOE",
    "job_detail.Type",
    "job_detail.Level",
    "job_detail.Education",
    "job_detail.Sex",
    "job_detail.Career",
    "job_detail.Age",
    "job_detail.ID_Job",
    "job_detail.Contact_with",
    "job_detail.Location",
    "job_detail.Note",
    "job_detail.Phone_number",
    "job_detail.Email",
    "job_detail.Language",
    "job_detail.Describe_job",
    "job_detail.Benefits",
    "job_detail.Skills",
    "job_detail.Link",
  );
};
module.exports = {
  getDataCrawl,
};
