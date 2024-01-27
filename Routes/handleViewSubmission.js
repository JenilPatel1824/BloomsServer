const express = require("express");
const router = express.Router();

const Mark = require("../models/mark");
const Student = require("../models/Student");
const subjectData = require("../models/subjectDataSchema");
const Submission = require("../models/sumissionSchema");
const questionModel = require("../models/practiceQuestionsSchema");
const assignedQuestionModel = require("../models/asiignedQuestionSchema");

router.post("/geteverythingaboutstudent", async (req, res) => {

  console.log("req is in server getevst");
    const { sem, subjectName,selectedDepartment } = req.body;
console.log("sem: "+sem," subject: "+subjectName +"department: "+selectedDepartment);
  const subdetails = await subjectData.findOne({
    department:selectedDepartment,
    sem: sem,
    subject: subjectName,
  });

  if (!subdetails) {
    // Handle the case where no document is found
    console.error("Subject details not found");
    res.status(404).json({ error: "Subject details not found" });
    return;
  }
  const output=[];

  const cutoff = subdetails.cutoff;

  const coMark = subdetails.coMarks;

  for (let i = 0; i < coMark.length; i++) {
    coMark[i] = (coMark[i] * cutoff) / 100;
  }

  const markobjs = await Mark.find({ semester: sem, subject: subjectName,department:selectedDepartment });
  for(let markobj of markobjs)
  {
    let flag=false;
    let studentforid=await Student.findOne({_id:markobj.studentId});
    let egovid=studentforid.id;
    let coa=[];
    let stdmark=[markobj.co1,markobj.co2,markobj.co3,markobj.co4,markobj.co5,markobj.co6];
    for(let i=0;i<6;i++)
    {   
        if(stdmark[i]<coMark[i])
        {  
             flag=true;
            let x=i+1;
             let s="CO"+x;
             
             
             let aques= await assignedQuestionModel.findOne({studentId:markobj.studentId,subject:subjectName,CO:s});
             if (!aques) {
                console.error("Student's ques not found: ");
                continue; 
              }
             console.log(aques);
            let qids=[];
            qids=aques.questions;
            q1textarray=[];
            
            for(let qid of qids)
            {
                let q1=await questionModel.findOne({_id:qid});
                let q1text=q1.question;
                q1textarray.push(q1text);
            }
            let coo={
                [s]:stdmark[i],
                questions:q1textarray,
             }  
             coa.push(coo);       
        }
        
    }
    let objj={
        CoArray:coa,
        ID: egovid,
        flag:flag,
    }
    output.push(objj);
    
  }

  res.json(output);
});

module.exports = router;
