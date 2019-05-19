const { readFile } = require('fs');
const path = require('path');
const qs = require('qs');
const request = require('request');
const response = require('response');

const getinfo = require('./database/queries/getinfo.js');
const postinfo = require('./database/queries/postinfo.js');

const serverError = (err, response) => {
  response.writeHead(500, { 'Content-Type' : 'text/html' });
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

const createEmployeeHandler = (request, response ) => {
let result = '';
request.on('result', chunk => {
  result += chunk;
});
request.on('end', () => {
 const { first_name, last_name, phone_num, job_id } = qs.parse(result);
  postinfo(first_name, last_name, phone_num, job_id, err => {
    if(err)  return serverError(err, response);
        response.writeHead(302, { 'Location': '/' });
        response.end(first_name, last_name, phone_num, job_id);
      });
    });
};

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
