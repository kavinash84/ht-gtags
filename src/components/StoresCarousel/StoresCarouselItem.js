import React from 'react';
import PropTypes from 'prop-types';

const styles = require('./StoresCarousel.scss');

const StoresCarouselItem = ({ city }) => (
  <div className={styles.storeSliderItem}>
    <button className={styles.link}>{city}</button>
  </div>
);

StoresCarouselItem.propTypes = {
  city: PropTypes.string.isRequired
};

export default StoresCarouselItem;
