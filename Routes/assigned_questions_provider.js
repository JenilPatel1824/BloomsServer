
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
    let did;
    if(student)
    {
       did=student._id;
    }
    //console.log("This is did   "+did);

    let questionsobjs= await assignedQuestionModel.find({studentId:did});
    console.log("qobjs::::: ");
    console.log(questionsobjs);
    let output=[];
    for(let questionobj of questionsobjs)
    {
      console.log("selected objjjj"+questionobj);
        let qids=questionobj.questions;
        
        let sub=questionobj.subject;
        let co=questionobj.CO;
        let q1textarray=[];
        for(let qid of qids)
        {
            let q1=await questionModel.findOne({_id:qid});
            let q1text=q1.question;
            console.log("quesion of :"+sub+" "+q1text);
            q1textarray.push(q1text);
        }
        let oa={
            subject:sub,
            CO:co,
            questions:q1textarray,
        }
        console.log("pushingggg: ");
        console.log(oa);

        output.push(oa);
        subject="";
        co="";
        q1textarray=[];
        
    }
    console.log("printtt");
    console.log(output);
    console.log(output);
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

