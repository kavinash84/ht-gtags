import React from 'react';
import PropTypes from 'prop-types';
import Div from 'hometown-components/lib/Div';
// import ReactImageZoom from 'react-image-zoom';
import ReactImageMagnify from 'react-image-magnify';

const styles = require('./Carousel.scss');

// const props = {
//   width: 571,
//   offset: { vertical: 0, horizontal: 0 },
//   zoomWidth: 600,
//   zoomStyle:
//     'left:50%;padding: 0;display: block !important;z-index: 100;
// box-shadow: 2px 2px 10px 0 rgba(0, 0, 0, 0.1);border: 1px solid #dddddd;',
//   zoomLensStyle: 'width:60px;height:50px;opacity: 0.5;background-color: gray;z-index:15;'
// };

const CategoryItem = ({ image }) => (
  <Div className={styles.pdSliderItem}>
    {/* <ReactImageZoom itemProp="image" {...props} img={image} /> */}
    <ReactImageMagnify
      {...{
        smallImage: {
          alt: '',
          isFluidWidth: true,
          src: image
        },
        largeImage: {
          src: image,
          width: 1100,
          height: 1100
        },
        enlargedImagePortalId: 'portal',
        enlargedImageContainerDimensions: {
          width: '100%',
          height: '100%'
        },
        enlargedImageStyle: {
          width: '200%',
          height: '200%'
        }
      }}
    />
  </Div>
);

CategoryItem.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

export default CategoryItem;
