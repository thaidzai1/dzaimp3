const express = require('express');
const mongoose = require('mongoose');

const keys = require('./config/keys');

mongoose.connect(keys.mongoURI, () => {
  console.log('connect to db');
});

const app = express();

if(process.env.NODE_ENV === 'production'){
  app.use(express.static('client/dist'));
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
  })
}

const _PORT = process.env.PORT || 5000;
app.listen(_PORT, () => {
  console.log('listen port', _PORT);
})
