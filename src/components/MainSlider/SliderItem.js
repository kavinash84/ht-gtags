import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Img from 'hometown-components/lib/img';

const SliderItem = ({ title, image, url }) => (
  <Link to={url}>
    <Img src={image} alt={title} width="100%" />
  </Link>
);

SliderItem.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
};

export default SliderItem;
