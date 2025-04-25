const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const users = []; 

const generateToken = (user) => {
    return jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

exports.signup = async (req, res) => {
    const { email, password } = req.body;
    const existingUser = users.find(u => u.email === email);
    if (existingUser) return res.status(400).json({ error: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { email, password: hashedPassword };
    users.push(newUser);

    const token = generateToken(newUser);
    res.json({ token });
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email);
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    const token = generateToken(user);
    res.json({ token });
};
