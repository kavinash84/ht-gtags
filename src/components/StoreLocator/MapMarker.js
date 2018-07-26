import React from 'react';
import PropTypes from 'prop-types';

const MapMarker = ({ store, address, phone }) => (
  <div>
    <div>
      <div>{store}</div>
      <div>{address}</div>
      <div>{phone}</div>
    </div>
  </div>
);

MapMarker.propTypes = {
  store: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired
};
export default MapMarker;
