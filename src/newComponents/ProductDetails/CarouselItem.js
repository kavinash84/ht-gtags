import React from 'react';
import PropTypes from 'prop-types';
import ReactImageMagnify from 'react-image-magnify';
import ImageHtV1 from 'hometown-components-dev/lib/ImageHtV1';
// import BoxHtV1 from 'hometown-components-dev/lib/BoxHtV1';
import ImageShimmerHtV1 from 'hometown-components-dev/lib/ImageShimmerHtV1';

const getLowResolution = url => url.replace('-zoom.jpg', '-product_500.jpg');
// const getHighResolution = url => url.replace('.jpg', '-zoom.jpg');

// const CategoryItem = ({ image, name }) => (
const CategoryItem = ({ name }) => (
  <ImageShimmerHtV1
    // src={getHighResolution(image)}
    height="545px"
    overflow="hidden"
  >
    {(imageURL, error) => {
      if (error) return <ImageHtV1 alt={name} src={imageURL} height="545px" />;
      return (
        <ReactImageMagnify
          {...{
            smallImage: {
              alt: name,
              isFluidWidth: true,
              src: getLowResolution(imageURL)
            },
            largeImage: {
              src: imageURL,
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
  </ImageShimmerHtV1>
);

CategoryItem.defaultProps = {
  name: ''
};

CategoryItem.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string
};

export default CategoryItem;
