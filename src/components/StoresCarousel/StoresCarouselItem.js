import React from 'react';
import PropTypes from 'prop-types';
import Div from 'hometown-components/lib/Div';
import { Link } from 'react-router-dom';

const styles = require('./StoresCarousel.scss');

const CategoryItem = ({ name, url }) => (
  <Div className={styles.catSliderItem}>
    <Link className={styles.link} to={url}>
      <div className={styles.content}>
        <button className={styles.link}>{name}</button>
      </div>
    </Link>
  </Div>
);

CategoryItem.propTypes = {
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
};

export default CategoryItem;
