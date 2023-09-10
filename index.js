const express = require('express');
const app = express();
require('dotenv').config({ path: './config/.env' });
const { authRouter } = require('./routes/auth.js');

app.use(express.json());
app.use('/api/auth', authRouter);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Express server is running on port ${port}`);
});
