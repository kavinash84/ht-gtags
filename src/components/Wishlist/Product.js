import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Box from 'hometown-components-dev/lib/BoxHtV1';
import ImageShimmer from 'hometown-components-dev/lib/ImageShimmerHtV1';
import Image from 'hometown-components-dev/lib/ImageHtV1';
import Text from 'hometown-components-dev/lib/TextHtV1';
import Heading from 'hometown-components-dev/lib/HeadingHtV1';
import WishlistBtn from 'hometown-components-dev/lib/WishlistButtonHtV1';

import truck from '../../static/truck.svg';

const wishListIcon = require('../../../static/wishListIcon.png');

const handleClick = (dispatcher, position = 0) => () => {
  dispatcher(position + 1);
};
const Product = props => {
  const {
    name,
    image,
    price,
    cutprice,
    imgHeight,
    position,
    setProductPosition,
    productURL,
    deliveredBy,
    pincode,
    sku,
    onClick,
    isWishList,
    skuLoading,
    simpleSku
  } = props;
  return (
    <Box variant="col-12">
      <WishlistBtn onClick={onClick(sku, simpleSku)} isWishList={isWishList} wishlistLoading={skuLoading} />
      <Link onClick={handleClick(setProductPosition, position)} to={productURL}>
        <Box>
          <ImageShimmer src={image} height={imgHeight}>
            {imageURL => <Image alt={name} src={imageURL} width="100%" />}
          </ImageShimmer>
        </Box>
        <Box>
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
            {/* <Image alt={''} src={wishListIcon} width="51px" height="23px" /> */}
          </Heading>
          <Box mb={6} textAlign="left">
            <Text as="span" fontSize={14} mr={10} color="heading" fontFamily="medium">
              ₹ {price}
            </Text>
            {cutprice && price !== cutprice && (
              <Text as="span" fontSize={14} sx={{ textDecoration: 'line-through' }}>
                ₹ {cutprice}
              </Text>
            )}
            {deliveredBy && (
              <Box sx={{ display: 'flex' }} mt="8px">
                {/* <Text
              lh="0.1"
              fontFamily="regular"
              fontSize-
            >
              {deliveredBy.indexOf('Currently') !== 0 && <Image
                width="initial"
                height="18px"
                mr="0.5rem"
                position="relative"
                top="4px"
                display="inline-block"
                float="none"
                src={truck}
              />}
              {pincode && deliveredBy ? deliveredBy : ''}
            </Text> */}
                {deliveredBy.indexOf('Currently') !== 0 && (
                  <Image
                    width="initial"
                    height="18px"
                    mr="0.5rem"
                    position="relative"
                    top="4px"
                    display="inline-block"
                    float="none"
                    src={truck}
                  />
                )}
                <Text
                  // lh="0.1"
                  fontFamily="regular"
                  fontSize="13px"
                  mt="3px"
                >
                  {pincode && deliveredBy ? deliveredBy : ''}
                </Text>
              </Box>
            )}
          </Box>
        </Box>
      </Link>
    </Box>
  );
};

Product.defaultProps = {
  imgHeight: '240px',
  pincode: null,
  sku: '',
  onClick: () => {},
  isWishList: true,
  skuLoading: true,
  simpleSku: null
};

Product.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  cutprice: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  imgHeight: PropTypes.string,
  position: PropTypes.string.isRequired,
  setProductPosition: PropTypes.func.isRequired,
  productURL: PropTypes.string.isRequired,
  deliveredBy: PropTypes.string.isRequired,
  pincode: PropTypes.string,
  sku: PropTypes.any,
  onClick: PropTypes.func,
  isWishList: PropTypes.bool,
  skuLoading: PropTypes.bool,
  simpleSku: PropTypes.any
};

export default Product;
