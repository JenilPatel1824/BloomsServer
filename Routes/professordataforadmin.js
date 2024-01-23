const express = require('express');
const multer = require('multer');
const exceljs = require('exceljs');
const stream = require('stream');
const router = express.Router();

const Mark = require('../models/mark'); // Import your Mark schema
const studentSchema = require('../models/studentSchema'); // Import your Student schema
const professorSchema=require('../models/professorSchema');
const subjectData = require('../models/subjectDataSchema'); // Import your Mark schema
const { default: mongoose } = require('mongoose');
const bodyParser = require('body-parser');
const Professor=mongoose.model('professor',professorSchema);



const Student= mongoose.model("student",studentSchema);


const storage = multer.memoryStorage();
const upload = multer({ storage });
router.use(bodyParser.json());


router.post('/professordataadmin', async (req, res) => {
  try {

    const { selectedDepartmentp}=req.body;
    console.log(selectedDepartmentp);
    const professors =await Professor.find({department:selectedDepartmentp});
    console.log(professors);
    if(professors.length==0)
    {
        return res.json("No Professors to display");
    }

    res.json(professors);
  } catch (error) {
    console.error('Error Fetching Professors', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
