const express = require('express');
const port = 8000;
const moment = require('moment');
const fs = require('fs');

const app = express();
const startTime = Date.now();


// мидлвара зля запроса по роуту status - вычисление времени от момента запуска приложения
app.use('/status', (req, res, next) => {
  const seconds = Date.now() - startTime;
  const time = moment(seconds).utc().format('HH:mm:ss');
  res.send(time);
});

app.use((req, res, next) => {     // логирование ошибки, пока просто console.log
  res.status(404).send('<h1>Page not found</h1>');
});

app.use((err, req, res, next) => {     // логирование ошибки, пока просто console.log
  res.status(500).send('<h1>Server error</h1>');
});

app.listen(port, (err) => {

  if (err) {
    return console.log('', err);
  }

  console.log(`Express app is listening on localhost: ${port}`);
});

