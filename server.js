require('dotenv').config();
const bb = require('express-busboy');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const registerRoute = require('./routes/register');
const tutorsearch = require('./routes/tutorSearch');
const tutorProfileRoutes = require('./routes/tutorProfile');
const categories = require('./routes/categories')
const tutors = require('./routes/tutors')
const updateProfile = require('./routes/updateProfile');

const app = express();

bb.extend(app, {
  upload: true,
  path: 'uploads',
  allowedPath: /./
});

const loginRoute = require('./routes/login');


app.use(cors());
app.use(express.json());
app.use(loginRoute);
app.use(registerRoute);
app.use(tutorProfileRoutes);
app.use(categories);
app.use(tutors);
app.use(tutorsearch);
app.use(updateProfile);

const uri = process.env.ATLAS_URI;

mongoose.connect(uri, { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established succesfully');
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ error: err.message });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log('Server running ...'));
