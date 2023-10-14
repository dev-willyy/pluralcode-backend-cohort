const express = require('express');
const session = require('express-session');
const fileStoreOptions = require('./fileStoreOptions');
const FileStore = require('session-file-store')(session);
const { randomUUID } = require('crypto');
const { formatSessionFiles } = require('./formatSessions');

const app = express();

const secret = '759fb4bb-48b1-4efe-845a-244b65999265';

/**
 * Session is persisted on the DB, Cookie is persisted on the client
 */

const users = [{ id: 1, username: 'Jidesky' }];

app.use(express.json());
app.use(
  session({
    genid: (req) => randomUUID(),
    store: new FileStore(fileStoreOptions),
    secret,
    resave: true,
    saveUninitialized: true,
  })
);

app.get('/', (req, res, next) => {
  req.session.user = users[0];
  console.log(req.session);
  res.status(200).send('Home route is functional');
});

const port = 3002;
app.listen(port, () => {
  console.log(`Express server is running on http://localhost:${port}`);
});

formatSessionFiles();
