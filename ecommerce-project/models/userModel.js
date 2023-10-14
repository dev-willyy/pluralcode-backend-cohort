const mongoose = require('mongoose');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  mobile: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model('user', userSchema);

function commonDefinition() {
  return Joi.string().min(3).max(30).required();
}
const commonProperties = {
  username: commonDefinition().pattern(new RegExp('^[a-zA-Z0-9!-_]{3,14}$')),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9!-_]{3,20}$')).required(),
};

function validateUserReg(user) {
  const registerSchema = Joi.object({
    firstName: commonDefinition(),
    lastName: commonDefinition(),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    }),
    mobile: commonDefinition(),
    confirmPassword: Joi.string().required().valid(Joi.ref('password')),
    ...commonProperties,
  });

  return registerSchema.validate(user);
}

function validateUserLogin(user) {
  const loginSchema = Joi.object(commonProperties);

  return loginSchema.validate(user);
}

module.exports = { User, validateUserReg, validateUserLogin };
