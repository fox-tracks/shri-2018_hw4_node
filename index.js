const express = require('express');
const port = 8000;
const moment = require('moment');

const app = express();
const startTime = Date.now();

app.use('/api/events', (req, res) => res.send('it is app/api/events!'));

app.get('/', (req, res) => {
  res.send('it is app!')
});

app.use('/status', (req, res, next) => {
  const seconds = Date.now() - startTime;
  const time = moment(seconds).utc().format('HH:mm:ss');
  req.current = time;
  next();
});

app.use('/api/events', (req, res, next) => {
  const seconds = Date.now() - startTime;
  const time = moment(seconds).utc().format('HH:mm:ss');
  req.current = time;
  next();
});

app.get('/status', (req, res) => {

  res.send(req.current);
});

app.get('/api/events', (req, res) => res.send('it is app/api/events!'));

app.listen(port, (err) => {

  if (err) {
    return console.log('', err);
  }
  console.log(`Express app is listening on localhost: ${port}`);
});