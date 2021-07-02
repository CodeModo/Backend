const express = require('express');
const Schedule = require('../Models/Schedule');
const scheduleRouter = new express.Router();
const authentication = require('../Middleware/Authentication');
const authorization = require('../Middleware/Authorization');

//getAll
scheduleRouter.get("/", async (req, res) => {
  try {
    const schedules = await Schedule.find({});
    res.send({ "Schedules": schedules });
  } catch (error) {
    res.send(error);
  }
});


scheduleRouter.get("/:id", async (req, res) => {
  try {
    const schedule = await Schedule.findOne({_id: req.params.id});
    res.send( schedule );
  } catch (error) {
    res.send(error.message);
  }
});

scheduleRouter.use([authentication, authorization.admin]);
//Add schedule
scheduleRouter.post('/', async (req, res) => {
  try {
    //const {subject, time, date, meetingLink } = req.body;
    const schedule = await Schedule.create({ sessions: [] });
    //let newSession = {subject, time, date, meetingLink};
    //await Schedule.updateOne({_id : schedule._id},{ $push: { sessions: newSession } });
    res.send({ "id": schedule._id });
  } catch (error) {
    res.statusCode = 422;
    res.send(error);
  }
});

//Add subjects to schedule
scheduleRouter.patch('/addSubject/:scheduleId', async (req, res) => {
  try {
    const { subject, time, date, meetingLink } = req.body;
    let newSession = { subject, time, date, meetingLink };
    await Schedule.updateOne({ _id: req.params.scheduleId }, { $push: { sessions: newSession } });
    let schedule = await Schedule.findOne({ _id: req.params.scheduleId });
    res.send({ "Schedule": schedule });
  } catch (error) {
    res.statusCode = 422;
    res.send(error);
  }
});

//Edit items
// scheduleRouter.patch("/:id", async (req, res, next) => {
//   try {
//     const schedule2 = await Schedule.findOne({ _id: req.params.id });
//     const time = req.body.time || schedule2.time;
//     const date = req.body.date || schedule2.date;
//     const meetingLink = req.body.meetingLink || schedule2.meetingLink;
//     const schedule = await Schedule.updateOne({ _id: req.params.id },
//       {
//         time: time,
//         date: date,
//         meetingLink: meetingLink

//       });
//     res.send(schedule);
//   } catch (error) {
//     res.statusCode = 422;
//     res.send(error);
//   }
// })

//edit subject
scheduleRouter.patch("/editSubject/:scheduleId/:subjectId", async (req, res, next) => {
  let { subject, time, date, meetingLink } = req.body;
  try {
    let updatedSubject = await Schedule.findOne(
      { _id: req.params.scheduleId, "sessions._id": req.params.subjectId },
      { sessions: { $slice: 1 } }
    ).exec();
    updatedSubject = updatedSubject.sessions[0];
    if (updatedSubject != null) {
      subject = subject ?? updatedSubject.subject;
      time = time ?? updatedSubject.time;
      meetingLink =  meetingLink ?? updatedSubject.meetingLink;
      date =  date ?? updatedSubject.date;
      await Schedule.updateOne(
        { _id: req.params.scheduleId, "sessions._id": req.params.subjectId },
        {
          $set: {
            "sessions.$.subject": subject,
            "sessions.$.time": time,
            "sessions.$.date": date,
            "sessions.$.meetingLink": meetingLink,
          }
        }
      );
      res.statusCode = 200;
      res.send({ "message": "Session updated" });
    } else {
      res.statusCode = 404;
      res.send({ "message": "Session not found!" });
    }
  } catch (err) {
    res.statusCode = 422;
    console.error(err);
    res.send({ "message": "Something wrong, retry again!"});
  }
})

//Delete schedule
scheduleRouter.delete("/:id", async (req, res) => {
  try {
    const schedule = await Schedule.deleteOne({ _id: req.params.id });
    res.send("The day you've chosen is deleted from schedule");
  } catch (error) {
    res.statusCode = 422;
    console.error(error);
    res.send(error.message);
  }
});


// delete session
scheduleRouter.delete('/:scheduleId/:subjectId', async (req, res) => {
  try {
    const deletedSubject = await Schedule.findOne(
      { _id: req.params.scheduleId, "sessions._id": req.params.subjectId },
      { sessions: { $slice: 1 } }
    ).exec();
    if (deletedSubject != null) {
      await Schedule.updateOne(
        { _id: req.params.scheduleId },
        { $pull: { sessions: { _id: req.params.subjectId } } }
      );
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

module.exports = scheduleRouter;


