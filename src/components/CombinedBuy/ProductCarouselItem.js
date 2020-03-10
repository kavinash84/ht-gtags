import React from 'react';
import PropTypes from 'prop-types';
import BoxHtV1 from 'hometown-components-dev/lib/BoxHtV1';
import HeadingHtV1 from 'hometown-components-dev/lib/HeadingHtV1';
import ImageShimmerHtV1 from 'hometown-components-dev/lib/ImageShimmerHtV1';
import ImageHtV1 from 'hometown-components-dev/lib/ImageHtV1';
import { Link } from 'react-router-dom';

const styles = require('./Slider.scss');

const ProductCarouselItem = ({
 image, name, url, discPrice, price, height
}) => (
  <BoxHtV1 col="11" className={styles.combineItem} padding="0 15px">
    <Link className={styles.link} to={url}>
      <ImageShimmerHtV1 src={image} height={height}>
        {imageURL => <ImageHtV1 alt={name} src={imageURL} width="100%" className={styles.prodImage} />}
      </ImageShimmerHtV1>
      <BoxHtV1 className={styles.content}>
        <HeadingHtV1 mb={4} color="rgba(51, 51, 51, 0.85)" fontFamily="light" fontSize="0.875rem" textAlign="left">
          {name}
        </HeadingHtV1>
        <BoxHtV1 mb={0} textAlign="left">
          <BoxHtV1 mr="0.3125rem" color="rgba(51, 51, 51, 0.85)" fontSize="0.875rem" fontFamily="medium">
            {' '}
            Rs. {discPrice || price}{' '}
          </BoxHtV1>
          {discPrice && (
            <BoxHtV1 mr={0} fontSize="0.75em" fontFamily="regular">
              {' '}
              <s>Rs. {price}</s>
            </BoxHtV1>
          )}
        </BoxHtV1>
      </BoxHtV1>
    </Link>
  </BoxHtV1>
);

ProductCarouselItem.defaultProps = {
  image: '',
  name: '',
  price: '',
  discPrice: '',
  height: 0
};

ProductCarouselItem.propTypes = {
  url: PropTypes.string.isRequired,
  discPrice: PropTypes.string,
  price: PropTypes.string,
  image: PropTypes.string,
  name: PropTypes.string,
  height: PropTypes.string
};

export default ProductCarouselItem;
