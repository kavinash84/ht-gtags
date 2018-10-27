import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Img from 'hometown-components/lib/Img';

/* TO DO Add ProgressiveImage */
const SliderItem = ({
  title, image, url, onClick
}) => (
  <Link to={url} onClick={onClick}>
    <Img src={image} alt={title} width="100%" />
  </Link>
);

SliderItem.defaultProps = {
  title: '',
  image: ''
};

SliderItem.propTypes = {
  title: PropTypes.string,
  image: PropTypes.string,
  url: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default SliderItem;
