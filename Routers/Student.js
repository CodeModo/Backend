const express =require('express');
var bcrypt = require('bcrypt');
const app = express();
app.use(express.json());
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const Student = require('../Models/Student');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const authentication = require('../Middleware/Authentication');
const authorization = require('../Middleware/Authorization'); 

const StudentRouter = new express.Router();
StudentRouter.use(cors());


StudentRouter.post('/Create',async (req,res,next)=>{                   //create
try{
    console.log(req.body)
const {Fname,Lname,BirthDate,UserName,Password}= req.body;
const hash = await bcrypt.hash(Password,10);
const student = await Student.create({Fname:Fname,Lname:Lname,BirthDate:BirthDate,UserName:UserName,Password:hash}) ;
res.statusCode=200;
res.send({message:'Created succefully'});

}
catch(err){
res.statusCode=401;
res.send(err);
console.log(err);
}
})

/////////////////login

StudentRouter.post('/login', async(req,res,next)=>{
    try{
        const {username,password} = req.body;
        const user =await Student.findOne({UserName:username});
        if(!user){
            err =new Error("wrong username");
            res.statusCode = 401;
            res.send(err);
            
        }

        const isMatch =await bcrypt.compare(password,user.Password);
        if(! isMatch){
            err =new Error("wrong password");
            res.statusCode = 402;
            res.send(err);
            
        }
        const token = jwt.sign({id:user.id},'my-signing-secret');
        const userName =user.UserName;
        res.statusCode =200;
        res.send({token:token,message:"login-successfully",userName});
        next();
    }
    catch(err){
        res.statusCode = 422;
        res.json({success:'false',message:err.message});
        
    }
})

StudentRouter.get('/profile/:id',async (req,res,next)=>{                  //retrieve
    try{
        const {id} = req.params;
        const student = await Student.findOne({_id:id});
        res.statusCode=200;
        res.send({success:true,student});
    }
        catch (err) {
            res.statusCode = 401;
            res.send({ message: err, success: false })
        }
    })

//get all students
StudentRouter.get('/allStudents', async (req, res, next) => {                   
    try {
        const students = await Student.find({});
        res.statusCode = 200;
        res.send(students);

        next();
    }
    catch (err) {
        res.statusCode = 401;
        res.send({ message: err, success: false })
    }
})

StudentRouter.get('/profile/:id', async (req, res, next) => {                  //retrieve
    try {
        const { id } = req.params;
        const student = await Student.findOne({ _id: id });
        res.statusCode = 200;
        res.send({ success: true, student });
        next();
    }
    catch (err) {
        console.log("hi error");
        res.statusCode = 401;
        res.send({ success: false, message: `Authentication failed` });
        console.log(err);
    }
})



StudentRouter.use([authentication, authorization.parent]);




//update
StudentRouter.patch('/edit/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const { _Fname, _Lname, _BirthDate, _UserName, _Password } = req.body;
        //const s= Student.findOne()
        await Student.updateOne({ _id: id }, { Fname: _Fname, Lname: _Lname, BirthDate: _BirthDate, UserName: _UserName, Password: _Password })
        res.statusCode = 200;
        res.send({ message: 'updated successfully', success: true });
        next();
    }
    catch (err) {
        res.statusCode = 401;
        res.send({ success: false, message: err });

    }
});






















