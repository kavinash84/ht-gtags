import React from 'react';
import PropTypes from 'prop-types';
import Div from 'hometown-components/lib/Div';

const styles = require('./StoresCarousel.scss');

const StoresCarouselItem = ({ city }) => (
  <Div className={styles.catSliderItem}>
    <div className={styles.content}>
      <button className={styles.link}>{city}</button>
    </div>
  </Div>
);

StoresCarouselItem.propTypes = {
  city: PropTypes.string.isRequired
};

export default StoresCarouselItem;
