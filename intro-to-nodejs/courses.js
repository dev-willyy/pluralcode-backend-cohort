const express = require('express');

const router = express.Router();

router.get(
  '/',
  (req, res, next) => {
    res.write('The bridge has been crossed. ');
    next(); // allows the next function to be called as well
  },
  (req, res) => {
    res.write('Courses are currently unavailable');
    res.send();
  }
);

module.exports = { coursesRouter: router }; // export router as coursesRouter
