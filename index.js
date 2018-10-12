const express = require('express');
const port = 8000;
const moment = require('moment');
const events = require('./events.json');

const app = express();
const startTime = Date.now();

app.get('/', (req, res) => {
    res.send('It is Express app');
});

// мидлвара зля запроса по роуту status - вычисление времени от момента запуска приложения
app.get('/status', (req, res) => {
    const seconds = Date.now() - startTime;
    const time = moment(seconds).utc().format('HH:mm:ss');
    res.send(time);
});

app.get('/api/events', (req, res, next) => {
    const typeFromGet = req.query.type;
    console.log(typeFromGet);
    typeFromGet === undefined && res.send(events);

    const newEvents = events.filter(event => {

        console.log('filter');

        if (event.type === typeFromGet) {
            return event;
        }
    });


    res.send(newEvents);

    // ДОБАВИТЬ ОБРАБОТКУ ОШИБОК
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

