const Tutor = require('../models/tutor.model');
const Student = require('../models/student.model');
const jwt = require('jsonwebtoken');

const createUser = async (req, res) => {
  try {
    const { type, inputs } = req.body;

    let userSchema = '';
    userSchema = type === 'student' ? Student : Tutor;

    const user = await new userSchema(inputs);
    await user.save();

    const token = await jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 15 * 24 * 60 * 60,
        userId: user._id,
        type: `${type}`,
        userData: { email: user.email, name: user.name },
      },
      'secret key',
    );
    const userInfo = { token, userData: user };
    res.status(201).json(userInfo);
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
};

module.exports = { createUser };
