const Tutor = require('../models/tutor.model');
const Student = require('../models/student.model');
const jwt = require('jsonwebtoken');

const createUser = async (req, res) => {
  try {
    const { type, inputs } = req.body;

    if (type === 'student') {
      new Student(inputs)
        .save()
        .then((student) => {
          const token = jwt.sign(
            { userId: student._id, type: 'student', userData: student },
            'secret key',
          );
          res.status(201).json({ token });
        })
        .catch((err) => {
          console.log(err);
          res.status(404).json({ error: 'not found' });
        });
    } else if (type === 'tutor') {
      new Tutor(inputs)
        .save()
        .then((tutor) => {
          const token = jwt.sign(
            { userId: tutor._id, type: 'student', userData: tutor },
            'secret key',
          );
          res.status(201).json({ token });
        })
        .catch((err) => {
          console.log(err);
          res.status(404).json({ error: 'not found' });
        });
    } else {
      res.status(404).json({ error: 'not found' });
    }
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
};

module.exports = { createUser };
