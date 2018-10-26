const express = require('express');
const mongoose = require('mongoose');

const keys = require('./config/keys');

mongoose.connect(keys.mongoURI, () => {
  console.log('connect to db');
});

const app = express();

app.get('/', (req, res) => {
  res.send('hello mp3');
})

const _PORT = process.env.PORT || 5000;
app.listen(_PORT, () => {
  console.log('listen port', _PORT);
})
