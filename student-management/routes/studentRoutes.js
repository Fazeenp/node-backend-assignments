const express = require('express');
const router = express.Router();
const Student = require('../models/student');

// CREATE
router.post('/students', async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).send(student);
  } catch (err) {
    res.status(400).send(err);
  }
});

// READ ALL
router.get('/students', async (req, res) => {
  const students = await Student.find();
  res.send(students);
});

// READ ONE
router.get('/students/:id', async (req, res) => {
  const student = await Student.findById(req.params.id);
  if (!student) return res.status(404).send({ error: "Not found" });
  res.send(student);
});

// UPDATE
router.put('/students/:id', async (req, res) => {
  const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(student);
});

// DELETE
router.delete('/students/:id', async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.send({ message: "Deleted" });
});

module.exports = router;
