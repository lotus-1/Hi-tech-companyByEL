
const databaseConnection = require("../db_connection.js");

const getinfo = cb => {
  databaseConnection.query("SELECT * FROM employee WHERE first_name=$1 and last_name=$2 and phone_num=$3 and job_id=$4, [first_name, last_name,phone_num,job_id]", (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res.rows);
    }
  });
};

module.exports = getinfo;
