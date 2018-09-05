import React from 'react';
import PropTypes from 'prop-types';
// import ReactImageMagnify from 'react-image-magnify';
import Div from 'hometown-components/lib/Div';
import Img from 'hometown-components/lib/Img';
import ProgressiveImageSchemer from 'hometown-components/lib/ProgressiveImageSchemer';

const styles = require('./Carousel.scss');

// const getLowResolution = url => url.replace('.jpg', '-product_500.jpg');

const CategoryItem = ({ image, name }) => (
  <Div className={styles.pdSliderItem}>
    <ProgressiveImageSchemer src={image} height="607px">
      {imageURL => <Img src={imageURL} alt={name} />}
    </ProgressiveImageSchemer>
    {/* <ReactImageMagnify
      {...{
        smallImage: {
          alt: name,
          isFluidWidth: true,
          src: getLowResolution(image)
        },
        largeImage: {
          src: image,
          alt: name,
          width: 1100,
          height: 1100
        },
        enlargedImagePortalId: 'portal',
        enlargedImageContainerDimensions: {
          width: '100%',
          height: '100%'
        }
      }} */}
    />
  </Div>
);

CategoryItem.defaultProps = {
  name: ''
};

CategoryItem.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string
};

export default CategoryItem;
