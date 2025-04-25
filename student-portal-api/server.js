const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Middleware to log requests
app.use((req, res, next) => {
  console.log(`${req.method} request to ${req.url}`);
  next();
});

// Sample student data (In-memory database)
let students = [
  { id: 1, name: 'Alice', age: 20 },
  { id: 2, name: 'Bob', age: 22 },
];

// Route to GET all students
app.get('/students', (req, res) => {
  res.status(200).json(students);
});

// Route to GET student by ID
app.get('/students/:id', (req, res) => {
  const student = students.find((s) => s.id === parseInt(req.params.id));
  if (!student) {
    return res.status(404).send('Student not found');
  }
  res.status(200).json(student);
});

// Route to POST a new student
app.post('/students', (req, res) => {
  const { name, age } = req.body;
  const newStudent = {
    id: students.length + 1,
    name,
    age,
  };
  students.push(newStudent);
  res.status(201).json(newStudent);
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
