const express = require('express');

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


//get all students
StudentRouter.get('/allStudents', async (req, res, next) => {                    //done
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

StudentRouter.post("/login", async (req, res) => {
    try {
      const { UserName, Password } = req.body;
      const user = await Student.findOne({ UserName }).exec();
      if (!user) throw new Error("wrong Email or Password");
      const isMatch = await bcrypt.compare(Password, user.Password);
      if (!isMatch) throw new Error("wrong username or password");
      //generate token
      const token = jwt.sign({ id: user.id, role : user.role }, "my-signing-secret");
      res.json({ token });
    } catch (err) {
      if (err) {
        console.error(err);
        res.statusCode = 422;
        res.json({ success: false, message: err.message });
        //  return;
      }
    }
  });

StudentRouter.use([authentication, authorization.parent]);

StudentRouter.post('/Create', async (req, res, next) => {                   //create
    try {
        console.log(req.body)
        const { Fname, Lname, BirthDate, UserName, Password } = req.body;
        const student = await Student.create({ Fname: Fname, Lname: Lname, BirthDate: BirthDate, UserName: UserName, Password: Password });
        res.statusCode = 200;
        res.send({ message: 'Created successfully' });

    }
    catch (err) {
        res.statusCode = 401;
        res.send(err);
        console.log(err);
    }
})


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
})


//delete
StudentRouter.delete('/delete/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        await Student.deleteOne({ _id: id });
        res.statusCode = 200;
        res.send({ success: true, message: "deleted Successfully" });
        next();
    }
    catch (err) {
        res.statusCode = 401;
        res.send({ success: false, message: err })
    }
})


module.exports = StudentRouter;