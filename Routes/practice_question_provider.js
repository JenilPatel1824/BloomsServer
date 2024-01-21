
const express = require('express');
const questionModel = require('../models/practiceQuestionsSchema');
const assignedQuestionModel = require('../models/asiignedQuestionSchema');
const subjectData = require('../models/subjectDataSchema'); // Import your Mark schema
const Student = require('../models/Student');
const Mark = require('../models/mark'); // Import your Mark schema


const router = express.Router();

router.post('/fetchpracticequestion', async (req, res) => {
  try {
    
    let practiceQuestions;
    const {subject, semester, studentId, rollNo,requiredco}= req.body;
    if (subject === undefined) {
        console.error('Subject is undefined');
        res.status(400).json({ error: 'Subject is undefined' });
        return;
      }
    console.log("called target for "+subject);

    
    const subdetails = await subjectData.findOne({ sem: semester, subject: subject });
     console.log(subject);
     console.log(subdetails);

if (!subdetails) {
  // Handle the case where no document is found
  console.error('Subject details not found');
  res.status(404).json({ error: 'Subject details not found' });
  return;
}

const cutoff = subdetails.cutoff;
console.log(cutoff);
// The rest of your code continues...

    const coMark=subdetails.coMarks;
    console.log("cutoff before: " + coMark);

    for (let i = 0; i < coMark.length; i++) {
        coMark[i] = (coMark[i] * cutoff) / 100;
    }
    
    console.log("cutoff after: " + coMark);
    

    const student=await Student.findOne({_id : studentId });
    const egovid=student.id;
    console.log(student);

    const reqobj=await Mark.find({studentId:studentId,subject:subject});
    console.log(reqobj);
    let stdmark=[reqobj[0].co1,reqobj[0].co2,reqobj[0].co3,reqobj[0].co4,reqobj[0].co5,reqobj[0].co6];
    for(let i=0;i<6;i++)
    {
        if(stdmark[i]<coMark[i])
        {   
            console.log("Loop called for "+stdmark[i]+" cutofff"+coMark);
            let x=i+1;
             let s="CO"+x;
            practiceQuestions = await getPracticeQuestions(subject, semester.toString(),s,studentId);
            
        }
    }


    res.json({ practiceQuestions });
  } catch (error) {
    console.error('Error handling practice question request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

async function getPracticeQuestions(subject, semester, co,studentId) {

    let numberOfQuestions=5;
    try {
       
        // Use the Mongoose model to query the database for random questions

        const isquestion = await questionModel.find({subject:subject, semester:semester, co:co});
        if(isquestion.length==0)
        {
            console.log("no Questions");
            let x="Some Questions Might Not Available at the Moment Please Try again after some time.";
            return x;
        }
        const questions = await questionModel.aggregate([
          { $match: { semester, subject, co } },
          { $sample: { size: numberOfQuestions } },
        ]);
        console.log("Checking condition");

       const questionTexts = questions.map(question => question.question);
       //console.log(questionTexts);

        assignRandomQuestions(studentId,subject,questions,co);
     }
    
      catch (error) {
        console.error('Error fetching random questions:', error);
        throw error; // You can handle the error according to your application's needs
      }
};
const assignRandomQuestions = async (studentId, subject, questions,co) => {
    try {
      // Map the questions to get their _id values
      const questionIds = questions.map(question => question._id);
     // console.log(questionIds);

      const existingDocument = await assignedQuestionModel.findOne({ studentId:studentId, subject:subject, CO:co });
      //console.log(existingDocument);
      if (existingDocument) {
        console.log("this is existing: "+existingDocument);
        return existingDocument;
    }
  
      // Create or update the assignedquestion document
      const result = await assignedQuestionModel.create({
        questions: questionIds, // Assuming questionIds is an array of question IDs
        subject: subject,
        CO: co,
        studentId: studentId,
      });

      console.log("this is not exist: "+result);
      return result;
    } catch (error) {
      console.error('Error assigning questions to student:', error);
      throw error; // You can handle the error according to your application's needs
    }
  };

// Export the router for use in other files
module.exports = router;
