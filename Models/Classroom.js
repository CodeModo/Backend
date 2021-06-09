const mongoose = require('mongoose');

const classroomSchema = new mongoose.Schema({
    scheduleId : {
        type: String,
        required: true,    
    },
    instructors : [String],
    students : [String],
    sessions : [String]

},
{timestamps: true});

const classroom = mongoose.model('Classroom', classroomSchema);

module.exports = classroom;