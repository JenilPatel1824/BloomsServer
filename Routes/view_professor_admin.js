const express = require('express');
const multer = require('multer');
const exceljs = require('exceljs');
const stream = require('stream');
const router = express.Router();
const professorSchema = require('../models/professorSchema'); // Import your Student schema

const Mark = require('../models/mark'); // Import your Mark schema
const subjectData = require('../models/subjectDataSchema'); // Import your Mark schema
const { default: mongoose } = require('mongoose');
const Professor= mongoose.model("professor",professorSchema);
const assignedQuestionModel = require('../models/asiignedQuestionSchema');



router.post('/viewprofessor/:id', async (req, res) => {
  try {
    const professorUserName = req.params.id;
    const professor= await Professor.findOne({username:professorUserName});
    if(!professor)
    {
        return res.json({message: "Unable to find Professor"});
    }


    return res.json({
        details:professor,
      message: 'Professor  Data Found.',
    });
  } catch (error) {
    console.error('Unable to Find Professor at the moment', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
