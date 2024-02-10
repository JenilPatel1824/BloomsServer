const express = require('express');
const multer = require('multer');
const exceljs = require('exceljs');
const stream = require('stream');
const router = express.Router();
const bcrypt = require('bcrypt'); // Add this line


const Mark = require('../models/mark'); // Import your Mark schema
const studentSchema = require('../models/studentSchema'); // Import your Student schema
const subjectData = require('../models/subjectDataSchema'); // Import your Mark schema
const { default: mongoose } = require('mongoose');

const Student= mongoose.model("student",studentSchema);


const storage = multer.memoryStorage();
const upload = multer({ storage });
const SALT_ROUND=10;

router.post('/addstudent', upload.single('file'), async (req, res) => {
  try {
    const uploadedFile = req.file;

    const workbook = new exceljs.Workbook();
    const buffer = req.file.buffer;
    const fileStream = new stream.PassThrough();
    fileStream.end(buffer);
    await workbook.xlsx.read(fileStream);

    const someFunction = async (rawPassword) => {
      const hashedPassword = await bcrypt.hash(rawPassword, SALT_ROUND);
      return hashedPassword;
    };

    const processRow = async (row) => {
      const username = row.getCell(1).value;
      const rawPassword = row.getCell(2).value.toString();
      const hashedPassword = await someFunction(rawPassword);

      const name = row.getCell(3).value;
      const department = row.getCell(4).value;
      const emailData = row.getCell(5).value;
      const emails = (emailData && typeof emailData === 'object') ? emailData.text.toString() : emailData.toString();
      const mobile_no = row.getCell(6).value;
      const Addmission_Year = row.getCell(7).value;

      let student = {
        username: username,
        password: hashedPassword,
        name: name,
        department: department,
        email: emails,
        mobile_no: mobile_no,
        Addmission_Year: Addmission_Year,
      };
      await Student.create(student);
    };

    await workbook.eachSheet(async (worksheet) => {
      await worksheet.eachRow({ includeEmpty: false }, async (row, rowNumber) => {
        if (rowNumber > 1) {
          await processRow(row);
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


router.put('/students/:username', async (req, res) => {
  const { username } = req.params;
  const { name, department, email, mobile_no, Admission_Year } = req.body;

  try {
    const updatedStudent = await Student.findOneAndUpdate(
      { username },
      { name, department, email, mobile_no, Admission_Year },
      { new: true }
    );

    res.json(updatedStudent);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.put('/update-student/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedMarkData = req.body;
    console.log(updatedMarkData);

    const updatedMark = await Student.findByIdAndUpdate(id, updatedMarkData, { new: true });

    if (updatedMark) {
      res.json({ message: 'Mark updated successfully', updatedMark });
    } else {
      res.status(404).json({ error: 'No matching record found for update' });
    }
  } catch (error) {
    console.error('Error updating mark:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});





module.exports = router;
