import React from 'react';
import PropTypes from 'prop-types';

const styles = require('./MapMarker.scss');
const storeStyle = require('./StoreLocator.scss');

const MapMarker = ({
  store, address, phone, position
}) => (
  <div>
    <div className={styles.mapMarker} style={{ top: `${position}` }}>
      <div>{store}</div>
      <div>{address}</div>
      <div>{phone}</div>
      <div>
        <button className={storeStyle.directionBtn}>Direction</button>
      </div>
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
