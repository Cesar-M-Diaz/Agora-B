const express = require('express');
const tutorProfileController = require('../controllers/tutorProfile.controller');

const tutorProfile = express.Router();

tutorProfile.get('/tutor/:id', tutorProfileController.getTutorData);
tutorProfile.get('/tutor/reviews/:id', tutorProfileController.getTutorReviews);

module.exports = tutorProfile;
