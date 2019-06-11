import React from 'react';
import { compose, withProps } from 'recompose';
import PropTypes from 'prop-types';
import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps';
import { Shimmer } from 'hometown-components/lib/Shimmer';
import { mapKey } from 'helpers/Constants';
import MapMarker from './MapMarker';

// const styles = require('./StoreLocator.scss');

const { MarkerWithLabel } = require('react-google-maps/lib/components/addons/MarkerWithLabel');

const openLocationWindow = storeAddress => {
  const baseUrl = 'https://www.google.com/maps/dir/?api=1';
  const origin = '&origin=';
  const destination = `&destination=${storeAddress}`;
  const mapURL = `${baseUrl}${origin}${destination}`;
  window.open(mapURL, '_blank');
};
const Map = ({
  mapData, zoom, position, open
}) => (
  <GoogleMap zoom={parseInt(zoom, 10) || 16} center={position}>
    {mapData.map((item, index) => (
      <MarkerWithLabel
        clickable
        onClick={() => {
          openLocationWindow(item.address);
        }}
        cursor="pointer"
        draggable
        position={item.position}
        containerElement={<div style={{ width: '400px' }} />}
        labelAnchor={new window.google.maps.Point(120, 0)}
        labelStyle={{ backgroundColor: 'white', fontSize: '14px', top: '30px' }}
        key={String(index)}
      >
        <div className="testtest">
          {open && (
            <div>
              <MapMarker store={item.store} address={item.address} phone={item.phone} position={item.position} />
            </div>
          )}
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
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${mapKey}&v=3.exp&libraries=geometry,drawing,places`,
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
