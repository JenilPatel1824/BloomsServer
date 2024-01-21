const express = require('express');
const Submission = require('../models/sumissionSchema'); // Import your Submission schema

const router = express.Router();

router.post('/uploadsubmission', async (req, res) => {
  try {
    const uploadedFile = req.file;

    const { luname, subject, selectedCO, driveLink } = req.body;

    let checker = await Submission.findOne({ id: luname, subject: subject, co: selectedCO });
    let flag;
    let remark;
    let show=true;
    if (checker) {
        flag=checker.flag;
        if(flag=="-1")
        {
            show=false;
        }
        remark=checker.remark;
        if(checker.flag=="1"){
        return res.status(400).json({message:"Submission already exists for the selected subject and CO wait for approval." ,flag:flag,remark:remark,show:show});
        }
        if(checker.flag=="0"){
            return res.status(400).json({message:"Your Submission is already accepted" ,flag:flag,remark:remark,show:show});
            }
            if(checker.flag=="2"){
                return res.status(400).json({message:"You are advised to meet Professor" ,flag:flag,remark:remark,show:show});
                }

        if(checker.flag=="-1")
        {
            const submissionobj = await Submission.findOneAndUpdate(
                { subject: subject, co: selectedCO, id: luname },
                { $set: { flag: "-1", remark: "NA" ,submissionLink:driveLink} },
                { new: true }
              );
              return res.status(400).json({message:"Submitted Successfully 2nd time" ,flag:flag,remark:remark,show:show});

        }
    }

    const sdata = {
      id: luname,
      subject: subject,
      co: selectedCO,
      submissionLink: driveLink,
      flag: "1",
      remark:"NA",
    };
     
    await Submission.create(sdata);
    

    // Send success response to the client
    res.json({
      message: 'Link Uploaded',
      flag:"1",
      remark:remark,
      show:show,
      
    });
  } catch (error) {
    console.error('Error uploading Link to MongoDB:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
