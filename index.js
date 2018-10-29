const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');

require('./models/User');
require('./services/passport');
const keys = require('./config/keys');

//connect to database mongodb
mongoose.connect(keys.mongoURI);
// config to save session in mongoose
mongoose.Promise = global.Promise;
const db = mongoose.connection;

const app = express();

//setup session
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({
    mongooseConnection: db,
    ttl: 60 * 60 * 24,
    autoRemove: 'interval',
    autoRemoveInterval: 10,
  }) //store session in mongodb
}))

//config passport
app.use(passport.initialize());
app.use(passport.session());

require('./routes')(app);

//config if in production mode server will send built html file in client folder
if(process.env.NODE_ENV === 'production'){
  app.use(express.static('client/public'));
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "public", "index.html"));
  })
}

//create port and server
const _PORT = process.env.PORT || 5000;
app.listen(_PORT)
