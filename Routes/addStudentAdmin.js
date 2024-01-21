const express = require('express');
const multer = require('multer');
const exceljs = require('exceljs');
const stream = require('stream');
const router = express.Router();

const Mark = require('../models/mark'); // Import your Mark schema
const studentSchema = require('../models/studentSchema'); // Import your Student schema
const subjectData = require('../models/subjectDataSchema'); // Import your Mark schema
const { default: mongoose } = require('mongoose');

const Student= mongoose.model("student",studentSchema);


const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/addstudent', upload.single('file'), async (req, res) => {
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
          const username = row.getCell(1).value;
          const password = row.getCell(2).value;
          const name = row.getCell(3).value;
          const department = row.getCell(4).value;
          const email = row.getCell(5).value.toString();
          const mobile_no = row.getCell(6).value;
          const Addmission_Year = row.getCell(7).value;
          const emailData = row.getCell(5).value;
          const emails = (emailData && typeof emailData === 'object') ? emailData.text.toString() : emailData.toString();
          
          let student= {
            username: username,
            password: password,
            name: name,
            department: department,
            email: emails,
            mobile_no: mobile_no,
            Addmission_Year: Addmission_Year,
          };
         Student.create(student);

        }
      });
    });

  

    res.json({
      message: 'Student Data Uploaded Successfully.',
    });
  } catch (error) {
    console.error('Error uploading file to MongoDB:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
