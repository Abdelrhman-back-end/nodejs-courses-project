const jwt = require('jsonwebtoken'); 
const appError = require('../utils/appError');
const httpStatustext = require('../utils/httpStatustext');
const verfiyToken = (req , res , next) =>{
    const authHeader = req.headers['Authorization'] || req.headers['authorization'];
    if(!authHeader)
    {
        const Error = appError.create('Token is required' , 401 , httpStatustext.Error);
        return next(Error); 

    }
    const token = authHeader.split(' ')[1];
    try{
    const CurrentUser = jwt.verify(token , process.env.JWT_SECRET_KEY);
    req.CurrentUser = CurrentUser;
    next();
    }
    catch(err){
      const Error = appError.create('invalid Token' , 401 , httpStatustext.Error);
      return next(Error);
   
    }
}
module.exports = verfiyToken;