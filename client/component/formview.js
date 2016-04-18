import React from 'react';
import { Button } from 'react-bootstrap';
import $ from 'jquery';
import toastr from 'toastr';
import _ from 'underscore';


class FormView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eventObj: {
        eventName: 'Placeholder',
        creator: '',
        location: '',
        lat: '',
        lng: '',
        imageUrl: '',
        dateCreated: '',
        dateofEvent: '',
        tags: '',
      },
      formCompleted: false
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ eventObj: _.extend(this.state.eventObj, {lat: this.props.location[0], lng: this.props.location[1] })});
    let form = this;
    $.ajax({
      method: "POST",
      url: "/api/event",
      data: JSON.stringify(this.state.eventObj),
      contentType: "application/json",
    })
    .done(function( msg ) {
      // Render completed overlay instead
      form.setState({formCompleted: true});
    });
    this.props.onFormSubmit();
  }

  handleReset() {
    // AMANDO NUDO'S NOTE: Add clear method here by passing down onMapClick from Map View.
    // Edit Index.js <MapView> -> onMapClick so coor.noClick logic is done on MapView and not Index.js
    // Then call onMapClick here using this.props.location for latlng and then make noClick equal true. 
    this.props.onMapClick({
        latlng: { lat: 0, lng: 0 },
        noClick: true,
      });
    this.setState({formCompleted: false});
  }

  // Overlay for event creation form
  uncompleteOverlay() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <div className="form-group">
          <label>Event Name:</label>
          <input className="form-control"
            onChange = {event => {
              this.setState({ eventObj: _.extend(this.state.eventObj, {eventName: event.target.value})} )
              }} // Using extend to keep old state properties and just update eventName
            type="text"
            aria-describedby="basic-addon1"
            placeholder="Event Name"
          />
        </div>
        <div className="form-group">
          <label>Organizer's Name:</label>
          <input 
            onChange = {event => {
              this.setState({eventObj: _.extend(this.state.eventObj, {creator: event.target.value})} )
           }} 
            className="form-control" 
            name="organizers name" 
            type="text"
            placeholder="Your Name" />
        </div>
        <div className="form-group">
          <label>Location's Name:</label>
          <input 
            onChange = {event => {
              this.setState({eventObj: _.extend(this.state.eventObj, {location: event.target.value})} )
           }} 
            className="form-control" 
            name="locations name" 
            type="text"
            placeholder="For example: Golden Gate Park" />
        </div>

        <div className="form-group">
          <label>Date of Recreational Event:</label>
          <input 
            onChange = {event => {
              this.setState({eventObj: _.extend(this.state.eventObj, {dateofEvent: event.target.value})} )
           }} 
            className="form-control" 
            name="date of event" 
            type="datetime-local"
            />
        </div>

        <div className="form-group">
          <label>Tags:</label>
          <input 
            onChange = {event => {
              this.setState({eventObj: _.extend(this.state.eventObj, {tags: event.target.value})} )
           }} 
            className="form-control" 
            name="date of event" 
            type="text"
            />
        </div>                

        <input type="submit" />
      </form>
    );
  }

  // Overlay to show when user has submitted a successful form.
  completeOverlay() {
    const eventMsgTitle = `We created an event for ${this.state.eventObj.eventName}!`
    const eventMsg = `We will help you find people to join your event ${this.state.eventObj.creator}!`
    return (
      <div>
        <h4>{eventMsgTitle}</h4>
        <p>{eventMsg}</p>
        <Button 
          onClick={this.handleReset.bind(this)}
          className="button" 
          bsSize="small">Create another Event?</Button>
      </div>
    );
  }

  render() {
    return (this.state.formCompleted ? this.completeOverlay() : this.uncompleteOverlay());
  }
}
export default FormView;


//   render() {
//     return (
//       <form onSubmit={this.handleSubmit.bind(this)} className="input-group">
//           <span className="input-group-addon" id="eventName">Event Name:</span>
//           <input className="form-control"
//             onChange = {event => {
//               this.setState({eventName: event.target.value})}}
//             type="text"
//             aria-describedby="basic-addon1"
//             placeholder="Event Name"
//           />
//           <span className="input-group-addon">Max People:</span>
//           <input 
//             onChange = {event => {
//               this.setState({maxPeople: event.target.value});
//            }}
//             className="form-control" 
//             name="maxPeople" 
//             type="text"
//             placeholder="People" />
//           <input type="submit" />
//       </form>
//     );
//   }
// }