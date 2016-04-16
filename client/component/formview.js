// Depreciated

import React from 'react';
import $ from 'jquery';
// const FormView = (props) => {
//     console.log([props.selectedLocation.latlng.lat, props.selectedLocation.latlng.lng]);
//     let clickLocation = [props.selectedLocation.latlng.lat, props.selectedLocation.latlng.lng];
//     return (
//       <Marker key="2394ui32m9dcwa09" position={clickLocation} >
//         <Popup>
//           <form>
//             <label for="eventEntry">New Event:</label>
//             <input type="text" id="eventEntry" placeholder="Enter Event Name Here" />
//           </form>
//         </Popup>
//       </Marker>
//     );
//   };

// export default FormView;


class FormView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eventName: 'Placeholder',
      creator: '',
      location: '',
      lat: '',
      lng: '',
      imageUrl: '',
      maxPeople: '',
      dateCreated: '',
      dateofEvent: '',
      tags: '',
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({lat: this.props.location[0], lng: this.props.location[1]});
    $.ajax({
      method: "POST",
      url: "/api/event",
      data: JSON.stringify(this.state),
      contentType: "application/json",
    })
    .done(function( msg ) {
      alert( "Data Saved: " + msg );
    });
  }


  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)} className="input-group">
          <span className="input-group-addon" id="eventName">Event Name:</span>
          <input className="form-control"
            onChange = {event => {
              this.setState({eventName: event.target.value})}}
            type="text"
            aria-describedby="basic-addon1"
            placeholder="Event Name"
          />
          <span className="input-group-addon">Max People:</span>
          <input 
            onChange = {event => {
              this.setState({maxPeople: event.target.value});
           }}
            className="form-control" 
            name="maxPeople" 
            type="text"
            placeholder="People" />
          <input type="submit" />
      </form>
    );
  }
}
export default FormView;

            // onSubmit = {(event) => {
            //   event.preventDefault();
            //   console.log(event.target.value); 
            //   this.setState({ eventName: event.target.value }); 
            // }}