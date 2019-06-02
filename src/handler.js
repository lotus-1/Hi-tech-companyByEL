const { readFile } = require('fs');
const path = require('path');
const qs = require('query-string');
const { getInfoRole, getInfoJob, getInfoEmployee } = require('./database/queries/getinfo.js');
const postinfo = require('./database/queries/postinfo.js');

const serverError = (err, response) => {
  //console.log("the response is" ,response);
  //console.log('type of response', typeof response);
  response.writeHead(500, 'Content-Type:text/html');
  response.end('<h1>There was a problem loading the homepage</h1>');
  // console.log("the error is ", err);
};

const homeHandler = response => {
  const filepath = path.join(__dirname, '..', 'public', 'index.html');
  readFile(filepath, (err, file) => {
    if (err) return serverError(err, response);
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.end(file);
  });
};

const getEmployeeHandler =  (url, response) => {
  //console.log('response', response);
  // console.log('typeof response is:', typeof response);
  let resultArray = [];
  getInfoEmployee((err, employee) => {
    console.log(err);
    console.log('employee:', employee);
    resultArray.push(employee);
 getInfoRole((err, role) => {
console.log(err);
   console.log('role:', role);
   resultArray.push(role);
getInfoJob((err, job) => {
console.log(err);
  console.log('job:', job);
   resultArray.push(job);
  response.writeHead(200, { 'Content-Type' : 'application/json' });
  response.end(JSON.stringify(resultArray));
      });
    });
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


// const createEmployeeHandler = (request, response) => {
// let result = '';
// request.on('data', (chunk) => {
//   result += chunk;
// });
// request.on('end', () => {
//   const first_name = qs.parse(result).first_name;
//   const last_name = qs.parse(result).last_name;
//   const phone_num = qs.parse(result).phone_num;
//   const job_id= qs.parse(result).job_id;
//
//   postData(first_name, last_name, phone_num, job_id,(err,res) => {
//     if(err) {
//       response.writeHead(500,{ 'Content-Type': 'text/html' });
//       fs.readFile(__dirname + '/../public/index.html', (error, file) => {
//         if (error) {
//         console.log(error);
//         return;
//       } else {
//         response.end(file);
//       }
//       })
//     }
//   })
// })
//
// }

const createEmployeeHandler = (request, response ) => {
let result = '';
request.on('data', chunk => {
  console.log("inside the create emp");

  result += chunk;
console.log("this is result:" , result);
});
request.on('end', () => {
 const { firstName, lastName, phoneNum, jobId } = qs.parse(result);
  postinfo(firstName, lastName, phoneNum, jobId, err => {
    if(err) {
        return serverError(err, response);
      } else {
        response.writeHead(302, { 'Location': '/' });
        response.end(firstName, lastName, phoneNum, jobId);
      }
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
