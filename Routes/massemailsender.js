const express = require('express');
const multer = require('multer');
const exceljs = require('exceljs');
const stream = require('stream');
const router = express.Router();
const studentSchema = require('../models/studentSchema'); // Import your Student schema
const Mark = require('../models/mark'); // Import your Mark schema
const subjectData = require('../models/subjectDataSchema'); // Import your Mark schema
const { default: mongoose } = require('mongoose');
const Studentd= mongoose.model("student",studentSchema);
const assignedQuestionModel = require('../models/asiignedQuestionSchema');
const Student= require('../models/Student');
const professorSchema=require('../models/professorSchema');
const Professor= mongoose.model('professor',professorSchema);
const nodemailer=require('nodemailer');
const bodyParser = require('body-parser');


router.use(bodyParser.json());


router.post('/massemailsender', async (req, res) => {
  try {
    console.log("massmailsndercalled");
    console.log(req.body); // Log the entire request body to check if it contains the expected data

    const {emailBody,recipients} = req.body;
    console.log(recipients);
    console.log(emailBody);
    if(recipients=="Student"){
        console.log("in student");
    const allstudents = await Studentd.find();
    if (!allstudents || allstudents.length === 0) {
      return res.json({ message: "No students found" });
    }

    const recipientsemail = allstudents.map(student => student.email).join(', ');


    const mailOptions = {
        from: 'jenil.kajavadara1@gmail.com',
        to: recipientsemail,
        subject: 'About Submission',
        text: emailBody || 'Default email body', // Use the provided emailBody or a default value
      };

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'jenil.kajavadara1@gmail.com',
          pass: 'ffqv fonr ojes tcom',
        },
      });

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
          return res.status(500).json({ message: 'Error sending email' });
        } else {
          console.log('Email sent successful to:', recipients);
          return res.json({ message: 'Email sent successfully to students' });
        }
      });
    }

    if(recipients=="Faculty"){

        const allfaculty = await Professor.find();
        if (!allfaculty || allfaculty.length === 0) {
          return res.json({ message: "No professor found" });
        }
    
        const recipientsemail = allfaculty.map(faculty => faculty.email).join(', ');
    
    
        const mailOptions = {
            from: 'jenil.kajavadara1@gmail.com',
            to: recipientsemail,
            subject: 'Anouncement',
            text: emailBody || 'Default email body',
          };
    
          const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'jenil.kajavadara1@gmail.com',
              pass: 'ffqv fonr ojes tcom',
            },
          });
    
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.error('Error sending email:', error);
              return res.status(500).json({ message: 'Error sending email' });
            } else {
              console.log('Email sent successful to:', recipients);
              return res.json({ message: 'Email sent successfully to faculty members' });
            }
          });
        }


        if(recipients=="Both"){

            if(1)
            {
            console.log("in both");
        const allfaculty = await Professor.find();
        if (!allfaculty || allfaculty.length === 0) {
          return res.json({ message: "No professor found" });
        }
    
        const recipientsemail = allfaculty.map(faculty => faculty.email).join(', ');
    
    
        const mailOptions = {
            from: 'jenil.kajavadara1@gmail.com',
            to: recipientsemail,
            subject: 'Anouncement',
            text: emailBody || 'Default email body',
          };
    
          const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'jenil.kajavadara1@gmail.com',
              pass: 'ffqv fonr ojes tcom',
            },
          });
    
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.error('Error sending email:', error);
              return res.status(500).json({ message: 'Error sending email' });
            } else {
              console.log('Email sent successful to:', recipients);
              return res.json({ message: 'Email sent successfully to faculty members' });
            }
          });
        }}

        if(1)
        {
            console.log("in student");
            const allstudents = await Studentd.find();
            if (!allstudents || allstudents.length === 0) {
              return res.json({ message: "No students found" });
            }
        
            const recipientsemail = allstudents.map(student => student.email).join(', ');
        
        
            const mailOptions = {
                from: 'jenil.kajavadara1@gmail.com',
                to: recipientsemail,
                subject: 'About Submission',
                text: emailBody || 'Default email body', // Use the provided emailBody or a default value
              };
        
              const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  user: 'jenil.kajavadara1@gmail.com',
                  pass: 'ffqv fonr ojes tcom',
                },
              });
        
              transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                  console.error('Error sending email:', error);
                  return res.status(500).json({ message: 'Error sending email' });
                } else {
                  console.log('Email sent successful to:', recipients);
                  return res.json({ message: 'Email sent successfully to students' });
                }
              });

        }



  } catch (error) {
    console.error('Unable to Find professor at the moment', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
  
});

module.exports = router;
