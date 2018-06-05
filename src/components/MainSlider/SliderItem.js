import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const SliderItem = ({ title, image, url }) => (
  <Link to={url}>
    <img src={image} alt={title} />
  </Link>
);

SliderItem.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
};

export default SliderItem;
