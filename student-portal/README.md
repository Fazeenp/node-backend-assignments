# Student Portal API

This is a backend application for a **Student Portal** where admins can manage students, courses, and perform other administrative tasks. The backend is built using **Node.js**, **Express**, and connected to a **MongoDB** database.

## Table of Contents

- [Project Setup](#project-setup)
- [Usage](#usage)
- [API Documentation](#api-documentation)
  - [Authentication](#authentication)
  - [Student Endpoints](#student-endpoints)
  - [Course Endpoints](#course-endpoints)
- [Frontend Integration](#frontend-integration)

---

## Project Setup

### Prerequisites

Before setting up the project, make sure you have the following installed:

- **Node.js**: [Download Node.js](https://nodejs.org/en/)
- **MongoDB**: [Install MongoDB](https://www.mongodb.com/try/download/community) (or use MongoDB Atlas)

### Clone the Repository

Clone the repository to your local machine:

```bash
git clone https://github.com/Fazeenp/node-backend-assignments/edit/main/student-portal
cd student-portal
```

### Install Dependencies

Install the required dependencies:

```bash
npm install
```

### Setup Environment Variables

Create a `.env` file in the root of the project directory and add the following variables:

```bash
MONGO_URI=your_mongo_database_url
PORT=5000
JWT_SECRET=your_jwt_secret_key
```

Replace `your_mongo_database_url` with your MongoDB connection string and `your_jwt_secret_key` with a secret key for JWT authentication.

### Run the Application

Start the backend server:

```bash
npm start
```

The application will run on `http://localhost:5000`.

---

## Usage

- **Admin Dashboard**: The admin can view and manage students and courses through the `/admin/dashboard` route.
- **Add Course**: The admin can add new courses through the `/admin/add-course` page.

### Example Frontend Integration:

The frontend part (React) should send API requests to `http://localhost:5000/api` endpoints to interact with the backend.

---

## API Documentation

### Authentication

#### Login

- **Endpoint**: `POST /api/auth/login`
- **Description**: Logs in an admin user and returns a JWT token.
- **Request Body**:

```json
{
  "email": "admin@example.com",
  "password": "yourpassword"
}
```

- **Response**:

```json
{
  "token": "jwt_token_here"
}
```

- **Status Codes**:
  - `200 OK`: Successful login, returns a JWT token.
  - `400 Bad Request`: Invalid email or password.
  - `401 Unauthorized`: Authentication failed.

---

### Student Endpoints

#### Get All Students

- **Endpoint**: `GET /api/students`
- **Description**: Fetches all students.
- **Authorization**: Requires a valid JWT token in the `Authorization` header.

```bash
Authorization: Bearer <jwt_token>
```

- **Response**:

```json
[
  {
    "_id": "student_id",
    "name": "John Doe",
    "email": "john@example.com"
  },
  ...
]
```

- **Status Codes**:
  - `200 OK`: Successful retrieval of students.
  - `401 Unauthorized`: Missing or invalid JWT token.
  - `500 Internal Server Error`: Server error.

#### Get Single Student by ID

- **Endpoint**: `GET /api/students/:id`
- **Description**: Fetches a single student by their ID.
- **Response**:

```json
{
  "_id": "student_id",
  "name": "John Doe",
  "email": "john@example.com"
}
```

- **Status Codes**:
  - `200 OK`: Successfully fetched student details.
  - `404 Not Found`: Student not found.
  - `500 Internal Server Error`: Server error.

---

### Course Endpoints

#### Get All Courses

- **Endpoint**: `GET /api/courses`
- **Description**: Fetches all courses.
- **Response**:

```json
[
  {
    "_id": "course_id",
    "name": "Mathematics 101",
    "description": "Basic mathematics course"
  },
  ...
]
```

- **Status Codes**:
  - `200 OK`: Successful retrieval of courses.
  - `500 Internal Server Error`: Server error.

#### Add a New Course

- **Endpoint**: `POST /api/courses`
- **Description**: Adds a new course. Only accessible by admins.
- **Request Body**:

```json
{
  "name": "Mathematics 102",
  "description": "Advanced mathematics course"
}
```

- **Response**:

```json
{
  "message": "Course added successfully",
  "course": {
    "_id": "new_course_id",
    "name": "Mathematics 102",
    "description": "Advanced mathematics course"
  }
}
```

- **Status Codes**:
  - `201 Created`: Course added successfully.
  - `400 Bad Request`: Invalid data sent in the request body.
  - `401 Unauthorized`: Missing or invalid JWT token.
  - `500 Internal Server Error`: Server error.

#### Get Single Course by ID

- **Endpoint**: `GET /api/courses/:id`
- **Description**: Fetches a single course by its ID.
- **Response**:

```json
{
  "_id": "course_id",
  "name": "Mathematics 102",
  "description": "Advanced mathematics course"
}
```

- **Status Codes**:
  - `200 OK`: Successfully fetched course details.
  - `404 Not Found`: Course not found.
  - `500 Internal Server Error`: Server error.

---

## Frontend Integration

You can integrate the backend with a frontend React application for managing students and courses. The frontend will interact with the API by making HTTP requests to the backend routes.

Example of a GET request to fetch students:

```javascript
import axios from 'axios';

const fetchStudents = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/students', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    console.log(response.data);
  } catch (error) {
    console.error('Error fetching students:', error);
  }
};
```

You can also use the `POST` method to add new students or courses from the frontend by making HTTP requests to the relevant endpoints.

---

## Conclusion

This backend API provides basic functionality for managing students and courses. It supports JWT authentication, with an **admin-only** route for adding new courses. You can integrate this API with a frontend application, where admins can interact with the portal, and students can be managed.

Feel free to extend this API with more features such as **updating student/course information**, **deleting courses**, and **advanced student management**.

---
