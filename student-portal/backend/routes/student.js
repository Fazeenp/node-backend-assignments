
const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');  // Import the controller

router.get('/', studentController.getStudents);  // Correct function handler
router.post('/', studentController.createStudent);  // Correct function handler

module.exports = router;  // Export the router
