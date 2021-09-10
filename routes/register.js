const express = require('express');
const tasksController = require('../controllers/register.controller');

const register = express.Router();

register.post('/register/tutor', tasksController.createTutor);
register.post('/register/student', tasksController.createStudent);

module.exports = register;
