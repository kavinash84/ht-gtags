import React from 'react';
import PropTypes from 'prop-types';

const styles = require('./MapMarker.scss');
const storeStyle = require('./StoreLocator.scss');

const openLocationWindow = (position, currentLocation) => {
  const { lat = '', lng = '' } = currentLocation;
  const baseUrl = 'http://maps.google.com/?';
  const origin = `saddr=${lat},${lng}`;
  const destination = `&daddr=${position.lat}, ${position.lng}`;
  const mapURL = `${baseUrl}${origin}${destination}`;
  window.open(mapURL, '_blank');
};
const MapMarker = ({
 store, address, phone, position, currentLocation
}) => (
  <div>
    <div className={styles.mapMarker} style={{ top: `${position}` }}>
      <div>{store}</div>
      <div>{address}</div>
      <div>{phone}</div>
      <button
        onClick={() => {
          openLocationWindow(position, currentLocation);
        }}
        className={storeStyle.directionBtn}
      >
        Direction
      </button>
    </div>
  </div>
);
MapMarker.defaultProps = {
  currentLocation: {}
};
MapMarker.propTypes = {
  store: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  position: PropTypes.object.isRequired,
  currentLocation: PropTypes.object
};
export default MapMarker;
