const express = require('express');
const { isAuthenticated } = require('./auth');

const protectedRouter = express.Router();

protectedRouter.get('/', isAuthenticated, (req, res) => {
    res.json({ message: 'hello world' });
});

module.exports = { protectedRouter };