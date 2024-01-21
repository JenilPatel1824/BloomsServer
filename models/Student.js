const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
    required: true,
  },
  roll: {
    type: String,
    required: true,
  },
  sem: {
    type: Number,
    required: true,
  },
  // Add more fields as needed
});

const Student = mongoose.model('Studentxy', studentSchema);

module.exports = Student;


// {
//     "id": "21ITUOS088",
//     "sem": 6,
//     "roll": "IT047"
//   }