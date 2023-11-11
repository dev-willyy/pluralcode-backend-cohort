const { User } = require('../models/userModel.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const RevokedToken = require('../models/revokedTokenModel.js');

async function registerController(req, res, next) {
  const { username, email, mobile, password, ...otherCredentials } = req.body;

  try {
    const existingUser = await User.findOne({
      $or: [{ username }, { email }, { mobile }],
    });

    if (existingUser) return res.status(403).json({ message: 'User already exists' });

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      email,
      mobile,
      ...otherCredentials,
      password: hashedPassword,
    });

    await newUser.save();
    return res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    console.error('Error registering user: ', err);
  }
}

async function loginController(req, res, next) {
  const { username } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: 'User not found' });

    const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.password);
    if (!isPasswordCorrect) return res.status(401).json({ message: 'Password incorrect' });

    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.SECRET_TOKEN);

    const { password, isAdmin, ...otherCredentials } = user._doc;
    res
      .cookie('access_token', token, {
        httpOnly: true,
      })
      .status(200)
      .json({
        details: otherCredentials,
        isAdmin,
      });
  } catch (err) {
    console.error('Error signing in user: ', err);
  }
}

async function isTokenRevoked(token) {
  const revokedToken = await RevokedToken.findOne({token});
  return !!revokedToken;
}

async function logoutController(req, res, next) {
  try {
    if (await isTokenRevoked(req.token))
      return res.status(401).json({
        message: 'Token has already been revoked',
      });

    await RevokedToken.create({ token: req.token });
    res.clearCookie('access_token');
    res.status(200).json({ message: 'Logout successful' });
  } catch (err) {
    console.error('Error logging out: ', err);
    res.status(500).json('Error logging out: ', err);
  }
}

module.exports = { registerController, loginController, logoutController };
