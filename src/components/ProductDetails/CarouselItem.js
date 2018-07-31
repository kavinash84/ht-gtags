import React from 'react';
import PropTypes from 'prop-types';
import Div from 'hometown-components/lib/Div';

const styles = require('./Carousel.scss');

const CategoryItem = ({ image, name }) => (
  <Div className={styles.pdSliderItem}>
    <img itemProp="image" src={image} alt={name} />
  </Div>
);

CategoryItem.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

export default CategoryItem;
