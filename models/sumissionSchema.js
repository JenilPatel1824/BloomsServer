const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true
  },
  co: {
    type: String,
    required: true
  },
  id: {
    type: String,
    
    required: true
  },
  submissionLink: {
    type: String,
    required: true
  },
  flag: {
    type: String,
    required: true
  },
  remark: {
    type: String,
    required: true
  },
});

const Submission = mongoose.model('Submission', submissionSchema);

module.exports = Submission;

//flag 1: submitted by student
//flag 0: accepted
//flag -1: rejected