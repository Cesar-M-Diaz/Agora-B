const Tutor = require('../models/tutor.model');
const Student = require('../models/student.model');
const Tutorship = require('../models/tutorship.model');

const createTutorship = async (req, res, next) => {
  try {
    const { email, tutor_id, date, time } = req.body;
    const student = await Student.findOne({ email });
    if (student) {
      const newDate = `${date}T${time}:00.000z`;
      const tutorship = await Tutorship.create({ student_id: student._id, date: newDate, tutor_id });
      res.status(200).json(tutorship);
      next();
    } else {
      res.status(400).json({ message: 'Student email not found' });
    }
  } catch (err) {
    res.status(400).json(err);
  }
};

const getTutorships = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user =
      (await Student.findOne({ _id: id })) ||
      (await Tutor.findOne({ _id: id }));
    const userType = user.focus ? "tutor_id" : "student_id";
    const tutorships = await Tutorship.find({ [userType]: user.id }).populate('tutor_id').populate('student_id').exec();
    res.status(200).json(tutorships);
    next();
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { createTutorship, getTutorships };
