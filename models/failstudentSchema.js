const mongoose = require('mongoose');

const failstudentSchema = new mongoose.Schema({
  Department: {
    type: String,
    required: true,
  },
  Semester: {
    type: String,
    required: true,
  },
  Subject: {
    type: String,
    required: true,
  },
  Skill: {
    type: String,
    required: true,
  },
  UnsuccessfulStudents: {
    type: Number,
    default: 0,  // You can set a default value if needed
  },
});

const Failstudent = mongoose.model('failstudent', failstudentSchema);

module.exports = Failstudent;
