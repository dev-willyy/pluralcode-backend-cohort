const Joi = require('joi');

function commonDefinition() {
  return Joi.string().min(3).max(30).required();
}

const userSchema = Joi.object({
  firstName: commonDefinition(),
  lastName: commonDefinition(),
  username: commonDefinition().alphanum(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'net'] },
  }),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9!-_]{3,20}$')).required(),
  confirmPassword: Joi.ref('password'),
});

module.exports = { userSchema };
