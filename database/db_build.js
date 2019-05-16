const fs = require("fs");

const dbConnection = require("./db_connection.js");

let sql = fs.readFileSync(`${__dirname}/db_build.sql`).toString();

function lowercase(value) {
  return value.toLowerCase()
};


module.exports = {
  lowercase
}
