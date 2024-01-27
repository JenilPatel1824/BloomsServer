const express = require('express');
const multer = require('multer');
const exceljs = require('exceljs');
const stream = require('stream');
const router = express.Router();

const Mark = require('../models/mark'); // Import your Mark schema
const studentSchema = require('../models/studentSchema'); // Import your Student schema
const subjectData = require('../models/subjectDataSchema'); // Import your Mark schema
const { default: mongoose } = require('mongoose');
const bodyParser = require('body-parser');


const Student=require('../models/Student');

const storage = multer.memoryStorage();
const upload = multer({ storage });
router.use(bodyParser.json());


router.post('/mappingdataadmin', async (req, res) => {
    let mappings;

    try {

    const { selectedSemm,selectedDepartmentm}=req.body;
    console.log(selectedDepartmentm);
    console.log(selectedSemm);
    
         mappings =await Student.find({sem:selectedSemm,id:{ $regex: `^..${selectedDepartmentm}` }});

    
    console.log(mappings);
    if(mappings.length==0)
    {
        return res.json("No students to display");
    }

    res.json(mappings);
  } catch (error) {
    console.error('Error fetching  students :', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
