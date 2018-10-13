function filterEvents(events, type, possibleTypes, errorMessage) {
  let output = [];

  if (type === undefined) {
    output = events;
  } else {
    const typesList = type.split(':');

    typesList.forEach(typeItem => {
      if (possibleTypes.indexOf(typeItem) !== -1) {
        const newEvents = events.filter(event => event.type === typeItem);
        output = output.concat(newEvents);
      } else {
        throw new Error(errorMessage);
      }
    });
  }

  return output;
}

module.exports = filterEvents;