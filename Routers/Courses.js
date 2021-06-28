const express = require("express");
const CourseRouter = express.Router();
const Course = require("../Models/Courses");



const authentication = require('../Middleware/Authentication');
const authorization = require('../Middleware/Authorization');

///////base /api/course


//get course By ID
CourseRouter.get('/:id', async (req, res) => {
    try {
        const course = await Course.findOne({ _id: req.params.id });
        res.send(course);
    } catch (error) {
        res.statusCode = 422;
        res.send(error);
    }
})

//get course By Level
CourseRouter.get('/level/:l', async (req, res) => {
    try {
        const course = await Course.find({ Level: req.params.l });
        res.send(course);
    } catch (error) {
        res.statusCode = 422;
        res.send(error);
    }
})

////Get All Courses
CourseRouter.get('/', async (req, res) => {
    try {
        const courses = await Course.find({});
        res.send(courses);
    } catch (error) {
        res.statusCode = 422;
        res.send(error);
    }
})

CourseRouter.use([authentication, authorization.instructor]);

CourseRouter.post('/', async (req, res) => {
    try {
        console.log(req.body);
        const Name = req.body.Name;
        const Level = req.body.Level;
        const Description = req.body.Description
        const newCourse = await Course.create({ Name, Level, Description });
        res.send(newCourse);
    } catch (error) {
        res.statusCode = 422;
        res.send(error);
    }
});


///Edit
CourseRouter.patch('/:id', async (req, res) => {
    try {
        const course = await Course.findOne({ _id: req.params.id });
        const newName = req.body.Name || course.Name;
        const newLevel = req.body.Level || course.Level;
        const newDescription = req.body.Description || course.Description;
        const updatedCourse = await Course.updateOne({ _id: req.params.id }, {
            $set: {
                Name: newName,
                Level: newLevel,
                Description: newDescription
            }
        });
        res.send(updatedCourse)
    } catch (error) {
        res.statusCode = 422;
        res.send(error);
    }
})

///Delete Course
CourseRouter.delete('/:id', async (req, res) => {
    try {
        const course = await Course.deleteOne({ _id: req.params.id });
        res.send(course);
    } catch (error) {
        res.statusCode = 422;
        res.send(error);
    }
})


module.exports = CourseRouter;
