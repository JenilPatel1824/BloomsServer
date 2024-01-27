const express = require('express');
const multer = require('multer');
const exceljs = require('exceljs');
const stream = require('stream');
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


const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/removestudent/:id', async (req, res) => {
  try {
    const studentUserName = req.params.id;
    console.log("remove called for "+studentUserName);

    await Submission.deleteMany({id:studentUserName});

    const student= await Student.findOne({id:studentUserName});
    let stdid;
    if(student)
    {
       stdid=student._id;
    }
    console.log("id is for deleteL: "+stdid);
    await Mark.deleteMany({studentId:stdid});

   await Studentflag.deleteMany({studentId:studentUserName});

   await assignedQuestionModel.deleteMany({studentId:stdid});

   await Studentx.deleteOne({username:studentUserName});

   await Student.deleteOne({id:studentUserName});

    return res.json({
      message: 'Student  Data Deleted Successfully.',
    });
  } catch (error) {
    console.error('Error removing student from MongoDB:', error);
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
