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

