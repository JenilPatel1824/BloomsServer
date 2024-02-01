const express = require('express');
const router = express.Router();
const studentSchema = require('../models/studentSchema'); // Import your Student schema
const Submission = require("../models/sumissionSchema");
const Mark = require('../models/mark'); // Import your Mark schema
const subjectData = require('../models/subjectDataSchema'); // Import your Mark schema
const { default: mongoose } = require('mongoose');
const Studentx= mongoose.model("student",studentSchema);
const assignedQuestionModel = require('../models/asiignedQuestionSchema');
const Student= require('../models/Student');
const Studentflag=require('../models/studentFalgSchema');
const DepartmentModel=require('../models/depsemsubject');
const questionModel = require('../models/practiceQuestionsSchema');
const professorSchema = require('../models/professorSchema'); // Import your Student schema
const Professor= mongoose.model("professor",professorSchema);




router.post('/reset', async (req, res) => {
  try {

    await subjectData.collection.drop();
    await questionModel.collection.drop();
    await DepartmentModel.collection.drop();
    await Studentx.collection.drop();
    await Student.collection.drop();
    await assignedQuestionModel.collection.drop();
    await Mark.collection.drop();
    await Studentflag.collection.drop();
    await Submission.collection.drop();
    await Professor.collection.drop();

    return res.json({
      message: 'Whole  Data Deleted Successfully.',
    });
  } catch (error) {
    console.error('Error removing Whole data from MongoDB:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});


router.post('/removeallstudent', async (req, res) => {
    try { 

     
        await Studentx.collection.drop();
        await Student.collection.drop();
        await assignedQuestionModel.collection.drop();
        await Mark.collection.drop();
        await Studentflag.collection.drop();
        await Submission.collection.drop();


        
      return res.json({
        message: 'All Student  Data Deleted Successfully.',
      });
    } catch (error) {
      console.error('Error removing all students from MongoDB:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  });

module.exports = router;
