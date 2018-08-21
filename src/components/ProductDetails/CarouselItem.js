import React from 'react';
import PropTypes from 'prop-types';
import Div from 'hometown-components/lib/Div';
import ReactImageZoom from 'react-image-zoom';

const styles = require('./Carousel.scss');

const props = {
  width: 571,
  offset: { vertical: 0, horizontal: 0 },
  zoomWidth: 600,
  zoomStyle:
    'left:50%;padding: 0;z-index: 100;box-shadow: 2px 2px 10px 0 rgba(0, 0, 0, 0.1);border: 1px solid #dddddd;',
  zoomLensStyle: 'width:60px;height:50px;opacity: 0.5;background-color: gray;z-index:15;'
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
