const express = require('express');
const router = express.Router(); 

const classDetailController = require('../Controllers/classController');

// route to add a class
router.post('/createClass', classDetailController.createClassController);


// route to get all classes
router.get('/getClassDetails', classDetailController.getClassController);


module.exports = router; 