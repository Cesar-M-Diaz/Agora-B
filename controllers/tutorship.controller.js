const Tutor = require("../models/tutor.model");
const Student = require("../models/student.model");
const Tutorship = require("../models/tutorship.model");

const createTutorship = async (req, res, next) => {
  try {
    const { email, description, tutor_id } = req.body;
    const student = await Student.findOne({ email });
    if (student) {
      const tutorship = await Tutorship.create({
        student_id: student._id,
        description,
        tutor_id,
      });
      console.log(tutorship);
      res.status(200).json(tutorship);
      next();
    } else {
      res.status(400).json({ message: "Student email not found" });
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
    const tutorships = await Tutorship.find({ [userType]: user.id });
    res.status(200).json(tutorships);
    next();
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { createTutorship, getTutorships };
