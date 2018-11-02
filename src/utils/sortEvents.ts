import { HomeEvent } from '../events';

export function sortEvents(events: HomeEvent[]) {
  events.forEach(event => {
    const eventTime: string[] = event.time.split(',');
    const eventTimeSeparateStr: string[]  = eventTime[0].split(':');
    let eventTimeSeparate: number[];



    function toNumber(strArray: string[]): number[] { 
      return strArray.map(Number);
    }

    eventTimeSeparate = toNumber(eventTimeSeparateStr);

    event.timeMinutes = eventTimeSeparate[0] * 60 + eventTimeSeparate[1];
  });

  function compareEventsTime(event1: HomeEvent, event2: HomeEvent) {

    if(!event1.timeMinutes || !event2.timeMinutes) {
        throw new Error();
    }

    return (event2.timeMinutes - event1.timeMinutes);
  }


  const sortedEventsWithTimeMinutes = events.sort(compareEventsTime);

  sortedEventsWithTimeMinutes.forEach(event => {
    delete event.timeMinutes;


  });

  return sortedEventsWithTimeMinutes;
}
