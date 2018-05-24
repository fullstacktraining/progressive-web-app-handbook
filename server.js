// In production, the app should be served over HTTPS
const path = require('path');
const express = require('express');
const http = require('http');

const app = express();

// Change this, if required
const port = 8080;

app.all('*', (request, response) => {
  if (request.url === '/favicon.ico' || request.url === '/robots.txt') {
    return;
  } else {
    return response.sendFile(path.join(`${__dirname}/${request.url}`));
  }
});

const httpServer = http.createServer(app).listen(port, () => console.log(`HTTP Server is up on ${port}`));