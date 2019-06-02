
const databaseConnection = require("../db_connection.js");

const getInfoEmployee = cb => {
  databaseConnection.query("SELECT firstName, lastName, phoneNum, jobId FROM employee )",
   (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res.rows);
    }
  });
};

const getInfoRole = cb => {
  databaseConnection.query("SELECT job_id, role, selary, mgr_id FROM role )",
   (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res.rows);
    }
  });
};

const getInfoJob = cb => {
  databaseConnection.query("SELECT seniority, boss, status FROM job )",
   (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res.rows);
    }
  });
};
module.exports = {
   getInfoJob,
   getInfoRole,
   getInfoEmployee
};
