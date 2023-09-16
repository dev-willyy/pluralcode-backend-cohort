const fs = require('fs');
const path = require('path');

const usersDatabase = path.join(__dirname, '..', 'database', 'users.json');

const getUsersController = (req, res, next) => {
  const users = JSON.parse(fs.readFileSync(usersDatabase));

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

module.exports = { getUsersController };
