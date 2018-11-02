"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var formatTime_1 = require("./utils/formatTime");
var sortEvents_1 = require("./utils/sortEvents");
var filterEvents_1 = require("./utils/filterEvents");
var processParams_1 = require("./utils/processParams");
var fs_1 = __importDefault(require("fs"));
var PORT = 8000;
var POSSIBLE_TYPES = ['info', 'critical'];
var TYPE_ERROR_MESSAGE = 'incorrect type';
var PAGE_ERROR_MESSAGE = 'incorrect page';
var app = express_1.default();
var startTime = Date.now();
// корневой роут
app.get('/', function (req, res) {
    res.send('It is Express app');
});
// мидлвара для запроса по роуту status - вычисление времени от момента запуска приложения
app.get('/status', function (req, res) {
    var time = formatTime_1.formatTime(Date.now(), startTime);
    res.send(time);
});
app.get('/api/events', function (req, res) {
    var type = req.query.type;
    fs_1.default.readFile('./events.json', function (evt, data) {
        if (evt) {
            res.status(500).send('reading error');
        }
        else {
            try {
                var events = JSON.parse(data.toString());
                var filteredEvents = filterEvents_1.filterEvents(events, type, POSSIBLE_TYPES, TYPE_ERROR_MESSAGE);
                var sortedOutput = sortEvents_1.sortEvents(filteredEvents);
                var params = processParams_1.processParams(req.query, sortedOutput, PAGE_ERROR_MESSAGE);
                var page = params.page, quantity = params.quantity;
                var eventsSet = sortedOutput.slice(((page - 1) * quantity), (page * quantity));
                var respond = {
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
app.use(function (req, res, next) {
    res.status(404).send('<h1>Page not found</h1>');
});
app.use(function (err, req, res, next) {
    console.log(err);
    if (err instanceof Error && (err.message === TYPE_ERROR_MESSAGE || err.message === PAGE_ERROR_MESSAGE)) {
        res.status(400).send(err.message);
    }
    else {
        res.status(500).send('<h1>Server error</h1>');
    }
});
app.listen(PORT, function (err) {
    if (err) {
        return console.log('', err);
    }
    console.log("Express app is listening on localhost: " + PORT);
});
