/** Required External Modules **/
const express = require("express");
var cors = require('cors');
require('./db_connection');
const app = express();
app.use(express.static('public'));  

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
const jwt =require('jsonwebtoken');

/** App Variables **/

const Student = require('./Routers/Student');
const port = process.env.PORT || "3000";

/** App Configuration **/

app.use(cors());
    
/** Routes Definitions **/
app.use('/api/Student',Student);
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