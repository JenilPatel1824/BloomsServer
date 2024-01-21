// markUpload.js

const express = require('express');
const multer = require('multer');
const router = express.Router();
const mongoose = require('mongoose');
const subjectData = require('../models/subjectDataSchema'); // Import your Mark schema
const subjectDataArray = [];



// Other imports and configurations...

// Middleware for handling file uploads

const upload = multer({ dest: 'uploads/' });

// Fetch cutoff data
router.post('/fetchcutoff', async (req, res) => {
  try {

    const subjects=req.body;
    const subjectsLength = subjects.length;
    for(let subject of subjects)
    {
        const data=await subjectData.findOne({subject:subject});
        subjectDataArray.push(data);
    }



    return res
        .json(subjectDataArray);
  } catch (error) {
    return res.status(401).json({ error: "fetch sub data failed Failed" })
  }
});

// Your existing code for handling file upload...

module.exports = router;
