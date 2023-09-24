const Joi = require('joi');

function commonDefinition() {
  return Joi.string().min(3).max(30).required();
}

const commonProperties = {
  username: commonDefinition().alphanum(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9!-_]{3,20}$')).required(),
};

const userSchema = Joi.object({
  firstName: commonDefinition(),
  lastName: commonDefinition(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'net'] },
  }),
  confirmPassword: Joi.ref('password'),
  ...commonProperties,
});

const loginSchema = Joi.object(commonProperties);

module.exports = { userSchema, loginSchema };
