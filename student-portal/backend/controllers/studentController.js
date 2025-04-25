// backend/controllers/studentController.js
const Student = require('../models/Student');  // Assuming you have a Student model

// Function to get all students
const getStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);  // Respond with the list of students
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

// Function to create a new student
const createStudent = async (req, res) => {
  const { name, email } = req.body;
  try {
    const newStudent = new Student({ name, email });
    await newStudent.save();
    res.status(201).json(newStudent);  // Respond with the created student
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

module.exports = { getStudents, createStudent };  // Export the functions
