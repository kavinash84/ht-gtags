import React from 'react';
import PropTypes from 'prop-types';
import Div from 'hometown-components/lib/Div';
import ReactImageMagnify from 'react-image-magnify';

const styles = require('./Carousel.scss');

const getLowResolution = url => url.replace('.jpg', '-product_500.jpg');

const CategoryItem = ({ image }) => (
  <Div className={styles.pdSliderItem}>
    <ReactImageMagnify
      {...{
        smallImage: {
          alt: '',
          isFluidWidth: true,
          src: getLowResolution(image)
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
