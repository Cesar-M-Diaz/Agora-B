require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const registerRoute = require('./routes/register');
const tutorProfileRoutes = require('./routes/tutorProfile');
const categories = require('./routes/categories');
const tutors = require('./routes/tutors');
const loginRoute = require('./routes/login');

const app = express();

app.use(cors());
app.use(express.json());
app.use(loginRoute);
app.use(registerRoute);
app.use(tutorProfileRoutes);
app.use(categories);
app.use(tutors);

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

app.listen(3001, () => console.log('Server running ...'));
