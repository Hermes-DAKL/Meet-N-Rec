import React from 'react';

const EventSchedule = (props) => {
  let items = props.events.map((event) => {
    return <li key={event}>{event}</li>;
  });
  return (
    <ul>
      {items}
    </ul>
  );
};

export default EventSchedule;
