const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    instructor : {
        type: String,
        required : true,
    },
    title: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true
    },
    comment: [
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
    ]

},
    { timestamps: true });

const session = mongoose.model('Session', sessionSchema);

module.exports = session;