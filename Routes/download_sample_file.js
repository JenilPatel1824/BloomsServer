// Import necessary modules
const express = require('express');
const path = require('path'); // Import the path module

// Create a new router
const router = express.Router();

// Serve the sample Excel file from the 'public' folder
router.use('/downloadsamplefile', express.static(path.join(__dirname, './Public')));

// Endpoint to serve the sample Excel file
router.get('/downloadsamplefile/Upload_Mark_Sample.xlsx', (req, res) => {
    const filePath = path.join(__dirname, './Public', 'Upload_Mark_Sample.xlsx');
  
    res.sendFile(filePath);
  });
  router.get('/downloadsamplefile/Upload_Question_Sample.xlsx', (req, res) => {
    const filePath = path.join(__dirname, './Public', 'Upload_Question_Sample.xlsx');
    res.sendFile(filePath);
  });
  router.get('/downloadsamplefile/Upload_Student_Sample.xlsx', (req, res) => {
    const filePath = path.join(__dirname, './Public', 'Upload_Student_Sample.xlsx');
    res.sendFile(filePath);
  });
  router.get('/downloadsamplefile/Upload_Professor_Sample.xlsx', (req, res) => {
    const filePath = path.join(__dirname, './Public', 'Upload_Professor_Sample.xlsx');
    res.sendFile(filePath);
  });
  router.get('/downloadsamplefile/Upload_Mapping_Sample.xlsx', (req, res) => {
    const filePath = path.join(__dirname, './Public', 'Upload_Mapping_Sample.xlsx');
    res.sendFile(filePath);
  });

// Export the router
module.exports = router;
