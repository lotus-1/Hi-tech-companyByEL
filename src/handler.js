const { readFile } = require('fs');
const path = require('path');
const qs = require('query-string');
const { getInfoRole, getInfoJob, getInfoEmployee, getUserFromDatabase } = require('./database/queries/getinfo.js');
const postinfo = require('./database/queries/postinfo.js');
var bcrypt = require('bcryptjs');
// const Store = require('data-store')
// const db = new Store('db', { cwd: './' });

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


const createEmployeeHandler = (request, response ) => {
let result = '';
request.on('data', chunk => {
  console.log("inside the create emp");

  result += chunk;
console.log("this is result:" , result);
});
request.on('end', () => {
  console.log('inside the end');
 const { firstName, lastName, phoneNum, jobId } = qs.parse(result);
 console.log('inside the end',  firstName, lastName, phoneNum, jobId);

  postinfo(firstName, lastName, phoneNum, jobId, (err, res) => {
    console.log('inside the post');
    if(err) {
        return serverError(err, response);
        console.log('inside the post2');
      } else {
        response.writeHead(302, { 'Location': '/' });
        response.end(firstName, lastName, phoneNum, jobId);
        console.log('inside the post3');

      }
      });
    });
};

const loginHandler = (request, response ) => {
  const filepath = path.join(__dirname, '..','public', 'login.html');
  readFile(filepath, (err, file) => {
    if (err) return serverError(err, response);
  console.log('this is login handler');
  response.writeHead(200, { "content-type": "text/html" });
  response.end(file);
})
};

const signupHandler = (request, response ) => {
  const filepath = path.join(__dirname, '..','public', 'register.html');
  readFile(filepath, (err, file) => {
  if (err) return serverError(err, response);
  console.log('this is register handler');
  response.writeHead(200, { "content-type": "text/html" });
  response.end(file);
})
};

const registerHandler = (request, response) => {
  var body = '';
   request.on('data', (data) => {
     body += data.toString();
   });
   request.on('end', () => {
     const { email, password } = qs.parse(body)
     bcrypt.hash(password, 8, (hashErr, hashedPassword) => {
       if (hashErr) {
         response.statusCode = 500;
         response.end('Error registering')
         return
       }
       queries.addUserToDatabase(email, hashedPassword, (err, result) => {
         if (err) {
           response.statusCode = 500;
           response.end('Error registering')
           return
         }
         response.statusCode = 200;
         response.end('successfully registered!')
       });
     })
   });
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
  loginHandler,
  signupHandler,
  errorHandler,
  registerHandler
};
