


const mongoose = require('mongoose');
//require('dotenv').config();

mongoose.connect('mongodb://localhost:27017/Student', {useNewUrlParser: true, useUnifiedTopology: true}, (err)=>{
    if(err){
      console.log("failed to connect to mongo db")
      console.error(err);
      process.exit(1);
    }
    console.info('db-connected successfully');
});