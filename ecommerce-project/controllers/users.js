const { User } = require('../models/userModel.js');

async function getSingleUserController(req, res, next) {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    const { _id, password, __v, ...otherCredentials } = user._doc;
    return res.status(200).json({ ...otherCredentials });
  } catch (err) {
    console.error('Error getting user: ', err);
  }
}

async function deleteSingleUserController(req, res, next) {
  const { id } = req.params;

  try {
    await User.findByIdAndDelete(id);
    return res.status(200).json({ message: 'User has been deleted successfully' });
  } catch (err) {
    console.error('Error deleting user: ', err);
  }
}

async function updateSingleUserController(req, res, next) {
  const { ...updatedCredentials } = req.body;
  const { id } = req.params;

  try {
    const user = await User.findByIdAndUpdate(id, { ...updatedCredentials }, { new: true });
    return res.status(200).json(user._doc);
  } catch (err) {
    console.error('Error updating user: ', err);
  }
}

async function getAllUsersController(req, res, next) {
  try {
    const users = await User.find({});
    return res.status(200).json(users);
  } catch (err) {
    console.error('Error getting all users: ', err);
  }
}

module.exports = {
  getSingleUserController,
  deleteSingleUserController,
  updateSingleUserController,
  getAllUsersController,
};
