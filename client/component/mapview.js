import React from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

const MapView = (props) => {
  const position = [37.77, -122.431297];
  return (
    <Map center={position} zoom={13} className="MapView">
      <TileLayer
        url= "http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position}>
        <Popup>
          <span> A pretty CSS3 popup.<br />Easily customizable. </span>
        </Popup>
      </Marker>
    </Map>
  );
};

export default MapView;
// render(map, document.getElementById('map-container'));
