//connect to mongodb

const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(`mongodb://localhost:27017/test`, { useFindAndModify: false }, (err)=>{
    if(err){
      console.error(err);
      process.exit(1);
    }
    console.info('db-connection successfully');
});