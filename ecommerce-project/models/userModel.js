const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
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
});

const User = mongoose.model('user', userSchema);

function commonDefinition() {
  return Joi.string().min(3).max(30).required();
}
const commonProperties = {
  username: commonDefinition().alphanum(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9!-_]{3,20}$')).required(),
};

function validateUser(user) {
  const schema = joi.object({
    firstName: commonDefinition(),
    lastName: commonDefinition(),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    }),
    mobile: commonDefinition(),
    confirmPassword: Joi.any
      .valid(Joi.ref('password'))
      .required()
      .options({ any: { allowOnly: 'must match password' } }),
    ...commonProperties,
  });

  return schema.validate(user);
}

module.exports = { User, validateUser };
