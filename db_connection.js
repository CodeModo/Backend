// //connect to monogdb

// const mongoose = require('mongoose');
// //require('dotenv').config();

// mongoose.connect(``, { useFindAndModify: false }, (err)=>{
//     if(err){
//       console.error(err);
//       process.exit(1);
//     }
//     console.info('db-connection successfully');
// });

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/Parent", (err) => {
  if (err) {
    console.warn(`failed to connect to mongoDB`);

    console.error(err);

    process.exit(1);
  }

  console.info(`connected to DB successfully`);
});
