const express = require('express');
const multer = require('multer');
const exceljs = require('exceljs');
const stream = require('stream');
const router = express.Router();
const studentSchema = require('../models/studentSchema'); // Import your Student schema

const Mark = require('../models/mark'); // Import your Mark schema
const subjectData = require('../models/subjectDataSchema'); // Import your Mark schema
const { default: mongoose } = require('mongoose');
const Studentx= mongoose.model("student",studentSchema);
const assignedQuestionModel = require('../models/asiignedQuestionSchema');

const Student= require('../models/Student');


const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/removestudent/:id', async (req, res) => {
  try {
    const studentUserName = req.params.id;
    const student= await Studentx.findOne({username:studentUserName});
    if(!student)
    {
        return res.json({message: "Unable to find student"});
    }
    console.log("delete called 1");
    await Studentx.deleteOne({username:studentUserName});


    let stdid=student._id;
    const std=await Student.findOne({id:studentUserName});
    if(!std)
    {
        return res.json({message: "Student entry not found in student mappint data(1 deleted)"});
    }
    await Student.deleteOne({id:studentUserName});

    const stdasg=await assignedQuestionModel.find({studentId:stdid});
    if(!stdasg.length>0)
    {
        return res.json({message: "Student entry not found in  data(2 delete performed)"});

    }
    await Student.deleteMany({studentId:stdid});

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

        const collections = await mongoose.connection.db.listCollections({ name: 'students' }).toArray();

    if (!collections.length > 0) {
      return res.json({
        exists: false,
        message: 'Student Collection Not exists.',
      });
    }
        await Studentx.collection.drop();

        
      return res.json({
        message: 'All Student  Data Deleted Successfully.',
      });
    } catch (error) {
      console.error('Error removing all students from MongoDB:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  });

module.exports = router;
