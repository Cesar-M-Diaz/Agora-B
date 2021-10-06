const express = require('express');
const tutorshipController = require('../controllers/tutorship.controller');

const tutorship = express.Router();

tutorship.post('/tutorship', tutorshipController.createTutorship);

module.exports = tutorship;
