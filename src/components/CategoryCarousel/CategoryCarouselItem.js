import React from 'react';
import PropTypes from 'prop-types';
import Div from 'hometown-components/lib/Div';
import ProgressiveImageSchemer from 'hometown-components/lib/ProgressiveImageSchemer';
import { Link } from 'react-router-dom';

const styles = require('./Slider.scss');

const CategoryItem = ({ image, name, url }) => (
  <Div className={styles.catSliderItem}>
    <Link className={styles.link} to={url}>
      <ProgressiveImageSchemer src={image} height="190px">
        {imageURL => <img src={imageURL} alt={name} />}
      </ProgressiveImageSchemer>
      <div className={styles.content}>
        <p className={styles.title}>{name}</p>
      </div>
    </Link>
  </Div>
);

CategoryItem.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
};

export default CategoryItem;
