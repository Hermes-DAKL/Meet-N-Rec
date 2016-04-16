import React from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import mapURL from '../../config/component/config';
import FormView from './formview';

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
  const markerView = () => {
    let clickLocation = [props.selectedLocation.latlng.lat, props.selectedLocation.latlng.lng];
    if (props.selectedLocation.noClick) {
      return;
    } 
    return (
      <Marker key="FormViewKey" position={clickLocation} >
        <Popup minWidth="400">
          <FormView location={clickLocation} />
        </Popup>
      </Marker>
    );
  };

  const position = [37.77, -122.431297];
  return (
    <div>
      <Map onClick={handleClick} center={position} zoom={10} className="col-sm-8 MapView">
        <TileLayer
          url= {mapURL}
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> &copy; <a href="https://www.mapbox.com/map-feedback/">Mapbox</a>'
        />
        {markers}
        {markerView()}
      </Map>
    </div>
  );
};

export default MapView;
