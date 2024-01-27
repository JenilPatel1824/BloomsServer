const express = require('express');
const multer = require('multer');
const exceljs = require('exceljs');
const stream = require('stream');
const router = express.Router();

const Mark = require('../models/mark'); // Import your Mark schema
const Student = require('../models/Student'); // Import your Student schema
const subjectData = require('../models/subjectDataSchema'); // Import your Mark schema


const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/upload-endpoint', upload.single('file'), async (req, res) => {
  try {
    const uploadedFile = req.file;
    let {
        department,
        year,
        subject,
        sem,
        coMarks,
        cutoff,
      } = req.body;    // const sem = req.body.sem;
    // const subject = req.body.subject;
    
    coMarks= JSON.parse(coMarks);
    coMarks = Object.values(coMarks);
    coMarks = coMarks.map(Number);


    const sdata={
      department:department,
        sem:sem,
        subject:subject,
        coMarks:coMarks,
        cutoff:cutoff,
    }
    subjectData.create(sdata);

    console.log(subject);

    const workbook = new exceljs.Workbook();
    const buffer = req.file.buffer;
    const fileStream = new stream.PassThrough();
    fileStream.end(buffer);
    await workbook.xlsx.read(fileStream);

    const marksData = [];

    workbook.eachSheet((worksheet) => {
      worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
        if (rowNumber > 1) {
          const rollNo = row.getCell(1).value;
          const co1 = row.getCell(2).value;
          const co2 = row.getCell(3).value;
          const co3 = row.getCell(4).value;
          const co4 = row.getCell(5).value;
          const co5 = row.getCell(6).value;
          const co6 = row.getCell(7).value;

          marksData.push({
            department:department,
            rollNo: rollNo,
            semester: sem,
            subject: subject,
            co1: co1,
            co2: co2,
            co3: co3,
            co4: co4,
            co5: co5,
            co6: co6,
          });
        }
      });
    });
    let stid;
    let students=[];
    // Assuming student details are already in the database
    const std=await Student.find({sem:sem});
    for(st of std)
    {
      let id=st.id.toString();
      let depname=id[2]+id[3];
      if (depname==department)
      {
        students.push(st);
      }


    }
    //const students = await Student.find({ sem: sem });
    

    // Insert marks data into MongoDB
   // Insert marks data into MongoDB
for (const mark of marksData) {


    const student = students.find((s) => s.roll === mark.rollNo);
  
    if (student) {
      mark.studentId = student._id;
      await Mark.create(mark);
    }
  }
  

    res.json({
      message: 'Marks data uploaded successfully',
      content: marksData,
    });
  } catch (error) {
    console.error('Error uploading file to MongoDB:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
