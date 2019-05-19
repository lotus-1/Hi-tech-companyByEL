const databaseConnection = require("../db_connection.js");

const postinfo = (emp_id, first_name, last_name, phone_num, job_id, cb) => {
  databaseConnection.query(
    "INSERT INTO employee (emp_id, first_name, last_name, phone_num, job_id) VALUES ($1, $2, $3, $4, $5)",
    [emp_id, first_name, last_name, phone_num, job_id],
    (err, res) => {
      if (err) {
        return cb(err);
      } else {
        cb(null, res);
      }
    }
  );
};

module.exports = postinfo;
