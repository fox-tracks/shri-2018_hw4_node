"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function filterEvents(events, type, possibleTypes, errorMessage) {
    var output = [];
    if (type === undefined) {
        output = events;
    }
    else {
        var typesList = type.split(':');
        typesList.forEach(function (typeItem) {
            if (possibleTypes.indexOf(typeItem) !== -1) {
                var newEvents = events.filter(function (event) { return event.type === typeItem; });
                output = output.concat(newEvents);
            }
            else {
                throw new Error(errorMessage);
            }
        });
    }
    return output;
}
exports.filterEvents = filterEvents;
