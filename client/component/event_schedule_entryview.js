import React from 'react';

const EventScheduledEntryView = (props) => {
  return (
    <li>
      {props.event.event}
      <button onClick = { () => {
        props.onEventDelete(props.event);
      }}
      >Delete</button>
    </li>
  );
};

export default EventScheduledEntryView;
