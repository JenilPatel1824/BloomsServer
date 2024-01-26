const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
  department: {
    type: String,
    required: true,
  },
  semesters: {
    type: [{
      semesterNumber: {
        type: Number,
        required: true,
      },
      subjects: {
        type: [String],
        default: [],
      },
    }],
    default: Array.from({ length: 8 }, (_, i) => ({
      semesterNumber: i + 1,
      subjects: [],
    })),
  },
});

const DepartmentModel = mongoose.model('Department', departmentSchema);

module.exports = DepartmentModel;
