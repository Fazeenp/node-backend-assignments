// frontend/src/components/AdminDashboard.js
import React, { useEffect, useState } from 'react';
import { Typography, Box, Button, Grid, Card, CardContent } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  // Fetch students and courses data
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/student', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setStudents(response.data);
      } catch (error) {
        console.error('Error fetching students', error);
      }
    };

    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/courses');
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses', error);
      }
    };

    fetchStudents();
    fetchCourses();
  }, []);

  const handleAddCourse = () => {
    // Functionality to add a new course (You can redirect to another page to add a course)
    console.log('Add new course');
    navigate('/admin/add-course');
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>Admin Dashboard</Typography>

      <Typography variant="h6" gutterBottom>All Students:</Typography>
      <Grid container spacing={2}>
        {students.map((student) => (
          <Grid item xs={12} md={4} key={student._id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{student.name}</Typography>
                <Typography>{student.email}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h6" gutterBottom>Manage Courses:</Typography>
      <Button variant="contained" color="primary" onClick={handleAddCourse}>
        Add New Course
      </Button>

      <Grid container spacing={2} sx={{ marginTop: 2 }}>
        {courses.map((course) => (
          <Grid item xs={12} md={4} key={course._id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{course.name}</Typography>
                <Typography>{course.description}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AdminDashboard;
