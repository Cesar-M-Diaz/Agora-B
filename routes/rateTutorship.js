const express = require('express');
const postReview = require('../controllers/review.controller')
const verifyAuth = require('../middlewares/verifyAuth')

const app = express.Router()

app.post('/rateTutorship', verifyAuth, postReview)

module.exports = app;