//connect to mongodb
const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(
  `mongodb+srv://rokaia-admin:${process.env.DBPASSWORD}@cluster0.i8bmm.mongodb.net/CodeModo?retryWrites=true&w=majority` 
  || "mongodb://localhost:27017/CodeModo",
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
