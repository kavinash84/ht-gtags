import React from 'react';
import PropTypes from 'prop-types';
import ReactImageMagnify from 'react-image-magnify';

const getLowResolution = url => url.replace('.jpg', '-product_500.jpg');

const CategoryItem = ({ image, name }) => (
  <ReactImageMagnify
    {...{
      smallImage: {
        alt: name,
        isFluidWidth: true,
        src: getLowResolution(image)
      },
      largeImage: {
        src: image,
        alt: name,
        width: 800,
        height: 800
      },
      enlargedImagePortalId: 'portal',
      enlargedImageContainerDimensions: {
        width: '75%',
        height: '75%'
      },
      enlargedImageContainerClassName: 'enlarge'
    }}
  />
);

CategoryItem.defaultProps = {
  name: ''
};

CategoryItem.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string
};

export default CategoryItem;
