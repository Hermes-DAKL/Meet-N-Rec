import React from 'react';
import ReactDOM from 'react-dom';
import EventNearby from './component/event_nearby';
import EventSchedule from './component/event_schedule';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      event_nearby: ['basketball', 'baseball', 'golf'],
      event_scheduled: ['baseball', 'golf'],
    };

    // API Calls to database HERE
  }

  render() {
    return (
      <div>
        <EventNearby events = {this.state.event_nearby} />
        <EventSchedule events = {this.state.event_scheduled} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('.container'));
