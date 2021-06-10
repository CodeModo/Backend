/* Required External Modules */
var cors = require("cors");
require("./db_connection");

/* App Variables */
const app = express();
const ClassroomRouter = require("./Routers/Classroom");
const SessionRouter = require("./Routers/Session");
const CommentRouter = require("./Routers/SessionComments");
const admin = require("./Routers/Admin");
const Student = require("./Routers/Student");
const instructor = require("./Routers/Instructor");
const scheduleRouter = require("./Routers/Schedule");
const CourseRouter = require("./Routers/Courses");
const parentRouter = require("./Routers/Parent");
let port = process.env.PORT || 3000;

/** App Configuration **/
app.use(cors());
app.use(express.json());


/* Routes Definitions */
app.use("/api/classroom", ClassroomRouter);
app.use("/api/session", SessionRouter);
app.use("/api/comment", CommentRouter);
app.use("api/admin", admin);
app.use("/api/Student", Student);
app.use("api/instructor", instructor);
app.use("/api/schedule", scheduleRouter);
app.use("/api/course", CourseRouter);
app.use("/api/parent", parentRouter);

app.use((req, res, next) => {
  //logger
  console.log(
    `Request Url : ${req.url}, Request method : ${
      req.method
    }, Date of Request: ${Date()}`
  );
  next();
});

app.use((req, res, next) => {
  //error handler
  res.status(500);
  res.send({ error: "server error" });
});

/* Server Activation */
app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
