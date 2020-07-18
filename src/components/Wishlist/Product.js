import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Box from 'hometown-components-dev/lib/BoxHtV1';
import ImageShimmer from 'hometown-components-dev/lib/ImageShimmerHtV1';
import Image from 'hometown-components-dev/lib/ImageHtV1';
import Text from 'hometown-components-dev/lib/TextHtV1';

const wishListIcon = require('../../../static/wishListIcon.png');

const handleClick = (dispatcher, position = 0) => () => {
  dispatcher(position + 1);
};
const Product = props => {
  const {
 name, image, price, cutprice, imgHeight, position, setProductPosition, productURL
} = props;
  return (
    <Box variant="col-12">
      <Link onClick={handleClick(setProductPosition, position)} to={productURL}>
        <Box>
          <ImageShimmer src={image} height={imgHeight}>
            {imageURL => <Image alt={name} src={imageURL} width="100%" />}
          </ImageShimmer>
        </Box>
        <Box p="0.25rem 0.3125rem 0.25rem" sx={{ display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Text
              textAlign="left"
              sx={{
                fontFamily: 'HelveticaNeue',
                fontSize: '18px',
                fontWeight: '500',
                color: '#000000'
              }}
            >
              {name}
            </Text>
            <Image alt={''} src={wishListIcon} width="51px" height="23px" />
          </Box>
          <Box mb="2px" textAlign="left" sx={{ display: 'flex' }} pt={10}>
            <Text
              mr="5px"
              sx={{
                fontFamily: 'HelveticaNeue',
                fontSize: '17px',
                fontWeight: '500',
                color: '#cc1e05'
              }}
            >
              {price}
            </Text>
            {price !== cutprice && (
              <Text
                mr="0"
                sx={{
                  fontFamily: 'HelveticaNeue',
                  fontSize: '17px',
                  color: '#da0202'
                }}
              >
                <s>{cutprice}</s>
              </Text>
            )}
          </Box>
        </Box>
      </Link>
    </Box>
  );
};
Product.defaultProps = {
  imgHeight: '270px'
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
