/** Required External Modules **/
const app = express();
require('./db_connection');
 
app.use(cors());
app.use(express.json());


const CourseRouter = require("./Routers/Courses")
/** App Variables **/

const port = process.env.PORT || "3000";

/** App Variables **/

const ClassroomRouter = require('./Routers/Classroom');
const SessionRouter = require('./Routers/Session')
const CommentRouter = require('./Routers/SessionComments');
const admin = require("./Routers/Admin");
const Student = require('./Routers/Student');
const instructor = require("./Routers/Instructor");
let port = process.env.PORT || 3000;

/** App Configuration **/


/** Routes Definitions **/
console.log(ClassroomRouter)
app.use('/api/classroom', ClassroomRouter);
app.use('/api/session', SessionRouter);
app.use('/api/comment', CommentRouter);
app.use('api/admin', admin);
app.use('/api/Student',Student);
app.use('api/instructor', instructor);



app.use((req, res, next) => { //logger
    console.log(`Request Url : ${req.url}, Request method : ${req.method}, Date of Request: ${Date()}`);
    console.log(req.body);
    next();
});

app.use("/api/course",CourseRouter);



app.use((req, res, next) => { //error handler
  res.status(500);
  res.send({ error: "server error" });
});

/** Server Activation **/
app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
