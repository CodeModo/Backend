const express = require('express');

const mongoose = require('mongoose');

const Classroom = require('../Models/Classroom');
const Student = require('../Models/Student');


const ClassroomRouter = express.Router();

const authentication = require('../Middleware/Authentication');
const authorization = require('../Middleware/Authorization');



//Get a list of all Classrooms
ClassroomRouter.get('/', async (req, res) => {
    try {
        const Classrooms = await Classroom.find({}).exec();
        res.statusCode = 200;
        res.send({ "Classrooms": Classrooms });
    } catch (err) {
        res.statusCode = 422;
        res.send({ "message": "Something wrong, retry again!" });
    }
});

//Get specific classroom providing its id
ClassroomRouter.get('/:id', async (req, res) => {
    try {
        const classroom = await Classroom.findOne({ _id: req.params.id }).exec();
        if (classroom != null) {
            res.statusCode = 200;
            res.send({ "classroom": classroom });
        } else {
            res.statusCode = 404;
            res.send({ "message": "classroom not found!" });
        }
    } catch (err) {
        res.statusCode = 422;
        res.send({ "message": "Something wrong, retry again!" });
    }
});

ClassroomRouter.get('/studentOfClassroom/:id', async (req, res) => {
    try{
        const studentIds = await Classroom.findOne({_id: req.params.id},'students').exec();
        console.log(studentIds);
        if(studentIds['students'].length > 0){
            const studentList = await Student.find({_id : { $in: studentIds['students']}}).exec();
            res.statusCode = 200;
            res.send(studentList);
        }else
        {
            res.statusCode = 401;
            res.send({"message" : "No students found"});
        }
    } catch(err){
        console.error(err.message);
        res.statusCode = 422;
        res.send({ "message": "Something wrong, retry again!" });
    }
   
});

ClassroomRouter.use([authentication, authorization.admin]);

//Create new classroom
ClassroomRouter.post('/', async (req, res) => {
    const { name, scheduleId } = req.body;
    try {
        const newClassroom = await Classroom.create({ name, scheduleId });
        res.statusCode = 200;
        res.send({ "message": "Created successfully", "classroom": newClassroom });
    } catch (err) {
        res.statusCode = 400;
        res.send({ "message": "Something wrong, retry again!" });
    }
});

//Update a specific classroom providing its id
ClassroomRouter.patch('/:id', async (req, res) => {
    let { title, scheduleId } = req.body;
    try {
        const updatedClassroom = await Classroom.findOne({ _id: req.params.id });
        if (updatedClassroom != null) {
            await Classroom.updateOne({ _id: req.params.id }, { title: title ?? updatedClassroom.title, scheduleId: scheduleId ?? updatedClassroom.scheduleId });
            res.statusCode = 200;
            res.send({ "message": "classroom updated" });
        } else {
            res.statusCode = 404;
            res.send({ "message": "classroom not found!" });
        }
    } catch (err) {
        res.statusCode = 422;
        res.send({ "message": "Something wrong, retry again!" });
    }
});

//Delete a specific classroom providing its id
ClassroomRouter.delete('/:id', async (req, res) => {
    try {
        const classroom = await Classroom.findOne({ _id: req.params.id });
        if (classroom != null) {
            await Classroom.deleteOne({ _id: req.params.id });
            res.statusCode = 200;
            res.send({ "message": "classroom deleted" });
        } else {
            res.statusCode = 404;
            res.send({ "message": "classroom not found!" });
        }
    } catch (err) {
        res.statusCode = 422;
        res.send({ "message": "Something wrong, retry again!" });
    }
});

//Add student to a classroom
ClassroomRouter.post('addStudent/:classroomId', async (req, res) => {
    try {
        const classroom = await Classroom.findOne({ _id: req.params.classroomId }).exec();
        if (classroom != null) {
            await Classroom.updateOne({ _id: req.params.classroomId }, { $push: { students: req.body.studentId} });
            res.statusCode = 200;
            res.send({ "message": "Student added" });
        } else {
            res.statusCode = 404;
            res.send({ "message": "Classroom not found!" });
        }
    } catch (err) {
        res.statusCode = 422;
        res.send({ "message": "Something wrong, retry again!" });
    }
});

//Add student to a course
ClassroomRouter.post('addCourse/:classroomId', async (req, res) => {
    try {
        const classroom = await Classroom.findOne({ _id: req.params.classroomId }).exec();
        if (classroom != null) {
            await Classroom.updateOne({ _id: req.params.classroomId }, { $push: { courses: req.body.courseId} });
            res.statusCode = 200;
            res.send({ "message": "Course added" });
        } else {
            res.statusCode = 404;
            res.send({ "message": "Classroom not found!" });
        }
    } catch (err) {
        res.statusCode = 422;
        res.send({ "message": "Something wrong, retry again!" });
    }
});

//Add instructor to a classroom
ClassroomRouter.post('addInstructor/:classroomId', async (req, res) => {
    try {
        const classroom = await Classroom.findOne({ _id: req.params.classroomId }).exec();
        if (classroom != null) {
            await Classroom.updateOne({ _id: req.params.classroomId }, { $push: { instructors: req.body.instructorId} });
            res.statusCode = 200;
            res.send({ "message": "Instructor added"});
        } else {
            res.statusCode = 404;
            res.send({ "message": "Classroom not found!" });
        }
    } catch (err) {
        res.statusCode = 422;
        res.send({ "message": "Something wrong, retry again!" });
    }
});

//Add session to a classroom
ClassroomRouter.post('addSession/:classroomId', async (req, res) => {
    try {
        const classroom = await Classroom.findOne({ _id: req.params.classroomId }).exec();
        if (classroom != null) {
            await Classroom.updateOne({ _id: req.params.classroomId }, { $push: { sessions: req.body.sessionId} });
            res.statusCode = 200;
            res.send({ "message": "Session added"});
        } else {
            res.statusCode = 404;
            res.send({ "message": "Classroom not found!" });
        }
    } catch (err) {
        res.statusCode = 422;
        res.send({ "message": "Something wrong, retry again!" });
    }
});


module.exports = ClassroomRouter;