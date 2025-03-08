const express = require('express');
const router = express.Router(); 

const resultController = require('../Controllers/resultController');


// Route to get results of a valuator
router.get('/getResults/:valuatorId', resultController.getResultsController);

// Route to get details of a result
router.post('/evaluateAnswerSheet', resultController.evaluateAnswerSheet);


module.exports = router; 