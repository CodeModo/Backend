//connect to monogdb

const mongoose = require('mongoose');
//require('dotenv').config();

mongoose.connect(`mongodb://localhost:30613/codemodo`, { useFindAndModify: false }, (err)=>{
    if(err){
      console.error(err);
      process.exit(1);
    }
    console.info('db-connection successfully');
});