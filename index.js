const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const app = express();

app.use(cors());

app.use(routes);

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ error: err.message });
});

app.listen(3001, () => console.log('Servidor corriendo ...'));
