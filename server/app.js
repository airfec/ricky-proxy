const express = require('express');
const path = require('path');
const proxy = require('http-proxy-middleware');
const app = express();

app.get('/', function(req, res) {
  res.redirect('/rooms/1');
});

app.use(express.static('public'));

app.get('/rooms/:id', function(req, res) {
  const reactPath = path.join(__dirname, '../public/index.html');
  res.sendFile(reactPath);
});

app.use(
  '/api/rooms/:id/photos',
  proxy({
    target: 'http://127.0.0.1:3004'
  })
);

app.use(
  '/api/rooms/:id/reviews',
  proxy({
    target: 'http://127.0.0.1:3002'
  })
);

app.use(
  '/api/rooms/:id/bookings',
  proxy({
    target: 'http://127.0.0.1:3001'
  })
);

app.use(
  '/api/rooms/:id',
  proxy({
    target: 'http://127.0.0.1:3003'
  })
);

app.listen(3000, () => console.log('Listening on port 3000!'));