const express=require('express');
const Schedule=require('../Models/Schedule');
const scheduleRouter= new express.Router();

//getAll
scheduleRouter.get("/", async (req, res) => {
    try {
      const schedule = await Schedule.find({});
      res.send(schedule);
    } catch (error) {
      res.send(error);
    }
  });

  //Add items
  scheduleRouter.post('/', async(req, res) => {
    try {
        const {time,date,meetingLink}=req.body;
        const schedule = await Schedule.create({ time,date,meetingLink });
        res.send(schedule);
    } catch (error) {
        res.statusCode = 422;
        res.send(error);
    }
})

//Edit items
scheduleRouter.patch("/:id", async(req, res, next)=>{
    try {
        const schedule2 = await Schedule.findOne({ _id: req.params.id });
        const time = req.body.time || schedule2.time;
        const date = req.body.date || schedule2.date;
        const meetingLink = req.body.meetingLink || schedule2.meetingLink;
        const schedule = await Schedule.updateOne({ _id: req.params.id },
             {
                time: time,
                date:date,
                meetingLink:meetingLink   
             
        });
        res.send(schedule);
    } catch (error) {
        res.statusCode = 422;
        res.send(error);
    }
})

//Delete items
scheduleRouter.delete("/:id", async (req, res) => {
    try {
      const schedule = await Schedule.deleteOne({ _id: req.params.id });
      res.send("The day you've choosen is deleted from schedule");
    } catch (error) {
      res.statusCode = 422;
      console.error(error);
      res.send(error.message);
    }
  });
  


module.exports=scheduleRouter;


