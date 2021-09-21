const Tutor = require('../models/tutor.model');
const mongoose = require('mongoose');

const getTutorData = async (req, res) => {
  try {
    const tutor = await Tutor.findById({ _id: req.params.id });
    const {
      name,
      email,
      profile_photo,
      description,
      profession,
      focus,
      rating,
    } = tutor;
    const tutorData = {
      name,
      email,
      profile_photo,
      description,
      profession,
      focus,
      rating,
    };
    console.log(tutorData);
    res.status(200).json(tutorData);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getTutorReviews = async (req, res) => {
  const reviews = await mongoose
    .model('reviews')
    .find({ tutor_id: req.params.id });
  res.status(200).json(reviews);
};

module.exports = { getTutorData, getTutorReviews };
