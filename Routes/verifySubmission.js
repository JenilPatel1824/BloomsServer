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
    const { action,remark, coItem,sem,subject,id } = req.body;
    const co = Object.keys(coItem)[0];
    let flag;
    const subm=await Submission.findOne({subject:subject,co:co,id:id});
    let secondtime=false;
    let uremark=remark;

    async function sendEmail() {

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'jenil.kajavadara1@gmail.com',
          pass: 'ffqv fonr ojes tcom',
        },
      });
       const studentdata=await StudentModel.findOne({username:id});
       const remail=studentdata.email;


      const mailOptions = {
        from: 'jenil.kajavadara1@gmail.com',
        to: remail,
        subject: 'About Submission',
        text: 'Your Submission for Subject '+subject+" is "+action +"ed you can check more details by login into portal",
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
    if(subm.flag=="-1")
    {
        if(action=="reject")
        {
            secondtime=true;
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
          



  if (!submissionobj) {
    // Handle the case where no document is found
    console.error("Submission details not found error");
    res.status(404).json({ error: "Submission details not found error" });
    return;
  }
  

  res.json(submissionobj);
});

module.exports = router;
