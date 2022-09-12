import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/* ====== Components ====== */
import BoxHtV1 from 'hometown-components-dev/lib/BoxHtV1';
import Image from 'hometown-components-dev/lib/ImageHtV1';
// import Heading from 'hometown-components-dev/lib/HeadingHtV1';
// import Text from 'hometown-components-dev/lib/TextHtV1';
// import Rating from 'hometown-components-dev/lib/RatingHtV1';
// import ImageShimmer from 'hometown-components-dev/lib/ImageShimmer';

// const judgeColor = rating => {
//   if (!rating) {
//     return '';
//   }
//   rating = parseInt(rating, 10);
//   if (rating < 2) {
//     return '#dc3545';
//   }
//   if (rating >= 2 && rating < 3) {
//     return '#f5a623';
//   }
//   if (rating >= 3) {
//     return '#28a745';
//   }
// };

const ProductItem = ({
  image,
  name,
  url
  // discPrice,
  // price,
  // rating,
  // reviewsCount,
  // percentage
  // height
}) => (
  <BoxHtV1 variant="section.catSliderItem">
    <Link to={url}>
      {/* <ImageShimmer src={image} height={height}> */}
      {/* {imageURL => <Image alt={name} src={imageURL} width="100%" />} */}
      {/* </ImageShimmer> */}
      <Image alt={name} data-src={image} src={`${image}?blur=30`} width="100%" />
      {/* <BoxHtV1>
        <Heading>{name}</Heading>

        <BoxHtV1>
          <Text>Rs. {discPrice || price}</Text>
          {discPrice && (
            <Text as="span">
              <s>Rs. {price}</s>
            </Text>
          )} */}
      {/* {rating > 0 && ( */}
      {/* <Text>
            <Rating color={judgeColor(4)} rating={parseFloat(4).toFixed(1)}>
              ★ 4{rating}
            </Rating>
            <Text as="span">({reviewsCount})</Text>
          </Text> */}
      {/* )} */}
      {/* </BoxHtV1>
        <BoxHtV1>
          {percentage && (
            <Text>
              {' '}
              Savings <Text as="span">({percentage}%)</Text>
            </Text>
          )}
        </BoxHtV1>
      </BoxHtV1> */}
    </Link>
  </BoxHtV1>
);

ProductItem.defaultProps = {
  image: '',
  name: ''
  // percentage: '',
  // rating: 0,
  // price: '',
  // discPrice: '',
  // reviewsCount: 0
  // height: 0
};

ProductItem.propTypes = {
  url: PropTypes.string.isRequired,
  image: PropTypes.string,
  name: PropTypes.string
  // discPrice: PropTypes.string,
  // price: PropTypes.string,
  // rating: PropTypes.number,
  // reviewsCount: PropTypes.number,
  // percentage: PropTypes.string
  // height: PropTypes.string
};

export default ProductItem;
