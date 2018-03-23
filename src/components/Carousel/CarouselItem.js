import React from 'react';
import PropTypes from 'prop-types';

const CarouseItem = ({ title, img }) => (
  <div>
    <img src={img} alt={title} />
  </div>
);

CarouseItem.propTypes = {
  title: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired
};

export default CarouseItem;
