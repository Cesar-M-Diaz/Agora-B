const Tutor = require('../models/tutor.model');
const Student = require('../models/student.model');
const jwt = require('jsonwebtoken');

const createUser = async (req, res) => {
  try {
    const { type, inputs } = req.body;

    let userSchema = '';

    if (type === 'student') {
      userSchema = Student;
    } else {
      userSchema = Tutor;
    }

    const user = new userSchema(inputs);
    await user.save();

    const token = await jwt.sign(
      { userId: user._id, type: `${type}`, userData: user },
      'secret key',
    );
    res.status(201).json({ token });
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
};

module.exports = { createUser };
