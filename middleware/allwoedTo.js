const appError = require("../utils/appError");

module.exports = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.CurrentUser.role)) {
        return next(appError.create('Forbidden: Insufficient permissions' , 401));
    }
    next();
  };
};
