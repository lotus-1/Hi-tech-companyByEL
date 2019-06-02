const {
  homeHandler,
  getEmployeeHandler,
  publicHandler,
  createEmployeeHandler,
  loginHandler,
  signupHandler,
  errorHandler
} = require('./handler');

const router = (request, response) => {
  // console.log("type of reqest : " , typeof request);
  const url = request.url;
  // console.log("url is: " , url);
  //console.log('this the res in router', response);

  if (url === '/') {
    homeHandler(response);
  }  else if (url.includes('public')) {
    publicHandler(url, response);
  } else if (url.includes('/employee')){
    getEmployeeHandler(url, response);
  } else if (url.includes('/create-employee')){
    createEmployeeHandler(request, response);
  } else if (url.includes('/login')){
    loginHandler(request, response);
  } else if (url.includes('/register')){
    signupHandler(request, response);
  } else {
    errorHandler(response);
  }
};

module.exports = router;
