const express = require('express')
const Controller = require('../controllers/sendAppointment.controller.js');

const app = express.Router()

app.post('/sendAppointment', Controller.sendAppointment);

module.exports = app;