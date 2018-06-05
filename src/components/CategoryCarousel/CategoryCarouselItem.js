import React from 'react';
import PropTypes from 'prop-types';
import Div from 'hometown-components/lib/Div';
import { Link } from 'react-router-dom';

const styles = require('./Slider.scss');

const CategoryItem = ({ image, name, url }) => (
  <Div className={styles.catSliderItem}>
    <Link className={styles.link} to={url}>
      <img src={image} alt={name} />
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
