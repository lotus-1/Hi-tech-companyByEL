const {
  homeHandler,
  getEmployeeHandler,
  publicHandler,
  createEmployeeHandler,
  errorHandler
} = require('./handler');

const router = (request, response) => {
  console.log("type of reqest : " , typeof request);
  const url = request.url;
  console.log("url is: " , url);

  if (url === '/') {
    homeHandler(response);
  }  else if (url.includes('public')) {
    publicHandler(url, response);
  } else if (url.includes('/employee')){
    getEmployeeHandler(url, response);
  } else if (url.includes('/create-employee')){
    createEmployeeHandler(request, response); // /public/index.js
  } else {
    errorHandler(response);
  }
};

module.exports = router;
