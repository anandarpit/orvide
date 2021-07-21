  
const catchAsync = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((err) => {
      if(err.isJoi === true) err.status = 422
      logError(err)
      next(err); 
  });
};

module.exports = catchAsync;