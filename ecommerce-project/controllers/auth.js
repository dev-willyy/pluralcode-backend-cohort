const Joi = require('joi');
const { User } = require('../models/userModel');

async function registerController(req, res, next) {
  const { username, email } = req.body;

  try {
    const newUser = new User({});
    const { value, error } = newUser.joiValidate();

    if (!error) return;
  } catch (err) {
    console.error(err);
  }
}

function loginController(req, res, next) {}

module.exports = { registerController, loginController };
