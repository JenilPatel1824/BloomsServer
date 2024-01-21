const mongoose = require('mongoose');

const markSchema = new mongoose.Schema({
  rollNo: {
    type: String,
    required: true,
  },
  sem: {
    type: Number, // Assuming sem is a number, adjust if it's a string
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  co1: {
    type: Number,
    required: true,
  },
  co2: {
    type: Number,
    required: true,
  },
  co3: {
    type: Number,
    required: true,
  },
  co4: {
    type: Number,
    required: true,
  },
  co5: {
    type: Number,
    required: true,
  },
  co6: {
    type: Number,
    required: true,
  },
  // Add more fields as needed
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student', // Reference to the Student model
    required: true,
  },
});

const Mark = mongoose.model('Mark', markSchema);

module.exports = Mark;
