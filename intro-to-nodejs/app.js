/**
 * working with plain NodeJS::
 * require nodejs core module - http and assign it to http constant
 * call the .createServer() method on the http module and assign it to server constant
 * PS: https module !== http module, 'https' contains all core features of 'http' & additional options for security
 */

const http = require('http');
const https = require('https');

console.log(http.STATUS_CODES);

const server = http.createServer();

// console.log(server.on());

const port = 3003;

server.listen(port, (err) => {
  if (err) return console.error(err);
  console.log(`Node server is running on port ${port}`);
});
