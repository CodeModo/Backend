const mongoose = require("mongoose");

const schema = mongoose.Schema({
  Name: {
    type: String,
    required: true,
    maxlength: 20,
    minlength: 4,
  },
  Password: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
    unique: true,
  },
  Phone: {
    type: String,
    required: true,
  },

  Address: {
    type: String,
  },

  Children: [String],
  role:
  { type: String, default: "Parent", enums: ["Parent"] }
});

const Parent = mongoose.model("Parent", schema);

module.exports = Parent;
