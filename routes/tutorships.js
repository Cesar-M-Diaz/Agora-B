const express = require('express');
const tutorshipController = require('../controllers/tutorship.controller');
const verifyAuth = require('../middlewares/verifyAuth');

const tutorship = express.Router();

tutorship.post('/tutorship', tutorshipController.createTutorship);
tutorship.get('/tutorships/:id', tutorshipController.getTutorships);
tutorship.post('/cancelTutorship', verifyAuth, tutorshipController.cancelTutorship);
tutorship.get('/tutorship/:id', tutorshipController.getTutorship);

module.exports = tutorship;
