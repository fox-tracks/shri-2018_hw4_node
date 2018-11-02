"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function sortEvents(events) {
    events.forEach(function (event) {
        var eventTime = event.time.split(',');
        var eventTimeSeparateStr = eventTime[0].split(':');
        var eventTimeSeparate;
        function toNumber(strArray) {
            return strArray.map(Number);
        }
        eventTimeSeparate = toNumber(eventTimeSeparateStr);
        event.timeMinutes = eventTimeSeparate[0] * 60 + eventTimeSeparate[1];
    });
    function compareEventsTime(event1, event2) {
        if (!event1.timeMinutes || !event2.timeMinutes) {
            throw new Error();
        }
        return (event2.timeMinutes - event1.timeMinutes);
    }
    var sortedEventsWithTimeMinutes = events.sort(compareEventsTime);
    sortedEventsWithTimeMinutes.forEach(function (event) {
        delete event.timeMinutes;
    });
    return sortedEventsWithTimeMinutes;
}
exports.sortEvents = sortEvents;
