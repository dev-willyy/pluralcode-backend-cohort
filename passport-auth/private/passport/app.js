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
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  'login',
  new LocalStrategy((username, password, done) => {
    try {
      if (username === 'fail' || password === 'password')
        return done(null, false, { message: 'Invalid login credentials' });
      if (username === 'Mongodb error') throw new Error('Error interacting with MongoDB');
      return done(null, { username, password }, { message: 'login successful' });
    } catch (err) {
      console.error(err);
    }
  })
);

passport.serializeUser((user, done) => {
  return done(null, user, console.log('Serializing user into session: ', user));
});

passport.deserializeUser((user, done) => {
  return done(null, user, console.log('Deserializing user from session'));
});

app.get('/', (req, res, next) => {
  console.log(req.session, req.user, req.isAuthenticated());
  res.status(200).send('Home route is functional');
});

app.get('/login', (req, res, next) => {
  res.render('login');
});

/**
 * fix req.session.messages === undefined for '/success'
 * if (user.isLoggedIn() or isAuthenticated()) disallow access to '/register'
 */
app.get('/success', (req, res, next) => {
  // console.log(req.user, req.login, req.logout, req.isAuthenticated, req.isPaused);
  console.log(req.query, req.isAuthenticated());
  res.status(200).send('login successful');
});

app.get('/failure', (req, res, next) => {
  console.log(req.session);
  res.status(401).send('login failed');
});

app.get('/login', (req, res, next) => {
  res.render('login');
});

app.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
  });
  res.redirect('/');
});

app.post(
  '/login',
  (req, res, next) => {
    console.log('Processing user Sign in');
    next();
  },
  passport.authenticate('login', {
    successRedirect: '/success?message=success!%20login%20successful',
    successMessage: true,
    failureRedirect: '/failure',
    failureMessage: true,
  })
);

app.get('/top-secret', (req, res, next) => {
  if (!req.isAuthenticated()) return res.redirect('/');
  return res.status(200).send('Jesus, the Messiah is coming soon!');
});

const port = 3003;
app.listen(port, () => {
  console.log(`Express server is running on http://localhost:${port}`);
});

formatSessionFiles();
