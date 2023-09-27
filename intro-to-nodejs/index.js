const express = require('express');
const app = express();
const dotenv = require('dotenv'); //import dotenv library
const { authRouter } = require('./auth.js');
const { coursesRouter } = require('./courses.js');

app.use(express.json());
dotenv.config(); // configure dotenv library

app.use('/api/courses', authRouter); // wherever the router is used, It will make reference to '/api/courses'
app.use('/api/courses', coursesRouter);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Express server is running on port ${port}`);
});
