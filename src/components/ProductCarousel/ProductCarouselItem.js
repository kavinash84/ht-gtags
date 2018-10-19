import React from 'react';
import PropTypes from 'prop-types';
import Div from 'hometown-components/lib/Div';
import Span from 'hometown-components/lib/Span';
import Heading from 'hometown-components/lib/Heading';
import Rating from 'hometown-components/lib/Rating';
import ImageShimmer from 'hometown-components/lib/ImageShimmer';
import Img from 'hometown-components/lib/Img';
import Theme from 'hometown-components/lib/Theme';
import { Link } from 'react-router-dom';

const styles = require('./Slider.scss');

const judgeColor = rating => {
  if (!rating) {
    return '';
  }
  rating = parseInt(rating, 10);
  if (rating < 2) {
    return 'red';
  }
  if (rating >= 2 && rating < 3) {
    return 'yellow';
  }
  if (rating >= 3) {
    return 'green';
  }
};

const ProductItem = ({
  image, name, url, discPrice, price, rating, reviewsCount, percentage, height
}) => (
  <Div className={styles.prodSliderItem}>
    <Link className={styles.link} to={url}>
      <ImageShimmer src={image} height={height}>
        {imageURL => <Img alt={name} src={imageURL} width="100%" className={styles.prodImage} />}
      </ImageShimmer>
      <Div className={styles.content}>
        <Heading mb="2px" color={Theme.colors.text} fontFamily="regular" fontSize="0.9375rem" ta="center">
          {name}
        </Heading>

        <Div mb="0px" ta="center">
          <Span mr="0.3125rem" color={Theme.colors.text} fontSize="0.875em" fontFamily="regular">
            {' '}
            Rs. {discPrice || price}{' '}
          </Span>
          {discPrice && (
            <Span mr="0" fontSize="0.75em" fontFamily="regular">
              {' '}
              <s>Rs. {price}</s>
            </Span>
          )}
          {rating > 0 && (
            <Span ml="0.625rem">
              <Rating color={judgeColor(rating)} rating={parseFloat(rating).toFixed(1)}>
                ★ {rating}
              </Rating>
              <Span mr="0.625rem" fontSize="0.75rem" lh="1.7" va="text-top" color={Theme.colors.textExtraLight}>
                ({reviewsCount})
              </Span>
            </Span>
          )}
        </Div>
        <Div mb="0px" ta="center">
          {' '}
          {percentage && (
            <Span fontSize="0.75rem" fontFamily="regular">
              Savings
              <Span mr="0px" fontSize="0.75rem" border="none" fontFamily="regular" va="bottom">
                {' '}
                ({percentage}%)
              </Span>
            </Span>
          )}
        </Div>
      </Div>
    </Link>
  </Div>
);

ProductItem.defaultProps = {
  image: '',
  name: '',
  percentage: '',
  rating: 0,
  price: '',
  discPrice: '',
  reviewsCount: 0,
  height: 0
};

ProductItem.propTypes = {
  url: PropTypes.string.isRequired,
  discPrice: PropTypes.string,
  price: PropTypes.string,
  image: PropTypes.string,
  name: PropTypes.string,
  rating: PropTypes.number,
  reviewsCount: PropTypes.number,
  percentage: PropTypes.string,
  height: PropTypes.string
};

export default ProductItem;
