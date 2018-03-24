import React from 'react';
import PropTypes from 'prop-types';

const CarouseItem = ({ title, img, titleStatus }) => (
  <div>
    <img src={img} alt={title} />
    <p className="title">{titleStatus === true ? title : ''}</p>
  </div>
);

CarouseItem.propTypes = {
  title: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  titleStatus: PropTypes.string.isRequired
};

export default CarouseItem;
