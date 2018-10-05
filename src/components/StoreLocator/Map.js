import React from 'react';
import { compose, withProps } from 'recompose';
import PropTypes from 'prop-types';
import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps';
import { Shimmer } from 'hometown-components/lib/Shimmer';
import MapMarker from './MapMarker';

const { MarkerWithLabel } = require('react-google-maps/lib/components/addons/MarkerWithLabel');

const Map = ({
  mapData, zoom, position, open
}) => (
  <GoogleMap zoom={parseInt(zoom, 10) || 16} center={position}>
    {mapData.map((item, index) => (
      <MarkerWithLabel
        position={item.position}
        containerElement={<div style={{ width: '400px' }} />}
        labelAnchor={new window.google.maps.Point(0, 0)}
        labelStyle={{ backgroundColor: 'white', fontSize: '14px', top: '30px' }}
        key={String(index)}
      >
        <div className="testtest">
          {open && <MapMarker store={item.store} address={item.address} phone={item.phone} position={item.position} />}
        </div>
      </MarkerWithLabel>
    ))}
  </GoogleMap>
);

Map.defaultProps = {
  position: {},
  mapData: []
};
Map.propTypes = {
  position: PropTypes.object,
  zoom: PropTypes.number.isRequired,
  mapData: PropTypes.array,
  open: PropTypes.bool.isRequired
};

const MapContainer = compose(
  withProps({
    /* eslint-disable max-len */
    googleMapURL:
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyDCzUmL0n8ph9msf-Rbr-Z7zKuxjI-Rz1M&v=3.exp&libraries=geometry,drawing,places',
    loadingElement: (
      <div style={{ height: '100%' }}>
        <Shimmer height="500px" />
      </div>
    ),
    containerElement: <div style={{ height: '600px' }} />,
    mapElement: <div style={{ height: '100%' }} />
  }),
  withScriptjs,
  withGoogleMap
)(props => <Map {...props} />);

export default MapContainer;
