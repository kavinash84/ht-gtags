import React from 'react';
import PropTypes from 'prop-types';

const styles = require('./Stores.scss');

const StoreCarouselItem = ({ name }) => (
  <div className={styles.storeSliderItem}>
    <button className={styles.link}>{name}</button>
  </div>
);

StoreCarouselItem.defaultProps = {
  name: ''
};

StoreCarouselItem.propTypes = {
  name: PropTypes.string
};

export default StoreCarouselItem;
