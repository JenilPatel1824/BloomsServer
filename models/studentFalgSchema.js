const mongoose = require('mongoose');

const studentFlagSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  semester: {
    type: String,
    required: true,
  },
  co: {
    type: Number,
    required: true,
  },
  flag: {
    type: Boolean,
    required: true,
  },
});

const Studentflag = mongoose.model('Studentflagcheck', studentFlagSchema);

module.exports = Studentflag;
