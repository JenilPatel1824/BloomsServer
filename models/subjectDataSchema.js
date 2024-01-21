const mongoose = require('mongoose');

const subjectDataSchema = new mongoose.Schema({
  sem: { type: String, required: true },
  subject: { type: String, required: true },
  coMarks: { type: [Number], required: true, validate: [arrayLength, '{PATH} must be of length 6'] },
  cutoff: { type: Number, required: true },
});

// Custom validation function to ensure the length of the coMarks array is 6
function arrayLength(val) {
  return val.length === 6;
}

const SubjectData = mongoose.model('SubjectData', subjectDataSchema);

module.exports = SubjectData;
