const { userSchema, loginSchema } = require('../models/userModel');
/**
 * 1. require fs and path (which are in-built in Nodejs), bcrypt (installed seperately)
 * 2. require jwt for user token
 */
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cryptoValue = require('crypto').randomBytes(64).toString('hex');

// define the path to the users.json file
const usersDatabase = path.join('__dirname', '..', 'database', 'users.json');
const secretKey = process.env.SECRET_KEY;

const registerController = (req, res, next) => {
  const { value, error } = userSchema.validate(req.body);
  const { username, email, password, confirmPassword, ...otherCredentials } = value;

  try {
    if (!error) {
      // get the users that currently exists in the usersDatabase
      const users = JSON.parse(fs.readFileSync(usersDatabase));
      const isCurrentUser = users.find((user) => username === user.username || email === user.email);

      if (isCurrentUser) return res.status(400).json({ message: `User already exists` });

      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);

      const newUser = {
        username,
        email,
        password: hashedPassword,
        confirmPassword: hashedPassword,
        ...otherCredentials,
      };
      users.push(newUser);

      fs.writeFileSync(usersDatabase, JSON.stringify(users, null, 2));

      return res.status(201).json({
        message: `${username} registered succesfully`,
      });
    } else {
      const { details } = error;
      const { message } = details[0];

      res.status(401).json({
        message,
      });
      const customError = new Error(message);
      throw customError;
    }
  } catch (err) {
    console.error(err);
  }
};

const loginController = (req, res, next) => {
  const { value, error } = loginSchema.validate(req.body);
  const { username, password } = value;

  try {
    if (!error) {
      const users = JSON.parse(fs.readFileSync(usersDatabase));
      // Find user by username
      const user = users.find((user) => username === user.username);

      if (!user) {
        res.status(404).json({ message: 'User not found' });
        throw new Error('User not found');
      }

      // compare incoming password from req.body with user's existing hashedPassword
      bcrypt
        .compare(password, user.password)
        .then((result) => {
          if (!result) return res.status(401).json({ message: 'Authentication failed' });
        })
        .catch((err) => {
          console.error('Error: ', err);
        });

      const token = jwt.sign({ username: user.username }, secretKey, {
        expiresIn: '72h',
      });

      return res.status(200).json({ message: 'Login successful', token });
    } else {
      const { details } = error;
      const { message } = details[0];

      res.status(404).json({ message });
      const customError = new Error(message);
      throw customError;
    }
  } catch (err) {
    console.error(err);
  }
};

module.exports = { registerController, loginController };
