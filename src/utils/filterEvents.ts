import { HomeEvent } from '../events';

export function filterEvents(events: HomeEvent[], type: string | undefined, possibleTypes: string[], errorMessage: string) {
  let output: HomeEvent[] = [];

  if (type === undefined) {
    output = events;
  } else {
    const typesList: string[] = type.split(':');

    typesList.forEach(typeItem => {
      if (possibleTypes.indexOf(typeItem) !== -1) {
        const newEvents: HomeEvent[] = events.filter(event => event.type === typeItem);
        output = output.concat(newEvents);
      } else {
        throw new Error(errorMessage);
      }
    });
  }

  return output;
}