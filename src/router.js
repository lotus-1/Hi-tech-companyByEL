const {
  homeHandler,
  getEmployeeHandler,
  publicHandler,
  createEmployeeHandler,
  errorHandler
} = require('./handler');

const router = (request, response) => {
  const { url } = request;

  if (url === '/') {
    homeHandler(response);
  }  else if (url.includes('public')) {
    publicHandler(url, response);
  } else if (url.includes('/employee')){
    getEmployeeHandler(url, response);
  } else if (url.includes('/create-employee')){
    createEmployeeHandler(url, response);
  } else {
    errorHandler(response);
  }
};

module.exports = router;
