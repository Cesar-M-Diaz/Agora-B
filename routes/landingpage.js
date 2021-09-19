const express = require("express");
const Controller = require("../controllers/landingPage.controller")

const app = express.Router();

app.get('/landingpage', Controller.tutorsCardInfo );


module.exports = app;