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


const Student= mongoose.model("student",studentSchema);


const storage = multer.memoryStorage();
const upload = multer({ storage });
router.use(bodyParser.json());


router.post('/studentdataadmin', async (req, res) => {
  try {

    const { selectedDepartment}=req.body;
    console.log(selectedDepartment);
    const students =await Student.find({department:selectedDepartment});
    console.log(students);
    if(students.length==0)
    {
        return res.json("No students to display");
    }

    res.json(students);
  } catch (error) {
    console.error('Error fetching  students :', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
