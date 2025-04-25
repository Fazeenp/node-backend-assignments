// backend/controllers/courseController.js
const Course = require('../models/Course');

// Get all courses
const getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    console.error('Error fetching courses:', err);
    res.status(500).send('Server error');
  }
};
const addCourse = async (req, res) => {
  try {
    const { name, description } = req.body;
    const newCourse = new Course({ name, description });
    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (err) {
    console.error('Error adding course:', err);
    res.status(500).send('Server error');
  }
};
module.exports = { getCourses, addCourse };