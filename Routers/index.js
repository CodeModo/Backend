/** Required External Modules **/
const express = require("express");
var cors = require('cors');
const ClassroomRouter = require('./classroom/Classroom');
const SessionRouter = require('./classroom/Session');
const CommentRouter = require('./Routers/classroom/SessionComment');
/** App Variables **/

const app = express();
const port = process.env.PORT || "3000";

/** App Configuration **/

app.use(cors());

/** Routes Definitions **/
app.use('/api/classroom', ClassroomRouter);
app.use('/api/session', SessionRouter);
app.use('/api/comment', CommentRouter);

app.use((req, res, next) => { //logger
    console.log(`Request Url : ${req.url}, Request method : ${req.method}, Date of Request: ${Date()}`);
    next();
});

app.use( (req, res, next) =>  { //error handler
    res.status(500);
    res.send({error : "server error"});
});



/** Server Activation **/

app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
});