const express = require('express');
const multer = require('multer');
const exceljs = require('exceljs');
const stream = require('stream');
const router = express.Router();

const Mark = require('../models/mark'); // Import your Mark schema
const subjectData = require('../models/subjectDataSchema'); // Import your Mark schema
const { default: mongoose } = require('mongoose');

const Student= require('../models/Student');


const storage = multer.memoryStorage();
const upload = multer({ storage });


router.post('/addmapping', upload.single('file'), async (req, res) => {
  try {
    const uploadedFile = req.file;
       // const sem = req.body.sem;
    // const subject = req.body.subject;
    


    const workbook = new exceljs.Workbook();
    const buffer = req.file.buffer;
    const fileStream = new stream.PassThrough();
    fileStream.end(buffer);
    await workbook.xlsx.read(fileStream);


    workbook.eachSheet((worksheet) => {
      worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
        if (rowNumber > 1) {
          const id = row.getCell(1).value;
          const sem = row.getCell(2).value;
          const roll = row.getCell(3).value;
          
          let student= {
            id: id,
            sem: sem,
            roll: roll,
          };
         Student.create(student);

        }
      });
    });

  

    res.json({
      message: 'Student Mapping Data Uploaded Successfully.',
    });
  } catch (error) {
    console.error('Error uploading file to MongoDB:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
