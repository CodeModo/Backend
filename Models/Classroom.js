const mongoose = require('mongoose');

const classroomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, 
    },
    scheduleId: {
        type: String,
        required: true,
    },
    instructors: [String],
    students: [String],
    sessions: [String],
    courses : [String]
},
    { timestamps: true });

const classroom = mongoose.model('Classroom', classroomSchema);

module.exports = classroom;