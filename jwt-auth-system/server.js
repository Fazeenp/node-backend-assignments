const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');

dotenv.config();
const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes);

// Example protected route
const { authenticateToken } = require('./middlewares/authMiddleware');
app.get('/api/protected', authenticateToken, (req, res) => {
    res.json({ message: `Hello, ${req.user.email}. You accessed a protected route.` });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
