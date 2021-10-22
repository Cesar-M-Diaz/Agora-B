const express = require("express");
const Controller = require("../controllers/tutorSearch.controller")

const app = express.Router();

app.get('/tutorsearch/:query/:page', Controller.findTutors );


module.exports = app;