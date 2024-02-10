const express = require('express');
const multer = require('multer');
const exceljs = require('exceljs');
const stream = require('stream');
const router = express.Router();

const Mark = require('../models/mark'); // Import your Mark schema
const Student = require('../models/Student'); // Import your Student schema
const subjectData = require('../models/subjectDataSchema'); // Import your Mark schema
const professorSchema=require('../models/professorSchema');
const { default: mongoose } = require('mongoose');

const Professor=mongoose.model('professor',professorSchema);
const Failstudent=require('../models/failstudentSchema');
const Submission = require("../models/sumissionSchema");



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
    let fcount=[0,0,0,0,0,0];


    const sdata={
      department:department,
        sem:sem,
        subject:subject,
        coMarks:coMarks,
        cutoff:cutoff,
    }
    let coMark=coMarks;
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

   for (let i = 0; i < coMark.length; i++) {
    coMark[i] = (coMark[i] * cutoff) / 100;
}
for (const mark of marksData.slice(2)) {

  console.log(mark.rollNo);
  console.log(mark.co1);

  
    let stdmark=[mark.co1,mark.co2,mark.co3,mark.co4,mark.co5,mark.co6];
    for(let i=0;i<6;i++)
    {
        if(stdmark[i]<coMark[i])
        {   
          console.log(mark.rollNo);
          console.log(stdmark);
            console.log(stdmark[i]+" "+coMark[i] );
            let x=i+1;
            console.log("Count plus for  "+mark.rollNo+" CO "+x);
             fcount[i]=fcount[i]+1;
        }
        
    }


    const student = students.find((s) => s.roll === mark.rollNo);
  
    if (student) {
      mark.studentId = student._id;
      await Mark.create(mark);
    }
  }


  for (let i = 0; i < 6; i++) {
    let x=i+1;
        let fobj={
          Department:department,
          Semester:sem,
          Subject:subject,
          Skill:"CO"+x,
          UnsuccessfulStudents:fcount[i],
        }
        const fstd=await Failstudent.findOne({Department:department,Semester:sem,Subject:subject, Skill:"CO"+x});
        if(fstd)
        {
          fstd.UnsuccessfulStudents+=fcount[i];
          await fstd.save();
        }
        else{
        await Failstudent.create(fobj);
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


// routes/reports.js


router.post('/getreports', async (req, res) => {
  try {
    const { username } = req.body;
    console.log("get reports api");

    

    const p=await Professor.findOne({username:username});
    let department;
    if(p)
    {
          department=p.department;
    }


    const data=await Failstudent.find({department:department});
    console.log("sending: "+data);

    res.json({
      message: 'Data sent Successfully',
      data: data,
    });

  } 
  catch (error) {
    console.error('Error uploading file to MongoDB:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/getadminreports', async (req, res) => {
  try {
    console.log("get admin reports api");


    

    const data=await Failstudent.find();
    console.log("sending: "+data);

    res.json({
      message: 'Data sent Successfully',
      data: data,
    });

  } 
  catch (error) {
    console.error('Error uploading file to MongoDB:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});







router.get('/marks-data', async (req, res) => {
  try {
    // Fetch marks data from MongoDB
    const marksData = await Mark.find();
    res.json({ content: marksData });
  } catch (error) {
    console.error('Error fetching marks data from MongoDB:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.delete('/delete-marks', async (req, res) => {
  try {
    const { idsToDelete } = req.body;

    // Validate if idsToDelete is an array of valid ObjectIDs
    if (!idsToDelete || !Array.isArray(idsToDelete) || idsToDelete.some(id => !mongoose.isValidObjectId(id))) {
      return res.status(400).json({ error: 'Invalid input for deletion.' });
    }

    // Perform the deletion based on IDs
    const deleteResult = await Mark.deleteMany({ _id: { $in: idsToDelete } });

    if (deleteResult.deletedCount > 0) {
      res.json({ message: 'Marks deleted successfully' });
    } else {
      res.status(404).json({ error: 'No matching records found for deletion.' });
    }
  } catch (error) {
    console.error('Error deleting marks:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/delete-mark/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Validate if id is a valid ObjectID
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ error: 'Invalid input for deletion.' });
    }

    // Perform the deletion based on ID
    const deleteResult = await Mark.deleteOne({ _id: id });

    if (deleteResult.deletedCount > 0) {
      res.json({ message: 'Mark deleted successfully' });
    } else {
      res.status(404).json({ error: 'No matching record found for deletion.' });
    }
  } catch (error) {
    console.error('Error deleting mark:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/update-mark/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedMarkData = req.body;

    const updatedMark = await Mark.findByIdAndUpdate(id, updatedMarkData, { new: true });

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
