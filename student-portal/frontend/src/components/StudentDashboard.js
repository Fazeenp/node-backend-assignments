// frontend/src/components/StudentDashboard.js
import React, { useEffect, useState } from 'react';
import { Typography, Box, Button, Grid, Card, CardContent } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const StudentDashboard = () => {
  const [studentData, setStudentData] = useState(null);
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  // Fetch student data and enrolled courses
  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/student', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setStudentData(response.data);
      } catch (error) {
        console.error('Error fetching student data', error);
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

    fetchStudentData();
    fetchCourses();
  }, []);

  const handleEnroll = async (courseId) => {
    try {
      // Enroll in a course (you can add more functionality here as needed)
      console.log(`Enrolled in course: ${courseId}`);
      // Navigate to a different page after enrolling
      navigate('/student/dashboard');
    } catch (error) {
      console.error('Error enrolling in course', error);
    }
  };

  if (!studentData) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>Welcome, {studentData.name}</Typography>

      <Typography variant="h6" gutterBottom>Your Enrolled Courses:</Typography>
      <Grid container spacing={2}>
        {courses.map((course) => (
          <Grid item xs={12} md={4} key={course._id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{course.name}</Typography>
                <Typography>{course.description}</Typography>
                <Button 
                  variant="contained" 
                  color="primary" 
                  onClick={() => handleEnroll(course._id)} 
                  sx={{ marginTop: 2 }}>
                  Enroll
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default StudentDashboard;
