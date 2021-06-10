/** Required External Modules **/
const express = require("express");
var cors = require('cors');
require("./db_connection");


/** App Variables **/

const scheduleRouter=require("./Routers/Schedule");
const app = express();
const port = process.env.PORT || "3000";

/** App Configuration **/

app.use(cors());
app.use(express.json());
app.use('/api/schedule',scheduleRouter);

/** Routes Definitions **/

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