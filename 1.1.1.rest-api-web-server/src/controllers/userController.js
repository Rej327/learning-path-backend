const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const users = require('../models/userModel');

const SECRET = process.env.JWT_SECRET || 'secret123';

exports.register = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ message: 'Missing fields' });

    if (users.find(u => u.username === username)) {
        return res.status(409).json({ message: 'User already exists' }); // conflict
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = { id: users.length + 1, username, password: hashed };
    users.push(user);

    return res.status(201).json({ message: 'User registered' }); // created
};

exports.login = async (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, username: user.username }, SECRET, { expiresIn: '1h' });
    return res.json({ token });
};

exports.profile = (req, res) => {
    return res.json({ user: req.user }); // user payload from token
};
