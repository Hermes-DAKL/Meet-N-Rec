import React from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import mapURL from '../../config/component/config';

const MapView = (props) => {
  const handleClick = (thing) => {
    props.onMapClick(thing);
  };

  const markers = props.events.map((event) => {
    let latlng = [event.lat, event.lng];
    return (
      <Marker key = {event.id} position={latlng}>
        <Popup>
          <span> {event.event} </span>
        </Popup>
      </Marker>
    );
  });
  const FormView = () => {
    let clickLocation = [props.selectedLocation.latlng.lat, props.selectedLocation.latlng.lng];
    if (props.selectedLocation.noClick) {
      return;
    }
    return (
      <Marker key="FormViewKey" position={clickLocation} >
      <Popup minWidth="400">
        <div class="input-group">
            <span className="input-group-addon" id="eventName">Event Name:</span>
            <input className="form-control" type="text" aria-describedby="basic-addon1" placeholder="Text" />
            <span className="input-group-addon">Max People:</span>
            <input className="form-control" type="text"placeholder="Text" />
        </div>
      </Popup>
      </Marker>
    );
  };
  const position = [37.77, -122.431297];
  return (
    <div>
      <Map onclick={handleClick} center={position} zoom={10} className="col-sm-8 MapView">
        <TileLayer
          url= {mapURL}
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> &copy; <a href="https://www.mapbox.com/map-feedback/">Mapbox</a>'
        />
        {markers}
        {FormView()}
      </Map>
    </div>
  );
};

export default MapView;
