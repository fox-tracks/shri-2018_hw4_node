const express = require('express');
const port = 8000;
const events = require('./events.json');
const possibleTypes = ['info', 'critical'];
const typeErrorMessage = 'incorrect type';
const formatTime = require('./utils/formatTime');

const app = express();
const startTime = Date.now();



app.get('/', (req, res) => {
    res.send('It is Express app');
});

// мидлвара зля запроса по роуту status - вычисление времени от момента запуска приложения
app.get('/status', (req, res) => {
  const time = formatTime(Date.now(), startTime);

  res.send(time);
});


app.get('/api/events', (req, res, next) => {
    const typeFromGet = req.query.type;
    let output = [];

    if(typeFromGet === undefined) {
      output = events;
    } else {
      const typesList = typeFromGet.split(':');

      typesList.forEach(typeItem => {

        if (possibleTypes.indexOf(typeItem) !== -1) {
          const newEvents = events.filter(event => event.type === typeItem);
          output = output.concat(newEvents);
        } else {
          throw new Error(typeErrorMessage);
        }
      });
    }


  res.send(output);
});


app.use((req, res, next) => {     // логирование ошибки, пока просто console.log
    res.status(404).send('<h1>Page not found</h1>');
});

app.use((err, req, res, next) => {     // логирование ошибки, пока просто console.log
  console.log(err);
  if (err instanceof Error && err.message === typeErrorMessage) {
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

