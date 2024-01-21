const mongoose = require('mongoose');

const markSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
  },
  semester: {
    type: Number,
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
  // You can add more CO fields as needed
  rollNo: {
    type: String,
    required: true,
  },
});

const Mark = mongoose.model('Mark', markSchema);

module.exports = Mark;
