import React from 'react';
import PropTypes from 'prop-types';
import Div from 'hometown-components/lib/Div';
import ReactImageZoom from 'react-image-zoom';

const styles = require('./Carousel.scss');

const props = {
  width: 376,
  height: 376,
  scale: 1.5,
  offset: { vertical: 0, horizontal: 10 },
  zoomStyle:
    'left: 102%;width: 600px;height: 600px;padding: 0;box-shadow: 2px 2px 10px 0 rgba(0, 0, 0, 0.1);z-index: 1;',
  zoomLensStyle: 'opacity: 0.5;background-color: gray;z-index:2;'
};

const CategoryItem = ({ image }) => (
  <Div className={styles.pdSliderItem}>
    <ReactImageZoom itemProp="image" {...props} img={image} />
  </Div>
);

CategoryItem.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

export default CategoryItem;
