import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Box from 'hometown-components-dev/lib/BoxHtV1';
import ImageShimmer from 'hometown-components-dev/lib/ImageShimmerHtV1';
import Image from 'hometown-components-dev/lib/ImageHtV1';
import Text from 'hometown-components-dev/lib/TextHtV1';
import Heading from 'hometown-components-dev/lib/HeadingHtV1';

const wishListIcon = require('../../../static/wishListIcon.png');

const handleClick = (dispatcher, position = 0) => () => {
  dispatcher(position + 1);
};
const Product = props => {
  const {
 name, image, price, cutprice, imgHeight, position, setProductPosition, productURL
} = props;
  return (
    <Box>
      <Link onClick={handleClick(setProductPosition, position)} to={productURL}>
        <Box>
          <ImageShimmer src={image} height={imgHeight}>
            {imageURL => <Image alt={name} src={imageURL} width="100%" />}
          </ImageShimmer>
        </Box>
        <Box mt={10}>
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
            <Image alt={''} src={wishListIcon} width="51px" height="23px" />
          </Heading>
          <Box mb={6} textAlign="left">
            <Text as="span" fontSize={14} mr={10} color="heading" fontFamily="medium">
              ₹ {price}
            </Text>
            {price !== cutprice && (
              <Text as="span" fontSize={14} sx={{ textDecoration: 'line-through' }}>
                ₹ {cutprice}
              </Text>
            )}
          </Box>
        </Box>
      </Link>
    </Box>
  );
};

Product.defaultProps = {
  imgHeight: '240px'
};

Product.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  cutprice: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  imgHeight: PropTypes.string,
  position: PropTypes.string.isRequired,
  setProductPosition: PropTypes.func.isRequired,
  productURL: PropTypes.string.isRequired
};

export default Product;
