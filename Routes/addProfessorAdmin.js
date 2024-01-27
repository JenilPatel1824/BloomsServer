const express = require('express');
const multer = require('multer');
const exceljs = require('exceljs');
const stream = require('stream');
const router = express.Router();
const bcrypt = require('bcrypt');

const Mark = require('../models/mark'); // Import your Mark schema
const professorSchema = require('../models/professorSchema'); // Import your Professor schema
const subjectData = require('../models/subjectDataSchema'); // Import your Mark schema
const { default: mongoose } = require('mongoose');

const Professor = mongoose.model("professor", professorSchema);

const storage = multer.memoryStorage();
const upload = multer({ storage });
const SALT_ROUND=10;

router.post('/addprofessor', upload.single('file'), async (req, res) => {
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

    workbook.eachSheet(async (worksheet) => {
      worksheet.eachRow({ includeEmpty: false }, async (row, rowNumber) => {
        if (rowNumber > 1) {
          const name = row.getCell(1).value;
          const rawPassword = row.getCell(2).value.toString(); // Assuming the password is in the second column
          const hashedPassword = await someFunction(rawPassword);

          const username = row.getCell(3).value;
          const department = row.getCell(4).value;
          const emailData = row.getCell(5).value;
          const emails = (emailData && typeof emailData === 'object') ? emailData.text.toString() : emailData.toString();
          const mobile_no = row.getCell(6).value;

          let professor = {
            name: name,
            password: hashedPassword,
            username: username,
            department: department,
            email: emails,
            mobile_no: mobile_no,
          };

          await Professor.create(professor);
        }
      });
    });

    res.json({
      message: 'Professor Data Uploaded Successfully.',
    });
  } catch (error) {
    console.error('Error uploading file to MongoDB:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
