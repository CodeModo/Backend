/** Required External Modules **/
const express = require("express");
var cors = require('cors');
require("./db_connection");

/** App Variables **/
const app = express();
const ClassroomRouter = require('./Routers/Classroom/Classroom');
const SessionRouter = require('./Routers/Classroom/Session');
const CommentRouter = require('./Routers/Classroom/SessionComments');
const admin = require("./Routers/Admin");
//const instructor = require("./Routers/Instructor");
let port = process.env.PORT || 3000;

/** App Configuration **/
app.use(cors());
app.use(express.json());

/** Routes Definitions **/
console.log(ClassroomRouter)
app.use('/api/classroom', ClassroomRouter);
app.use('/api/session', SessionRouter);
app.use('/api/comment', CommentRouter);
app.use('api/admin', admin);
//app.use('api/instructor', instructor);

app.use((req, res, next) => { //logger
    console.log(`Request Url : ${req.url}, Request method : ${req.method}, Date of Request: ${Date()}`);
    next();
});

app.use( (req, res, next) =>  { //error handler
    res.status(500);
    res.send({error : "server error"});

});

app.use((req, res, next) => { //error handler
  res.status(500);
  res.send({ error: "server error" });
});

/** Server Activation **/
app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
