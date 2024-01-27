// routes.js (or your existing route file)
const express = require('express');
const mongoose = require('mongoose');
const DepartmentModel = require('../models/depsemsubject');

const router = express.Router();

router.get('/api/get-details', async (req, res) => {
  try {
    const departments = await DepartmentModel.find({}, { department: 1, semesters: 1, _id: 0 });

    const formattedDepartments = departments.reduce((acc, curr) => {
      const { department, semesters } = curr;
      const formattedSemesters = semesters.reduce((semAcc, semCurr) => {
        semAcc[semCurr.semesterNumber] = Object.values(semCurr.subjects);
        return semAcc;
      }, {});
      acc[department] = formattedSemesters;
      return acc;
    }, {});

    res.json({ departments: formattedDepartments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
