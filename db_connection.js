<<<<<<< HEAD
//connect to monogdb


const mongoose =require('mongoose');
mongoose.connect('mongodb://localhost:27017/Codemodo',(err)=>{
  if(err)
  {
      console.error(err);
      process.exit(1);
  }
  console.info(`connected to db successfully`);
});


//const mongoose = require('mongoose');
//require('dotenv').config();

/*mongoose.connect(``, { useFindAndModify: false }, (err)=>{
    if(err){
      console.error(err);
      process.exit(1);
    }
    console.info('db-connection successfully');
});*/

=======
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
>>>>>>> 6041481b8b79f5622eb4f453cee5f273e1ea2607
