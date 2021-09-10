const Tutor = require('../models/tutor.model');
const Student = require('../models/student.model');

const createTutor = async (req, res, next) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const profile_photo = ' ';
    const description = ' ';
    const profession = req.body.profession;
    const focus = req.body.focus;
    const schedule = 'Mornings from 8 to 11';
    const rating = ' ';

    const newTutor = await new Tutor({
      name,
      email,
      password,
      profile_photo,
      description,
      profession,
      focus,
      schedule,
      rating,
    });

    newTutor.save();
    res.status(201).json(newTutor);
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
};

const createStudent = async (req, res, next) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const profile_photo = req.body.profile_photo;

    const newStudent = await new Student({
      name,
      email,
      password,
      profile_photo,
    });

    newStudent.save();
    res.status(201).json(newStudent);
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
};

module.exports = {
  createTutor,
  createStudent,
};
