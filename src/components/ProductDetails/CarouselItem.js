import React from 'react';
import PropTypes from 'prop-types';
import Div from 'hometown-components/lib/Div';
import Img from 'hometown-components/lib/Img';
import ProgressiveImageSchemer from 'hometown-components/lib/ProgressiveImageSchemer';
// import ReactImageMagnify from 'react-image-magnify';

const styles = require('./Carousel.scss');

// const getLowResolution = url => url.replace('.jpg', '-product_500.jpg');

const CategoryItem = ({ image }) => (
  <Div className={styles.pdSliderItem}>
    <ProgressiveImageSchemer src={image} height="607px">
      {imageURL => <Img src={imageURL} alt="" />}
    </ProgressiveImageSchemer>
    {/* <ReactImageMagnify
      {...{
        smallImage: {
          alt: '',
          isFluidWidth: true,
          src: getLowResolution(image)
        },
        largeImage: {
          src: image,
          width: 800,
          height: 800
        },
        enlargedImagePortalId: 'portal',
        enlargedImageContainerDimensions: {
          width: '75%',
          height: '75%'
        }
      }}
    /> */}
  </Div>
);

CategoryItem.propTypes = {
  image: PropTypes.string.isRequired
  // name: PropTypes.string.isRequired
};

export default CategoryItem;
