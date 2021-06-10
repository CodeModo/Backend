 const mongoose= require('mongoose');
const StudentSchema=new mongoose.Schema({
    Fname:{
        type:String,
        required:true
    },
    Lname:{
        type:String,
        required:true
    },
    BirthDate:{
        type:String,
        required:true
    },
    UserName:{
        type:String,
        required:true,
        unique:true
    },
    Password:{
        type:String,
        required:true,
        unique:true
    }
})
const Student = mongoose.model('Student',StudentSchema);
module.exports=Student;