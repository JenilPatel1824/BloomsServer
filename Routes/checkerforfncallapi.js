
const express = require('express');
const questionModel = require('../models/practiceQuestionsSchema');
const assignedQuestionModel = require('../models/asiignedQuestionSchema');
const Student = require('../models/Student');
const Studentflag = require('../models/studentFalgSchema');



const router = express.Router();


router.post('/checkerforfunctioncall', async (req, res) => {
    try {
      const { subject, semester, studentId, requiredco } = req.body;
  
      for (let x = 0; x < 6; x++) {
        if (requiredco[x]) {
          const co = x + 1;
  
          const existingFlag = await Studentflag.findOne({
            subject,
            semester,
            co,
            studentId,
          });
          console.log("Existing flag: "+existingFlag);
  
          if (existingFlag && existingFlag.flag) {
            // Flag is true, do something (return or take necessary action)
            return res.json(false);
          } else {
            // If the flag doesn't exist or is false, create/update entry with flag set to true
            await Studentflag.findOneAndUpdate(
              {
                subject:subject,
                semester:semester,
                co:co,
                studentId:studentId,
              },
              { flag: true },
              { upsert: true }
            );
           return res.json(true);
          }
        }
      }
  
    } catch (error) {
      console.error('Error handling practice question request:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  module.exports = router;

  