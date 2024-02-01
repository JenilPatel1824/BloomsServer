const express = require("express");
const router = express.Router();

const studentSchema = require("../models/studentSchema");
const mongoose = require("mongoose");

const StudentModel = mongoose.model("Student", studentSchema);


const Mark = require("../models/mark");
const Student = require("../models/Student");
const subjectData = require("../models/subjectDataSchema");
const Submission = require("../models/sumissionSchema");
const questionModel = require("../models/practiceQuestionsSchema");
const assignedQuestionModel = require("../models/asiignedQuestionSchema");

const nodemailer = require('nodemailer');


router.post("/verifysubmission", async (req, res) => {
    const { action,remark, coItem,sem,subject,id,username } = req.body;
    const co = Object.keys(coItem)[0];
    let flag;
    const subm=await Submission.findOne({subject:subject,co:co,id:id});
    let secondtime=false;
    let uremark=remark;

    async function sendEmail() {

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.ADMIN_GMAIL,
          pass: process.env.ADMIN_PASS,
        },
      });
       const studentdata=await StudentModel.findOne({username:id});
       const remail=studentdata.email;


      const mailOptions = {
        from: process.env.ADMIN_EMAIL,
        to: remail,
        subject: 'About Submission',
        text: 'Your Submission for Subject '+subject+" is "+action +"ed by "+username +" you can check more details by login into portal",
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

    }

    if(remark==""){
        uremark="NA";
    }

    if(subm){
    if(subm.flag=="-1")
    {
        if(action=="reject")
        {
            secondtime=true;
        }
    }
  }
    if(action=="accept")
    {
        flag="0";
        sendEmail();
    }
    
    
    else if(action=="reject")
    {
        
        flag="-1";
        sendEmail();
    }

    if(secondtime)
    {
        flag="2";
    }

   

    const submissionobj = await Submission.findOneAndUpdate(
        { subject: subject, co: co, id: id },
        { $set: { flag: flag, remark: uremark } },
        { new: true }
      );

      if(flag=="0")
      {
        const std=await Student.findOne({id:id});
        let uidd;
        if(std)
        {
          uidd=std._id;

        }
        console.log("data for delete asgn q: "+uidd+" "+subject+" "+co);
        await assignedQuestionModel.deleteOne({studentId:uidd,subject:subject,CO:co});
      }
          



  if (!submissionobj) {
    // Handle the case where no document is found
    console.error("Submission details not found error");
    res.status(404).json({ error: "Submission details not found error" });
    return;
  }
  

  res.json(submissionobj);
});

module.exports = router;
