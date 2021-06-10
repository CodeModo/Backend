const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    instructorId : {
        type: String,
        required : true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    meetingUrl: {
        type: String,
        required: true
    },
    comments: [
        {
            _id: {
                type: mongoose.Schema.Types.ObjectId,
                index: true,
                required: true,
                auto: true,
            },
            commenterId: {
                type: String,
                required: true,
            },
            comment: {
                type: String,
                required: true,
                maxlength: 100
            }
        }
    ],
    assignmentDescription : String,
    assignmentUploads : [
        {
            _id: {
                type: mongoose.Schema.Types.ObjectId,
                index: true,
                required: true,
                auto: true,
            },
            studentId : {
                type : String,
                required : true,
            },
            file: Buffer,
            link : String
        }
    ]

},
    { timestamps: true });

const session = mongoose.model('Session', sessionSchema);

module.exports = session;