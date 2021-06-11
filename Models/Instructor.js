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
  specialization: {
    type: String,
    required: true,
  },
  achievements: {
    type: [String],
  },
  role:
    { type: String, default: "Instructor", enums: ["Instructor"] }
});

const Instructor = mongoose.model("Instructor", InstructorSchema);
module.exports = Instructor;
