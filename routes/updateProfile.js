const express = require('express');
const cloudinary = require('cloudinary').v2;
const updateProfile = require('../controllers/updateProfile.controller');

const app = express.Router();

app.post('/updateProfile', updateProfile)

app.post('/uploadProfileImage', (req, res, next) => {
    console.log("files: ", req.files);
    cloudinary.uploader.upload(req.files.image.file, (error, result) => {
      if(error) {
        return next();
      }
      const url = result.url;
      res.status(200).send(url);
    })
  })

module.exports = app;