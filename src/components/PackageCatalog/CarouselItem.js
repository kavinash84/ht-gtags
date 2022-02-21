import React from 'react';
import PropTypes from 'prop-types';

import Image from 'hometown-components-dev/lib/ImageHtV1';
// import BoxHtV1 from 'hometown-components-dev/lib/BoxHtV1';
import ImageShimmer from 'hometown-components-dev/lib/ImageShimmerHtV1';


const CarouselItem = ({ image, name}) => (
  <ImageShimmer src={image} height={[300, 300, 400, 545]} overflow="hidden">
    {(imageURL, error) => {
      if (error) return <Image alt={name} src={imageURL} height={[300, 300, 400, 545]} />;
      return (
        <Image src={image} alt={name} style={{width: '500px', height: '500px'}}/>
      );
    }}
  </ImageShimmer>
);

CarouselItem.defaultProps = {
  name: ''
};

CarouselItem.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string
};

export default CarouselItem;
