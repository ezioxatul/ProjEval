const express = require('express');
const router = express.Router(); 
const valuatorController = require('../Controllers/valuatorController'); 

// Route to create a new valuator
router.post('/createValuator', valuatorController.createValuatorController);


// Route to get details of a valuator
router.get('/getValuatorDetails', valuatorController.getValuatorController);

module.exports = router; 