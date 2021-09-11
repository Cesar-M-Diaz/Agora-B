const Tutor = require('../models/tutor.model');
const Student = require('../models/student.model');

const createUser = async (req, res, next) => {
  try {
    const { type, inputs } = req.body;

    async function role() {
      type === 'student'
        ? await new Student(inputs).save()
        : await new Tutor(inputs).save();
    }
    role();

    res.status(201).json(role);
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
};

module.exports = {
  createUser,
};
