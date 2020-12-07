require('dotenv').config();

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const session = require('express-session');
const https = require('https');
const passport = require('./passport/setup');
const MongoStore = require('connect-mongo')(session);
var cookieParser = require('cookie-parser');

const DIST_DIR = path.join(__dirname, 'dist');
const INDEX = path.join(DIST_DIR, 'index.html');

const User = require('./models/users');

app.use(express.static(DIST_DIR));
app.use(bodyParser.json());
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});

mongoose.Promise = Promise;
mongoose.connect(process.env.DB_HOST, { useNewUrlParser: true, useUnifiedTopology: true });

let db = mongoose.connection;
db.on('error', err => console.log(err));
db.once('open', () => console.log('Connected to DB'));

app.use(cookieParser());
app.use(session({
  secret: 'super fun secret',
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({mongooseConnection: db})
}));

app.use(passport.initialize());
app.use(passport.session());

app.get(['/', '/login', '/signup', '/profile', '/admin'], (req, res) => {
  res.sendFile(INDEX);
});

app.post('/session', async (req, res) => {
  if(req.session.id && req.session.passport){
    User.findById(req.session.passport.user, (err, user) => {
      if(err) console.log(err);

      res.send(user);
    });
  } else {
    res.send({error: 'No session'});
  }
});

app.use('/user', require('./routes/users'));

app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.send({session: 'destroyed'});
  });
});