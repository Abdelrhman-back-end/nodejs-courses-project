
require('dotenv').config();
const { message } = require('./utils/appError');
const express = require("express");
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const url = process.env.MONGO_URL;
const httpStatustext = require('./utils/httpStatustext');
mongoose.connect(url).then(()=>{
  console.log("mongodb server started");
});
app.use(cors());
app.use(express.json());
const UsersRouter = require('./routes/users.routes');
const coursesRouter = require('./routes/courses.routes');
app.use('/api/courses' , coursesRouter); 
app.use('/api/users' , UsersRouter);
app.all('*' , (req , res , next ,)=>{
    return res.status(404).json({status : httpStatustext.Error , message : "this resource is not available"})
})
app.use((error,req , res , next)=>{
  res.status(error.StatusCode || 500).json({status : error.StatusText || httpStatustext.Error , message : error.Message , code : error.StatusCode || 500 , data :  null});
})
app.listen(process.env.PORT || 4000, () => {
     console.log("listenig on port 4000");
});
 



