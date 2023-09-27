const fs = require('fs');
const jwt = require('jsonwebtoken');
const path = require('path');

const usersDatabase = path.join(__dirname, '..', 'database', 'users.json');
const users = JSON.parse(fs.readFileSync(usersDatabase));

const getUsersController = (req, res, next) => {
  try {
    if (users) {
      const trimmedUsers = users.map((user) => {
        const { password, confirmPassword, ...otherCredentials } = user;
        return { ...otherCredentials };
      });

      res.status(200).json(trimmedUsers);
    } else {
      res.status(404).json({ message: 'Users not found' });
      const customError = new Error('Users not found');
      throw customError;
    }
  } catch (err) {
    console.error(err);
  }
};

const getSingleUserController = (req, res, next) => {
  /**
   * check if (client desiring to get single user data has a token)
   * if (token exists), verify the token
   * if (token is verified), send user data based on id passed in params
   * restrict user such that only data that matches id is sent (if isloggedIn)
   */

  const token = req.header('Authorization').split(' ')[1];
  const { id } = req.params;

  if (!token) {
    return res.status(401).json({ message: 'Not authorized. No token submitted' });
  }

  try {
    const payload = jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (!err) return decoded;
      console.error('Error: ', err);
      return res.status(403).json({ message: 'Access denied. Token is invalid' });
    });

    const { username } = payload;

    if (payload) {
      const specificUser = users.find((user, index) => user.username === username && index === Number(id));
      const { password, confirmPassword, ...otherCredentials } = specificUser;

      if (specificUser) {
        res.status(200).json({ ...otherCredentials });
      } else {
        res.status(404).json({ message: 'User cannot be found' });
        const customError = new Error('User cannot be found');
        throw customError;
      }
    }
  } catch (err) {
    console.error(err);
  }
};

module.exports = { getUsersController, getSingleUserController };
