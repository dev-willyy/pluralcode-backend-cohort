const express = require('express');
const session = require('express-session');
const fileStoreOptions = require('./fileStoreOptions');
const FileStore = require('session-file-store')(session);
const LocalStrategy = require('passport-local');
const passport = require('passport');
const { randomUUID } = require('crypto');
const { formatSessionFiles } = require('./formatSessions');
const path = require('path');

const app = express();

const secret = '759fb4bb-48b1-4efe-845a-244b65999265';

/**
 * Session is persisted on the DB, Cookie is persisted on the client
 */

const users = [{ id: 1, username: 'Jidesky' }];

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(
  session({
    genid: (req) => randomUUID(),
    store: new FileStore(fileStoreOptions),
    secret,
    resave: true,
    saveUninitialized: false,
  })
);
app.use(express.urlencoded({ extended: true }));

passport.use(
  new LocalStrategy((username, password, done) => {
    try {
      if (username === 'fail' || password === 'password') return done(null, false);
      if (username === 'Mongodb error') throw new Error('Error interacting with MongoDB');
      return done(null, { username, password });
    } catch (err) {
      console.error(err);
    }
  })
);

app.get('/', (req, res, next) => {
  req.session.user = users[0];
  console.log(req.session);
  res.status(200).send('Home route is functional');
});

app.get('/login', (req, res, next) => {
  res.render('login');
});

app.get('/success', (req, res, next) => {
  res.status(200).send('login successful');
});

app.get('/failure', (req, res, next) => {
  res.status(401).send('login failed');
});

app.get('/login', (req, res, next) => {
  res.render('login');
});

app.post(
  '/login',
  (req, res, next) => {
    console.log('Processing user Sign in');
    next();
  },
  passport.authenticate('local', {
    session: false,
    successRedirect: '/success',
    failureRedirect: '/failure',
  })
);

const port = 3003;
app.listen(port, () => {
  console.log(`Express server is running on http://localhost:${port}`);
});

formatSessionFiles();
