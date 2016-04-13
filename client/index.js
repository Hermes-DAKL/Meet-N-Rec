import React from 'react';
import ReactDOM from 'react-dom';
import EventNearby from './component/event_nearby';
import EventSchedule from './component/event_schedule';
import MapView from './component/mapview';
import toastr from 'toastr';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      event_nearby: [
        { id: 121, event: 'football' },
        { id: 124, event: 'basketball' },
        { id: 122, event: 'baseball' },
        { id: 120, event: 'golf' },
      ],
      event_scheduled: [],
    };

    // API Calls to database HERE
  }
  // helperEventSelect(event) {
  //   console.log(this);
  //   const temp = this.state.event_scheduled;
  //   temp.push(event);
  //   this.setState({ event_scheduled: temp });
  // }
  render() {
    return (
      <div>
        <EventNearby
          onEventSelect = { (event) => {
            if (this.state.event_scheduled.indexOf(event) > -1) {
              toastr.info('You have already signed up for this event!', 'Hey there!', { positionClass: 'toast-top-center', closeButton: true });
              // return;
            } else {
              const temp = this.state.event_scheduled;
              temp.push(event);
              this.setState({ event_scheduled: temp });
            }
          }}
          events = {this.state.event_nearby}
        />
        <EventSchedule
          onEventDelete = { (event) => {
            const temp = this.state.event_scheduled;
            for (let i = 0; i < temp.length; i++) {
              if (temp[i].id === event.id) {
                temp.splice(i, 1);
                this.setState({ event_scheduled: temp });
                return;
              }
            }
          }}
          events = {this.state.event_scheduled}
        />
        <MapView />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('.container'));
