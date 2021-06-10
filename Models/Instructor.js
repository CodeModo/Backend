const mongoose = require("mongoose");

const InstructorSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  specialzation: {
    type: String,
    required: true,
  },
  achievements: {
    type: [String],
  },
});

const Instructor = mongoose.model("Instructor", InstructorSchema);
module.exports = Instructor;
