const mongoose = require('mongoose')
const Tutor = require("../models/tutor.model");

const findTutors = async (req, res) => {
  try {
    const tutors = await Tutor.find({focus: req.params.focus},  ['name', 'profile_photo', 'profession', 'focus', 'rating'])
      .sort({rating: -1});
    res.send({tutors});
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

module.exports =  {findTutors}; 