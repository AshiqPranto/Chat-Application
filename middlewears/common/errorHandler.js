const createError = require("http-errors");

//404 not found handler
function notFoundHandler(req, res, next) {
  next(createError(404, "Your request content was not found"));
}

//default error handler
function errorHandler(err, req, res, next) {

  //we can send data to views directly through locals, here we send "error" data
  //to views throug local, we can also send data throug render function like below
  res.locals.error = process.env.NODE_ENV === "development" ? err : {message: err.message};
  // res.status(err.status || 500);
  res.locals.error.status = (err.status || 500);
  res.locals.error.stack = err.stack;
  if(res.locals.html)
  {
    res.render("error",{
      title: "Error Page",
    });
  }else{
    res.json(res.locals.error);
  }

}

module.exports = {
  notFoundHandler,
  errorHandler,
};
