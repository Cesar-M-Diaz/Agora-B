const express = require('express');
const logger = require('../middlewares/logger');
const registerController = require('../controllers/register.controller');

const register = express.Router();

register.post('/register', registerController.createUser);

module.exports = register;
