import React from 'react';
import PropTypes from 'prop-types';
import Div from 'hometown-components/lib/Div';
import ImageShimmer from 'hometown-components/lib/ImageShimmer';
import { Link } from 'react-router-dom';

const styles = require('./Slider.scss');

const CategoryItem = ({ image, name, url }) => (
  <Div className={styles.catSliderItem}>
    <Link className={styles.link} to={url || '/'}>
      <ImageShimmer src={image} height="192px">
        {imageURL => <img src={imageURL} alt={name} />}
      </ImageShimmer>
      <div className={styles.content}>
        <p className={styles.title}>{name}</p>
      </div>
    </Link>
  </Div>
);

CategoryItem.defaultProps = {
  image: '',
  name: '',
  url: ''
};

CategoryItem.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  url: PropTypes.string
};

export default CategoryItem;
