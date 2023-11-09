const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config({ path: './config/.env' });
const { connectDB, isDBDisconnected } = require('./database/connectDB.js');
const { authRouter } = require('./routes/auth.js');
const { usersRouter } = require('./routes/users.js');
const { productsRouter } = require('./routes/products.js');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());
app.use((req, res, next) => {
  if (req.body.productKind) {
    req.body.productKind = req.body.productKind.toLowerCase();
  }
  next();
});

connectDB();
isDBDisconnected();

app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/products', productsRouter);

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
