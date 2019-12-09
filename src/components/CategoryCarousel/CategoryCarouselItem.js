import React from 'react';
import PropTypes from 'prop-types';
import Div from 'hometown-components-dev/lib/Div';
import ImageShimmer from 'hometown-components-dev/lib/ImageShimmer';
import { Link } from 'react-router-dom';

const styles = require('./Slider.scss');

const CategoryItem = ({ image, name, url }) => {
  if (url) {
    return (
      <Div className={styles.catSliderItem}>
        <Link className={styles.link} to={url || '/'}>
          <ImageShimmer src={image} height="283px">
            {imageURL => <img src={imageURL} alt={name} />}
          </ImageShimmer>
          <div className={styles.content} ta="center">
            <p className={styles.title}>{name}</p>
          </div>
        </Link>
      </Div>
    );
  }
  return (
    <Div className={styles.catSliderItem}>
      <ImageShimmer src={image} height="283px">
        {imageURL => <img src={imageURL} alt={name} />}
      </ImageShimmer>
      <div className={styles.content} ta="center">
        <p className={styles.title}>{name}</p>
      </div>
    </Div>
  );
};

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
