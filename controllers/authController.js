const { userSchema } = require('../models/userModel');

const registerController = (req, res, next) => {
  const { value, error } = userSchema.validate(req.body);
  const { username } = value;

  // use the destructured form of error.details[0].message
  try {
    if (!error) {
      return res.status(201).json({
        message: `${username} registered succesfully`,
      });
    } else {
      res.status(401).json({
        message: error.details[0].message,
      });
      const customError = new Error(error.details[0].message);
      throw customError;
    }
  } catch (err) {
    console.error(err);
  }
};

module.exports = { registerController };
