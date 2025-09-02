const express = require('express');
const { loginRouter } = require('./auth');
const { protectedRouter } = require('./protected');

const app = express();
app.use(express.json());

app.use('/login', loginRouter);
app.use('/protected', protectedRouter);

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});