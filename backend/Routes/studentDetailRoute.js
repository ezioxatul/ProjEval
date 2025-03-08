const express = require('express');
const router = express.Router(); 

const studentDetailController = require('../Controllers/studentController');

// route to add a student
router.post('/addStudent', studentDetailController.addStudentController);

// route to get all students
router.get('/getStudentDetails', studentDetailController.getStudentController);


module.exports = router; 