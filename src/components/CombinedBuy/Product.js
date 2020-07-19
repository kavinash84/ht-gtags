import React from 'react';
import PropTypes from 'prop-types';
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Heading from 'hometown-components-dev/lib/HeadingHtV1';
import ImageShimmer from 'hometown-components-dev/lib/ImageShimmerHtV1';
import Image from 'hometown-components-dev/lib/ImageHtV1';
import Text from 'hometown-components-dev/lib/TextHtV1';
import { Link } from 'react-router-dom';

const styles = require('./Slider.scss');

const ProductItem = ({
 image, name, url, discPrice, price, height
}) => (
  <Box padding="0 15px">
    <Link className={styles.link} to={url}>
      <ImageShimmer src={image} height={height} width="100%" sx={{ position: 'relative' }}>
        {imageURL => <Image alt={name} src={imageURL} width="100%" className={styles.prodImage} />}
      </ImageShimmer>
      <Box className={styles.content} mt={10}>
        <Heading
          pb={8}
          color="rgba(51, 51, 51, 0.85)"
          fontFamily="light"
          fontSize={14}
          textAlign="left"
          sx={{
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            overflow: 'hidden'
          }}
        >
          {name}
        </Heading>
        <Box mb={6}>
          <Text as="span" fontSize={14} mr={10} color="heading" fontFamily="medium">
            ₹ {discPrice || price}{' '}
          </Text>
          {discPrice && (
            <Text as="span" fontSize={14} sx={{ textDecoration: 'line-through' }}>
              ₹ {price}
            </Text>
          )}
        </Box>
      </Box>
    </Link>
  </Box>
);

ProductItem.defaultProps = {
  image: '',
  name: '',
  price: '',
  discPrice: '',
  height: 248
};

ProductItem.propTypes = {
  url: PropTypes.string.isRequired,
  discPrice: PropTypes.string,
  price: PropTypes.string,
  image: PropTypes.string,
  name: PropTypes.string,
  height: PropTypes.string
};

export default ProductItem;
