import React from 'react';
import ReactDOM from 'react-dom';
import EventNearby from './component/event_nearby';
import EventSchedule from './component/event_schedule';
import MapView from './component/mapview';
import SearchBar from './component/search_bar';
import toastr from 'toastr';
import ReactBootstrap from 'react-bootstrap';
import $ from 'jquery';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      event_nearby: [],
      event_scheduled: [],
      selectedLocation: {
        latlng: { lat: 0, lng: 0 },
        noClick: true,
      },
      displayInfo: false,
      idNumber: null,
    };
    // this.getData = this.getData.bind(this);
    this.getData();
  }

  // API Call to database for main event_nearby data
  getData() {
    let self = this;
    $.ajax({
      method: 'GET',
      url: '/api/event',
      contentType: 'application/json',
    })
    .done((data) => {
      // Render completed overlay instead
      self.setState({ event_nearby: data });
    });
  }

  getId(id) {
    let self = this;
    self.setState({ idNumber: id });
  }

  // API call to post event after click in event_nearby_entryview
  postSchedule(event) {
    $.ajax({
      method: 'POST',
      url: '/api/user',
      data: JSON.stringify(event),
      contentType: 'application/json',
    })
    .done((msg) => {
      console.log(msg);
    });
  }

  render() {
    return (
      <div>
        <h1 className="header">League and Rekt</h1>
        <SearchBar />
        <EventNearby
          onEventSelect = { (event) => {
            if (this.state.event_scheduled.indexOf(event) > -1) {
              toastr.info('You have already signed up for this event!', 'Hey there!', { positionClass: 'toast-top-center', closeButton: true });
              // return;
            } else {
              const temp = this.state.event_scheduled;
              temp.push(event);
              this.setState({ event_scheduled: temp });
              // this.postSchedule(event);
            }
          }}
          events = {this.state.event_nearby}
          getId = { (id) => {
            this.getId(id);
          }}
        />
        <MapView
          onFormSubmit = { () => {
            this.getData();
          } }
          selectedLocation = {this.state.selectedLocation}
          events = {this.state.event_nearby}
          onMapClick = { (coor) => {
            this.setState({ selectedLocation: coor });
          }
        }
        />
        <EventSchedule
          onEventDelete = { (event) => {
            const temp = this.state.event_scheduled;
            for (let i = 0; i < temp.length; i++) {
              if (temp[i]._id === event._id) {
                temp.splice(i, 1);
                this.setState({ event_scheduled: temp });
                return;
              }
            }
          }}
          events = {this.state.event_scheduled}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('.container'));