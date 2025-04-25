import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddCourse = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleAddCourse = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'http://localhost:5000/api/courses',
        { name, description },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      navigate('/admin/dashboard');
    } catch (error) {
      console.error('Error adding course', error);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, margin: '0 auto', padding: 2 }}>
      <Typography variant="h4" gutterBottom>Add New Course</Typography>
      <form onSubmit={handleAddCourse}>
        <TextField
          fullWidth
          label="Course Name"
          variant="outlined"
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          fullWidth
          label="Course Description"
          variant="outlined"
          margin="normal"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button type="submit" variant="contained" fullWidth sx={{ marginTop: 2 }}>
          Add Course
        </Button>
      </form>
    </Box>
  );
};

export default AddCourse;
