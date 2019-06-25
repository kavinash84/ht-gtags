import React from 'react';
import PropTypes from 'prop-types';
import ReactImageMagnify from 'react-image-magnify';
import Img from 'hometown-components/lib/Img';
import ImageShimmer from 'hometown-components/lib/ImageShimmer';

const getLowResolution = url => url.replace('.jpg', '-product_500.jpg');
const getHighResolution = url => url.replace('.jpg', '-zoom.jpg');

const CategoryItem = ({ image, name }) => (
  <ImageShimmer src={image} height="545px" overflow="hidden">
    {(imageURL, error) => {
      if (error) return <Img alt={name} src={imageURL} height="545px" />;
      return (
        <ReactImageMagnify
          {...{
            smallImage: {
              alt: name,
              isFluidWidth: true,
              src: getLowResolution(imageURL)
            },
            largeImage: {
              src: getHighResolution(imageURL),
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
    }}
  </ImageShimmer>
);

CategoryItem.defaultProps = {
  name: ''
};

CategoryItem.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string
};

export default CategoryItem;
