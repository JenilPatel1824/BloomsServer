
const express = require('express');
const questionModel = require('../models/practiceQuestionsSchema');
const assignedQuestionModel = require('../models/asiignedQuestionSchema');
const Student = require('../models/Student');
const Mark = require('../models/mark'); 
//const { csonParser } = require('config/parser');

const router = express.Router();


router.post('/fetchassignedquestions', async (req, res) => {
  try {
    const luname = req.body;
    //console.log(luname.luname);
    let student=await Student.findOne({id:luname.luname});

    let did=student._id;
    //console.log("This is did   "+did);

    let questions= await assignedQuestionModel.find({studentId:did});
    let output=[];
    for(let question of questions)
    {
        let qids=question.questions;
        
        let sub=question.subject;
        let co=question.CO;
        q1textarray=[];
        for(let qid of qids)
        {
            let q1=await questionModel.findOne({_id:qid});
            let q1text=q1.question;
            q1textarray.push(q1text);
        }
        let oa={
            subject:sub,
            CO:co,
            questions:q1textarray,
        }
        console.log(oa);

        output.push(oa);
        if(oa.CO="CO5")
        {
          console.log("cos is here with: "+oa.questions);
        }
        
    }
    console.log("printtt");
    console.log(output[0].subject);
    console.log(output[0].questions.length);
    // let q1=questions[0].questions[0];
    // console.log(q1);
    // console.log(output[0]);


    
    res.json( output );
  } catch (error) {
    console.error('Error handling practice question request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;

