import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import BoxHtV1 from 'hometown-components-dev/lib/BoxHtV1';
import ImageHtV1 from 'hometown-components-dev/lib/ImageHtV1';

const CategoryItem = ({ image, url }) => (
  <BoxHtV1 variant="section.catSliderItem">
    <Link to={url || '/'}>{image && <ImageHtV1 src={image} alt="" />}</Link>
  </BoxHtV1>
);

CategoryItem.defaultProps = {
  image: '',
  url: ''
};

CategoryItem.propTypes = {
  image: PropTypes.string,
  url: PropTypes.string
};

export default CategoryItem;
