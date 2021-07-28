const catchAsync = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((err) => {
      if(err.isJoi === true) err.status = 422
      next(err); 
  });
};

module.exports = catchAsync;