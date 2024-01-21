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



router.post('/viewdsem/:id', async (req, res) => {
  try {
    const dsem = req.params.id;
    const collectionName = 'studentxies';

    const collections = await mongoose.connection.db.listCollections({ name: collectionName }).toArray();

    if (collections.length > 0) {
      const collection = mongoose.connection.db.collection(collectionName);

      const count = await collection.countDocuments();

      console.log(`Number of students in the collection: ${count}`);
      return res.json({number: count,message:"Got Successfully"});

    } else {
        return res.json({message: "Unable to find stundents table"});
    }
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});


router.post('/removealldsem', async (req, res) => {
    try { 

        const collections = await mongoose.connection.db.listCollections({ name: 'studentxies' }).toArray();

    if (!collections.length > 0) {
      return res.json({
        exists: false,
        message: 'Student mapping (studentxies) Collection Not exists.',
      });
    }
        await Student.collection.drop();

        
      return res.json({
        message: 'All Student Sem roll mapping Data Deleted Successfully.',
      });
    } catch (error) {
      console.error('Error removing all students mapping with roll from MongoDB:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  });



module.exports = router;
