/** Required External Modules **/
const express = require("express");
var cors = require('cors');
const admin = require('./Routers/Admin');
/** App Variables **/

const app = express();
const port = process.env.PORT || "3000";

/** App Configuration **/

app.use(cors());

/** Routes Definitions **/
app.use('/api/admin',admin);
app.use((req, res, next) => { //logger
    console.log(`Request Url : ${req.url}, Request method : ${req.method}, Date of Request: ${Date()}`);
    next();
});

app.use( (req, res, next) =>  { //error handler
    res.status(500);
    res.send({error : "server error"});
});



/** Server Activation **/

app.listen(3000, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
});