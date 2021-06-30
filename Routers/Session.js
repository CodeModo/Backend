const express = require('express');

const mongoose = require('mongoose');

const Session = require('../Models/Session');
const Classroom = require('../Models/Classroom');

const SessionRouter = express.Router();

const authentication = require('../Middleware/Authentication');
const authorization = require('../Middleware/Authorization');

module.exports = SessionRouter;


//Get a list of all Sessions
SessionRouter.get('/', async (req, res) => {
    try {
        const sessions = await Session.find({}).exec();
        res.statusCode = 200;
        res.send({ "Sessions": sessions });
    } catch (err) {
        res.statusCode = 422;
        res.send({ "message": "Something wrong, retry again!" });
    }
});

//Get specific Session providing its id
SessionRouter.get('/:id', async (req, res) => {
    try {
        const session = await Session.findOne({ _id: req.params.id }).exec();
        if (session != null) {
            res.statusCode = 200;
            res.send({ "Session": session });
        } else {
            res.statusCode = 404;
            res.send({ "message": "Session not found!" });
        }
    } catch (err) {
        res.statusCode = 422;
        res.send({ "message": "Something wrong, retry again!" });
    }
});


//Create new Session
SessionRouter.use([authentication, authorization.instructor]);

SessionRouter.post('/:classroomId', async (req, res) => {
    const { title, description, meetingUrl } = req.body;
    try {
        classroom = await Classroom.findOne({_id: req.params.classroomId});
        if(classroom != null){
        let newSession = await Session.create({ 
             title, description, meetingUrl, instructorId : req.signedData.id , comments: [], assignmentUploads : [] 
        });
        console.log(newSession._id);
        await Classroom.updateOne({ _id: req.params.classroomId }, { $push: { sessions: newSession._id} });

        res.statusCode = 200;
        res.send({ "message": "Created successfully" });
    }else{
        res.statusCode = 404;
        res.send({"message": "Classroom not found"});
    }
    } catch (err) {
        res.statusCode = 400;
        res.send({ "message": "Something wrong, retry again!" });
    }
});

//Update a specific Session providing its id
SessionRouter.patch('/:id', async (req, res) => {
    let { title, description, meetingUrl } = req.body;
    try {
        const updatedSession = await Session.findOne({ _id: req.params.id });
        if (updatedSession != null) {
            await Session.updateOne(
                { _id: req.params.id }, 
                { 
                    title: title ?? updatedSession.title, 
                    description: description ?? updatedSession.description, 
                    meetingUrl: meetingUrl ?? updatedSession.meetingUrl
                });
            res.statusCode = 200;
            res.send({ "message": "Session updated" });
        } else {
            res.statusCode = 404;
            res.send({ "message": "Session not found!" });
        }
    } catch (err) {
        res.statusCode = 422;
        res.send({ "message": "Something wrong, retry again!" });
    }
});

//Delete a specific Session providing its id
SessionRouter.delete('/:id', async (req, res) => {
    try {
        const session = await Session.findOne({ _id: req.params.id });
        if (session != null) {
            await Session.deleteOne({ _id: req.params.id });
            res.statusCode = 200;
            res.send({ "message": "Session deleted" });
        } else {
            res.statusCode = 404;
            res.send({ "message": "Session not found!" });
        }
    } catch (err) {
        res.statusCode = 422;
        res.send({ "message": "Something wrong, retry again!" });
    }
});

//Add or edit assignment 
SessionRouter.patch('/:id', async (req, res) => {
    let { assignmentDescription } = req.body;
    try {
        const updatedSession = await Session.findOne({ _id: req.params.id });
        if (updatedSession != null) {
            await Session.updateOne(
                { _id: req.params.id }, 
                { 
                    assignmentDescription : assignmentDescription
                });
            res.statusCode = 200;
            res.send({ "message": "Assignment added" });
        } else {
            res.statusCode = 404;
            res.send({ "message": "Session not found!" });
        }
    } catch (err) {
        res.statusCode = 422;
        res.send({ "message": "Something wrong, retry again!" });
    }
});