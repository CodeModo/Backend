//connect to mongodb
const mongoose = require("mongoose");
//require("dotenv").config();

mongoose.connect(
  process.env.MONGO_DB || "mongodb://localhost:27017/CodeModo",
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) {
      console.log("failed to connect to mongo db");
      console.error(err);
      process.exit(1);
    }
    console.log("connected to database successfully");
  }
);
