const databaseConnection = require("../db_connection.js");

const postinfo = (first_name, last_name, phone_num, job_id, cb) => {
  databaseConnection.query('INSERT INTO employee (first_name, last_name, phone_num, job_id) VALUES ($1, $2, $3, $4)',
[first_name, last_name, phone_num, job_id] ,(err, res) => {

      if (err) {
        return (err);
      } else {
        cb(null, res.rows);
      }
    }
  );
};

module.exports = postinfo ;
