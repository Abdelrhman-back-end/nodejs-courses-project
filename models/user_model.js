const mongoose = require("mongoose");
const validator = require("validator");
const UserRoles = require("../utils/role");
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique : true,
    validate : [validator.isEmail , 'filed must be a valid email address']
  },
  password :{
    type : String,
    required : true,
  },
  role : {
   type : String,
   enum : ['USER' , 'MANGER' , 'ADMIN'],
   default : 'USER'
  }
  
  
});

module.exports = mongoose.model('User' , userSchema);
