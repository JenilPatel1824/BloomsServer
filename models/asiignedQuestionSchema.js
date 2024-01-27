const mongoose = require('mongoose');

const assignedQuestionSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  CO: {
    type: String,
    required: true,
  },
  questions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question', // Assuming your question schema is named 'Question'
  }],
  
  
});

const AssignedQuestion = mongoose.model('AssignedQuestion', assignedQuestionSchema);

module.exports = AssignedQuestion;
