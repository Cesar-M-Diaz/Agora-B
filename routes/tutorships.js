const express = require('express');
const tutorshipController = require('../controllers/tutorship.controller');

const tutorship = express.Router();

tutorship.post('/tutorship', tutorshipController.createTutorship);
tutorship.get('/tutorships', tutorshipController.getTutorships);

module.exports = tutorship;
