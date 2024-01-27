const mongoose = require('mongoose');

const practiceQuestionSchema = new mongoose.Schema({
  semester: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  co: {
    type: String,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },

});

const PracticeQuestion = mongoose.model('PracticeQuestion', practiceQuestionSchema);

module.exports = PracticeQuestion;
