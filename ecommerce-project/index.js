const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config({ path: './config/.env' });
const { connectDB, isDBDisconnected } = require('./database/connectDB');
const { authRouter } = require('./routes/auth');
const app = express();

app.use(express.json());
app.use(cors());

connectDB();
isDBDisconnected();

app.use('/api/auth', authRouter);

const { PORT: port } = process.env;
app
  .listen(port)
  .on('listening', () => {
    console.log(`Express server is running on http://localhost:${port}`);
  })
  .on('error', (err) => {
    console.error(`Error connecting port ${port}`, err);
    process.exit(1);
  });
