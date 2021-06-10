const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    time:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true    
    },
    meetingLink:{
        type:String,
        required:true
    }
    
});

const Schedule=mongoose.model('Schedule',schema);
module.exports=Schedule; 
