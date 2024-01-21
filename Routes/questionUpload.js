const express = require('express');
const multer = require('multer');
const exceljs = require('exceljs');
const stream = require('stream');
const router = express.Router();
const questionModel = require('../models/practiceQuestionsSchema');
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/uploadquestionendpoint', upload.single('file'), async (req, res) => {
  try {
    const uploadedFile = req.file;
    let {
        department,
        subject,
        sem,
        co,
      } = req.body;    // const sem = req.body.sem;
    // const subject = req.body.subject;

    const workbook = new exceljs.Workbook();
    const buffer = req.file.buffer;
    const fileStream = new stream.PassThrough();
    fileStream.end(buffer);
    await workbook.xlsx.read(fileStream);

    const questionData = [];

    workbook.eachSheet((worksheet) => {
      worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
        if (rowNumber > 1) {
          const question = row.getCell(1).value;
          const qobj={
            question: question,
            semester:sem,
            subject:subject,
            co:co,
          }
          questionData.push(qobj);
        }
      });
    });

for (const q of questionData) {
    questionModel.create(q);
    
  }
  

    res.json({
      message: 'questions data uploaded successfully',
      content: questionData,
    });
  } catch (error) {
    console.error('Error uploading file to MongoDB:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
