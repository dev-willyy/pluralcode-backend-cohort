const express = require('express');
const app = express();
require('dotenv').config({ path: './config/.env' });
const { authRouter } = require('./routes/auth.js');
const { usersRouter } = require('./routes/users.js');

app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);

const { PORT: port } = process.env;
app.listen(port, () => {
  console.log(`Express server is running on port ${port}`);
});
