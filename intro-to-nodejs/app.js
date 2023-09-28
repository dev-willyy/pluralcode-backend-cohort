'use strict';
/**
 * working with plain NodeJS::
 * require the core nodejs module 'http' and assign it to http constant
 * call the .createServer() method on the http module and assign it to server constant
 * PS: https module !== http module, 'https' contains all core features of 'http' & additional options for security
 */

const http = require('http');
const https = require('https');
const EventEmitter = require('node:events');
const { books } = require('./data');

const server = http.createServer();

const users = [];

/**
 * .emit() is only needed when a custom event is created by instantiating the EventEmitter class
 * the callback functions are also called 'listeners'
 * the return value of the lsiteners are ignored
 */
class EventEmitterOne extends EventEmitter {}

const newEmitter = new EventEmitterOne();
newEmitter.once('event', function () {
  if (this === newEmitter) {
    console.log('An event occured. The listener function is now called');
  }
});

if (server) newEmitter.emit('event');

server.on('request', (req, res) => {
  const { method, url, headers } = req;

  if (method === 'GET') {
    if (url === '/') {
      res.statusCode = 200;
      res.setHeader('content-type', 'Application/json');

      const resBody = {
        headers,
        method,
        url,
        body: { data: 'Hello, Devs from Nodejs Server' },
      };

      res.write(JSON.stringify(resBody));
      res.end();
    }

    if (url === '/users') {
      res.statusCode = 200;
      res.setHeader('content-type', 'Application/json');

      res.write(JSON.stringify(books));
      res.end();
    }

    const urlParts = new URL(url, `http://${headers.host}`);
    const bookId = urlParts.searchParams.get('id');

    if (bookId) {
      const queriedBook = books.find((book) => book.id === parseInt(bookId));
      res.write(JSON.stringify({ data: queriedBook }));
      res.end();
    }
  }

  if (method === 'POST') {
    if (url === '/enrol') {
      const resBody = [];

      req
        .on('data', (chunk) => {
          resBody.push(chunk);
        })
        .on('end', () => {
          const data = JSON.parse(Buffer.concat(resBody).toString());
          users.push(data);

          res.statusCode = 201;
          res.setHeader('Content-Type', 'Application/json');
          res.write(JSON.stringify(users));
          res.end();
        });
    }
  }
});

const port = 3003;
server.listen(port, (err) => {
  if (err) return console.error(err);
  console.log(`Node server is running on http://localhost:${port}`);
});
