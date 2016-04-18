import React from 'react';
import EventNearbyEntryView from './event_nearby_entryview';

const EventNearby = (props) => {
  let items = props.events.map((event) => {
    return (
      <EventNearbyEntryView
        mainEvent = {event}
        key={event._id}
        event={event.eventName}
        id={event._id}
        onEventSelect = { props.onEventSelect }
        getId = {props.getId}
      />
      );
  });
  return (
    <div className="col-sm-2">
      <h5>Events nearby</h5>
      <ul style={{ listStyleType: 'none' }} className="list-inline">
        {items}
      </ul>
    </div>
  );
};

export default EventNearby;
