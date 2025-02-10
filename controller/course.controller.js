const { validationResult } = require("express-validator");
const Course = require('../models/course_model');
const httpStatustext = require('../utils/httpStatustext');
const asyncwraper = require('../middleware/asyncwraper');
const AppError = require('../utils/appError');
const Getallcourses = asyncwraper (async (req, res) => {
     const query = req.query;
     const limit = query.limit || 10;
     const page = query.page || 1;
     const skip = (page - 1 ) * limit;
  const courses = await Course.find({} , {'__v' : false}).limit(limit).skip(skip);
  res.json({status : httpStatustext.Success , data : {courses}});
}

);
const singlcourse = asyncwraper (async(req, res , next) => {
      
   const course = await Course.findById(req.params.courseId);
  if (!course) {
   return next(AppError.create('course not found' , 404 , httpStatustext.Fail))
  }
  return res.json({status : httpStatustext.Success , data : {course}});

}
);


const Addcourses =  asyncwraper (async (req, res , next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    next(AppError.create(errors.array() , 400 , httpStatustext.Fail));
  } 
 const  newCourse = new Course (req.body);
 await newCourse.save();
  res.status(201).json({status : httpStatustext.Success , data : {course : newCourse}});
}
);


const Updatecourse = asyncwraper( async (req, res) => {
const courseId = req.params.courseId;
const UpdateCourse = await Course.findByIdAndUpdate( courseId , {$set: {...req.body}});
res.status(200).json({status : httpStatustext.Success , data : {course : UpdateCourse}});
}
);

const deletecourse = asyncwraper( async (req, res) => {
  await Course.deleteOne({_id : req.params.courseId})
  res.status(200).json({ status : httpStatustext.Success , data : null});
}
)



module.exports = {
  Getallcourses,
  singlcourse,
  Addcourses,
  Updatecourse,
  deletecourse,
  
};
