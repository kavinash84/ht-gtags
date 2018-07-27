import React from 'react';
import PropTypes from 'prop-types';

const styles = require('./MapMarker.scss');

const MapMarker = ({
  store, address, phone, position
}) => (
  <div className={styles.mapMarker} style={{ top: `${position}` }}>
    <div>{store}</div>
    <div>{address}</div>
    <div>{phone}</div>
  </div>
);

MapMarker.propTypes = {
  store: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  position: PropTypes.object.isRequired
};
export default MapMarker;
