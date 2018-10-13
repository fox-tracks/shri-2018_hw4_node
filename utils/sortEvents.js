function sortEvents(events) {
events.forEach(event => {
    const eventTime = event.time.split(',');
    const eventTimeSeparate = eventTime[0].split(':');

    event.timeMinutes = eventTimeSeparate[0] * 60 + eventTimeSeparate[1];
  });

  function compareEventsTime (event1, event2) {
    return (event2.timeMinutes - event1.timeMinutes);
  }


  const sortedEventsWithTimeMinutes = events.sort(compareEventsTime);

  sortedEventsWithTimeMinutes.forEach(event => {
    delete event.timeMinutes;


  });
  return sortedEventsWithTimeMinutes;
}

module.exports = sortEvents;