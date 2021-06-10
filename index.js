/** Required External Modules **/
const express = require("express");
var cors = require("cors");
require("./db_connection");
/** App Variables **/

const app = express();
const port = process.env.PORT || "3000";
app.use(express.json());

/** App Configuration **/

app.use(cors());

/** Routes Definitions **/
const parentRouter = require("./Routers/Parent");
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

/** Server Activation **/

app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
