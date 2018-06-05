import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const SliderItem = ({
  id, title, image, url
}) => (
  <div>
    <Link to={url} key={id}>
      <img src={image} alt={title} />
    </Link>
  </div>
);

SliderItem.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
};

export default SliderItem;
