const express = require('express');
const crypto = require('crypto');

const USERNAME = "admin";
const PASSWORD = "cats123";

let sessionSecret = null;
let sessionExpires = null;

function generateSessionSecret() {
    sessionSecret = crypto.randomBytes(24).toString('hex');
    sessionExpires = Date.now() + 10 * 60 * 1000;
}

generateSessionSecret();
setInterval(generateSessionSecret, 10 * 60 * 1000);

const loginRouter = express.Router();

loginRouter.post('/', (req, res) => {
    const { username, password } = req.body;
    if (username === USERNAME && password === PASSWORD) {
        if (Date.now() > sessionExpires) {
            generateSessionSecret();
        }
        return res.json({ session: sessionSecret });
    }
    res.status(401).json({ error: 'Invalid credentials' });
});

function isAuthenticated(req, res, next) {
    const session = req.headers['x-session'];
    if (!session || session !== sessionSecret || Date.now() > sessionExpires) {
        return res.status(401).json({ error: 'Not authenticated' });
    }
    next();
}

module.exports = { loginRouter, isAuthenticated };