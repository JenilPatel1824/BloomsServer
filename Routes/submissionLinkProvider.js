const express = require('express');
const Submission = require('../models/sumissionSchema'); // Import your Submission schema

const router = express.Router();

router.post('/getsubmissionlink', async (req, res) => {
  try {
   
    const { semester, subject, name, co } = req.body;

    const coname = Object.keys(co)[0];
    const submissionLinkobj= await Submission.findOne({subject:subject,co:coname,id:name});

    if (!submissionLinkobj) {
        return res.status(400).json({ error: 'Student has not Submitted Anything Yet.' });
    }
    
    res.json({
      submissionLink:submissionLinkobj.submissionLink,
      flag:submissionLinkobj.flag,
    });
  } catch (error) {
    console.error('Error to retrive submission link', error);s
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
