import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Img from 'hometown-components/lib/Img';

/* TO DO Add ProgressiveImage */
const SliderItem = ({
  title, image, url, onClick, target
}) => {
  if (target) {
    return (
      <a href={url} title={title} target={target} rel="noopener noreferrer" onClick={onClick}>
        <Img src={image} alt={title} width="100%" />
      </a>
    );
  }
  return (
    <Link to={url} onClick={onClick}>
      <Img src={image} alt={title} width="100%" />
    </Link>
  );
};

SliderItem.defaultProps = {
  title: '',
  image: '',
  target: ''
};

SliderItem.propTypes = {
  title: PropTypes.string,
  image: PropTypes.string,
  url: PropTypes.string.isRequired,
  target: PropTypes.string,
  onClick: PropTypes.func.isRequired
};

export default SliderItem;
