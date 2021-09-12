const Student = require('../models/student.model');
const Tutor = require('../models/tutor.model');
const jwt = require('jsonwebtoken');

const logger = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const student = await Student.authenticate(email, password);
    const tutor = await Tutor.authenticate(email, password);
    console.log(student);
    console.log(tutor);
    if (student) {
      const token = jwt.sign(
        { userId: student._id, type: 'student', userData: student },
        'secret key',
      );
      res.json({ token });
      next();
    } else if (tutor) {
      const token = jwt.sign(
        { userId: tutor._id, type: 'tutor', userData: tutor },
        'secret key',
      );
      res.json({ token });
      next();
    } else {
      res.status(404).send('Not found');
    }
  } catch (error) {
    res.status(500).send('server error');
    next(error);
  }
};

module.exports = logger;
