import React from 'react';
import PropTypes from 'prop-types';
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Image from 'hometown-components-dev/lib/ImageHtV1';

const BannerImage = ({ banner }) => (
  <Box>
    <Image
      sx={{
        height: '70vh',
        width: '100%',
        objectFit: 'cover'
      }}
      src={banner}
      alt="ht-exclusive-banner"
    />
  </Box>
);

BannerImage.propTypes = {
  banner: PropTypes.string.isRequired
};

export default BannerImage;
