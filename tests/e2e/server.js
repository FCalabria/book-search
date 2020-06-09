const handler = require('serve-handler');
const http = require('http');
const path = require('path')
 
const server = http.createServer((request, response) => {
  return handler(request, response, {public: path.join(__dirname, '../../build')});
})

module.exports = server