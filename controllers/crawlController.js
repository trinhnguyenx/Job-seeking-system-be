const knex = require("knex");
const config = require("../knexfile");

const environment = process.env.NODE_ENV || "development";
const db = knex(config[environment]);

const getDataCrawl = async () => {
  return await db("job_data").select(
    "job_data.id",
    "job_data.Title",
    "job_data.Company_Name",
    "job_data.Time",
    "job_data.City",
    "job_data.Age",
    "job_data.Sexual",
    "job_data.Probation_Time",
    "job_data.Work_Way",
    "job_data.Job",
    "job_data.Place",
    "job_data.Right",
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
const updateJob = (id, updatedJob) => {
  return db("job_data").where({ id }).update(updatedJob);
};
const getJobByTitle = async () => {
  return await db("job_data")
    .distinct("job_data.job")
    .select("job_data.job")
    .limit(10);
};
const filterJob = async (key1, key2, key3) => {
  let cityKeyword = key3.toLowerCase();

  if (cityKeyword === "hồ chí minh") {
    cityKeyword = "hồ chí minh";
  } else if (
    cityKeyword === "tphcm" ||
    cityKeyword === "tp.hcm" ||
    cityKeyword === "hcm"
  ) {
    cityKeyword = "hồ chí minh";
  }
  console.log(cityKeyword);
  return await db("job_data").whereRaw(
    "LOWER(Title) like ?  AND LOWER(job) like ? AND (LOWER(City) like ? )",
    [
      `%${key1}%`,
      `%${key2}%`,
      `%${cityKeyword}%`,
      // `%tphcm%`,
      // `%hcm%`,
    ]
  );
};

module.exports = {
  getDataCrawl,
  getDataCrawlById,
  updateJob,
  getJobByTitle,
  filterJob,
};
