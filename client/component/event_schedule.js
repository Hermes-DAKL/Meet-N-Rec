import React from 'react';
import EventScheduleEntryView from './event_schedule_entryview';

const EventSchedule = (props) => {
  let items = props.events.map((event) => {
    return (
    <EventScheduleEntryView
      mainEvent = {event}
      key={event._id}
      event={event.eventName}
      id={event._id}
      onEventDelete = { props.onEventDelete }
    />
    );
  });
  return (
    <div className="col-sm-2">
      <h5>Your events</h5>
      <ul style={{ listStyleType: 'none' }} className="list-inline">
        {items}
      </ul>
    </div>
  );
};

export default EventSchedule;
