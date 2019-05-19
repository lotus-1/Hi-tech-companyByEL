const { readFile } = require('fs');
const path = require('path');
const qs = require('qs');

const getinfo = require('./queries/getinfo.js');
const postinfo = require('./queries/postinfo.js');

const serverError = (err, response) => {
  response.writeHead(500, 'Content-Type:text/html');
  response.end('<h1>Sorry, there was a problem loading the homepage</h1>');
  console.log(err);
};

const homeHandler = response => {
  const filepath = path.join(__dirname, '..', 'public', 'index.html');
  readFile(filepath, (err, file) => {
    if (err) return serverError(err, response);
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.end(file);
  });
};

const getEmployeeHandler = response => {
  getinfo((err, users) => {
    if (err) return serverError(err, response);
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(employee));
  });
};

const publicHandler = (url, response) => {
  const filepath = path.join(__dirname, '..', url);
  readFile(filepath, (err, file) => {
    if (err) return serverError(err, response);
    const [, extension] = url.split('.');
    const extensionType = {
      html: 'text/html',
      css: 'text/css',
      js: 'application/javascript'
    };
    response.writeHead(200, { 'content-type': extensionType[extension] });
    response.end(file);
  });
};

const createEmployeeHandler = (url, response) => {
let result = '';
request.on('data', function(chunk) {
  result += chunk;
});
request.on('end', () => {
  const first_name = queryString.parse(result).first_name;
  const last_name = queryString.parse(result).last_name;
  const phone_num = queryString.parse(result).phone_num;
  const job_id = queryString.parse(result).job_id;

  postinfo(first_name, last_name, phone_num, job_id, (err,res) => {
    if(err) {
      response.writeHead(500,{ 'Content-Type': 'text/html' });
      fs.readFile(__dirname + '/../public/index.html', function(error, file) {
        if (error) {
        console.log(error);
        return;
      } else {
        response.end(file);
      }
      })
    }
  })
})

}

const errorHandler = response => {
  response.writeHead(404, { 'content-type': 'text/html' });
  response.end('<h1>404 Page Requested Cannot be Found</h1>');
};

module.exports = {
  homeHandler,
  getEmployeeHandler,
  publicHandler,
  createEmployeeHandler,
  errorHandler
};
