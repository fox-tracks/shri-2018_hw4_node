import express from 'express';
import { formatTime } from './utils/formatTime';
import { sortEvents } from './utils/sortEvents';
import { filterEvents } from './utils/filterEvents';
import { processParams, PaginationParams } from './utils/processParams';
import { HomeEvent } from './events';
import fs from 'fs';

const PORT: number = 8000;
const POSSIBLE_TYPES: string[] = ['info', 'critical'];
const TYPE_ERROR_MESSAGE: string = 'incorrect type';
const PAGE_ERROR_MESSAGE: string = 'incorrect page';

const app = express();
const startTime: number = Date.now();

// корневой роут
app.get('/', (req: express.Request, res: express.Response) => {
  res.send('It is Express app');
});

// мидлвара для запроса по роуту status - вычисление времени от момента запуска приложения
app.get('/status', (req: express.Request, res: express.Response) => {
  const time: string = formatTime(Date.now(), startTime);

  res.send(time);
});

app.get('/api/events', (req: express.Request, res: express.Response) => {
  const {type} = req.query;

  fs.readFile('./events.json', (evt, data: Buffer) => {
    if (evt) {
      res.status(500).send('reading error');
    } else {
      try {
        const events: HomeEvent[] = JSON.parse(data.toString()) as HomeEvent[];
        const filteredEvents: HomeEvent[] = filterEvents(events, type, POSSIBLE_TYPES, TYPE_ERROR_MESSAGE);
        const sortedOutput: HomeEvent[] = sortEvents(filteredEvents);

        const params: PaginationParams = processParams(req.query, sortedOutput, PAGE_ERROR_MESSAGE);
        const {page, quantity} = params;

        const eventsSet: HomeEvent[] = sortedOutput.slice(((page - 1) * quantity), (page * quantity));

        const respond = {
          page: page,
          from: Math.ceil(sortedOutput.length / quantity),
          quantityAtPage: quantity,
          events: eventsSet
        };
        res.json(respond);
      }
      catch (err) {
        res.status(500).send(err.message);
      }
    }
  });

});

// обработка ошибок
app.use((req: express.Request, res: express.Response, next: (error?: Error) => void) => {
  res.status(404).send('<h1>Page not found</h1>');
});

app.use((err: Error, req: express.Request, res: express.Response, next: (error?: Error) => void) => {
  console.error(err);
  if (err instanceof Error && (err.message === TYPE_ERROR_MESSAGE || err.message === PAGE_ERROR_MESSAGE)) {
    res.status(400).send(err.message);
  } else {
    res.status(500).send('<h1>Server error</h1>');
  }
});

app.listen(PORT, (err?: Error) => {

  if (err) {
    return console.error('', err);
  }

  console.info(`Express app is listening on localhost: ${PORT}`);
});

