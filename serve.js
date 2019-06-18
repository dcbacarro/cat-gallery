const express = require('express');
const path = require('path');
const app = express();

app.use('/', express.static(path.join(__dirname, './build')));

app.use(function(req, res, next) {
  //console.log(req.originalUrl);
  next();
});

// to check if server is running
app.get('/ping', (req, res) => {
  res.json({
    success: true,
    message: 'pong'
  })
});

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, './build', 'index.html'));
});

app.listen(3000)