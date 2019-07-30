import React from 'react';
import PropTypes from 'prop-types';

const styles = require('./MapMarker.scss');
const storeStyle = require('./StoreLocator.scss');

const openLocationWindow = position => {
  const baseUrl = 'http://maps.google.com/?';
  const origin = 'saddr=';
  const destination = `&daddr=${position.lat}, ${position.lng}`;
  const mapURL = `${baseUrl}${origin}${destination}`;
  window.open(mapURL, '_blank');
};
const MapMarker = ({
  store, address, phone, position
}) => (
  <div>
    <div className={styles.mapMarker} style={{ top: `${position}` }}>
      <div>{store}</div>
      <div>{address}</div>
      <div>{phone}</div>
      <button
        onClick={() => {
          openLocationWindow(position);
        }}
        className={storeStyle.directionBtn}
      >
        Direction
      </button>
    </div>
  </div>
);

MapMarker.propTypes = {
  store: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  position: PropTypes.object.isRequired
};
export default MapMarker;
