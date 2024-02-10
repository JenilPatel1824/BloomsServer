// routes/departmentRoutes.js

const express = require('express');
const router = express.Router();
const DepartmentModel = require('../models/depsemsubject'); // Import your Mongoose model
const professorSchema = require('../models/professorSchema'); // Import your Professor schema
const { default: mongoose } = require('mongoose');
const Professor = mongoose.model("professor", professorSchema);
const Failstudent =require('../models/failstudentSchema');



// Route to add a new department
router.post('/add-department', async (req, res) => {
  try {
    const { department, semesters } = req.body;

    // Validate request data as needed

    // Create a new department instance
    const newDepartment = new DepartmentModel({
      department,
      semesters,
    });

    // Save the department to the database
    await newDepartment.save();

    res.status(201).json({ message: 'Department added successfully' });
  } catch (error) {
    console.error('Error adding department:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/departments', async (req, res) => {
    try {
      // Fetch all departments from the database
      const departments = await DepartmentModel.find().distinct('department');
      res.status(200).json(departments);
    } catch (error) {
      console.error('Error fetching departments:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  router.delete('/remove-department/:department', async (req, res) => {
    try {
      const { department } = req.params;
      await DepartmentModel.deleteMany({ department });
      await Professor.deleteMany({department:department});
      await Failstudent.deleteMany({Department:department});



      res.status(200).json({ message: 'Department removed successfully' });
    } catch (error) {
      console.error('Error removing department:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  router.get('/departments/:department', async (req, res) => {
    try {
      const { department } = req.params;
      const departmentDetails = await DepartmentModel.findOne({ department });
      res.status(200).json(departmentDetails);
    } catch (error) {
      console.error('Error fetching department details:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

module.exports = router;
