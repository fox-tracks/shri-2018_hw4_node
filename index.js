const express = require('express');
const port = 8000;
const events = require('./events.json');
const possibleTypes = ['info', 'critical'];
const typeErrorMessage = 'incorrect type';
const pageErrorMessage = 'incorrect page';
const formatTime = require('./utils/formatTime');
const sortEvents = require('./utils/sortEvents');
const filterEvents = require('./utils/filterEvents');
const processParams = require('./utils/processParams');

const app = express();
const startTime = Date.now();

// корневой роут
app.get('/', (req, res) => {
  res.send('It is Express app');
});

// мидлвара зля запроса по роуту status - вычисление времени от момента запуска приложения
app.get('/status', (req, res) => {
  const time = formatTime(Date.now(), startTime);

  res.send(time);
});


app.get('/api/events', (req, res) => {
  const { type } = req.query;

  const filteredEvents = filterEvents(events, type, possibleTypes, typeErrorMessage);
  const sortedOutput = sortEvents(filteredEvents);

  const params = processParams(req.query, sortedOutput, pageErrorMessage);
  const { page, quantity } = params;

  const eventsSet = sortedOutput.slice(((page - 1) * quantity), (page * quantity));

  const respond = {
    page: + page,
    from: Math.ceil(sortedOutput.length / quantity),
    quantityAtPage: quantity,
    events: eventsSet
  };
  res.json(respond);
});

// обработка ошибок
app.use((req, res, next) => {
  res.status(404).send('<h1>Page not found</h1>');
});

app.use((err, req, res, next) => {
  console.log(err);
  if (err instanceof Error && (err.message === typeErrorMessage || err.message === pageErrorMessage)){
    res.status(400).send(err.message);
  } else {
    res.status(500).send('<h1>Server error</h1>');
  }
});

app.listen(port, (err) => {

  if (err) {
    return console.log('', err);
  }

  console.log(`Express app is listening on localhost: ${port}`);
});

