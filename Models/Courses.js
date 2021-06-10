const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    Name:{
        type:String,
        required:true,
        unique:true
    },
    Level:{
        type:String,
        enum :['beginner','intermediate','advanced'],
        required:true
    },
    Description:{
        type:String
    }
});

const Course= mongoose.model('course',schema);
module.exports= Course;