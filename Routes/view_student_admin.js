const express = require('express');
const multer = require('multer');
const exceljs = require('exceljs');
const stream = require('stream');
const router = express.Router();
const studentSchema = require('../models/studentSchema'); // Import your Student schema

const Mark = require('../models/mark'); // Import your Mark schema
const subjectData = require('../models/subjectDataSchema'); // Import your Mark schema
const { default: mongoose } = require('mongoose');
const Studentd= mongoose.model("student",studentSchema);
const assignedQuestionModel = require('../models/asiignedQuestionSchema');
const Student= require('../models/Student');



router.post('/viewstudent/:id', async (req, res) => {
  try {
    const studentUserName = req.params.id;
    const student= await Studentd.findOne({username:studentUserName});
    if(!student)
    {
        return res.json({message: "Unable to find student"});
    }


    return res.json({
        details:student,
      message: 'Student  Data Found.',
    });
  } catch (error) {
    console.error('Unable to Find Student at the moment', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
