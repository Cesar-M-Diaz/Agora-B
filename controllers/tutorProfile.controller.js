const Tutor = require('../models/tutor.model');
const Review = require('../models/review.model');

const getTutorData = async (req, res) => {
  try {
    const tutor = await Tutor.findById({ _id: req.params.id });
    const { name, email, profile_photo, description, profession, focus, rating } = tutor;
    const tutorData = {
      name,
      email,
      profile_photo,
      description,
      profession,
      focus,
      rating,
    };
    res.status(200).json(tutorData);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getTutorReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ tutor_id: req.params.id }).populate('student_id', 'name');
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { getTutorData, getTutorReviews };
