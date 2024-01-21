const express = require('express');
const multer = require('multer');
const exceljs = require('exceljs');
const stream = require('stream');
const router = express.Router();
const professorSchema = require('../models/professorSchema'); // Import your Student schema

const Mark = require('../models/mark'); // Import your Mark schema
const subjectData = require('../models/subjectDataSchema'); // Import your Mark schema
const { default: mongoose } = require('mongoose');
const Professor= mongoose.model("professor",professorSchema);





router.post('/removeprofessor/:id', async (req, res) => {
  try {
    const professorUserName = req.params.id;
    const professor= await Professor.findOne({username:professorUserName});
    if(!professor)
    {
        return res.json({message: "Unable to find professor"});
    }
    console.log("delete called 1");
    await Professor.deleteOne({username:professorUserName});

    return res.json({
      message: 'Professor  Data Deleted Successfully.',
    });
  } catch (error) {
    console.error('Error removing professor from MongoDB:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});


router.post('/removeallprofessor', async (req, res) => {
    try { 

        const collections = await mongoose.connection.db.listCollections({ name: 'professors' }).toArray();

    if (!collections.length > 0) {
      return res.json({
        exists: false,
        message: 'Professor Collection Not exists.',
      });
    }
        await Professor.collection.drop();

        
      return res.json({
        message: 'All Professors  Data Deleted Successfully.',
      });
    } catch (error) {
      console.error('Error removing all professors from MongoDB:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  });

module.exports = router;
