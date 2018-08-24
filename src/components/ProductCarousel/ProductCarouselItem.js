import React from 'react';
import PropTypes from 'prop-types';
import Div from 'hometown-components/lib/Div';
import Span from 'hometown-components/lib/Span';
import Heading from 'hometown-components/lib/Heading';
import Rating from 'hometown-components/lib/Rating';
import ProgressiveImageSchemer from 'hometown-components/lib/ProgressiveImageSchemer';
import Img from 'hometown-components/lib/Img';
import Theme from 'hometown-components/lib/Theme';
import { Link } from 'react-router-dom';

const styles = require('./Slider.scss');

const ProductItem = ({
  image, name, url, discPrice, price, rating, percentage
}) => (
  <Div className={styles.prodSliderItem}>
    <Link className={styles.link} to={url}>
      <ProgressiveImageSchemer src={image} height="263px">
        {imageURL => <Img alt={name} src={imageURL} width="100%" className={styles.prodImage} />}
      </ProgressiveImageSchemer>
      <div className={styles.content}>
        <Heading mb="5px" color={Theme.colors.text} fontFamily="medium" fontSize="0.9375em" ta="center">
          {name}
        </Heading>

        <Div mb="0px" ta="center">
          <Span mr="0.625rem" color={Theme.colors.text} fontSize="0.875em" fontFamily="medium">
            {' '}
            Rs. {price}{' '}
          </Span>
          {discPrice && (
            <Span mr="0" fontSize="0.75em" fontFamily="medium">
              {' '}
              <s>Rs. {discPrice}</s>
            </Span>
          )}
          {rating > 0 && (
            <Span ml="0.625rem">
              <Rating rating={rating}> ★{Number(rating).toFixed(1)} </Rating>
              <Span mr="0.625rem" fontSize="0.75rem" lh="1.7" va="text-top" color={Theme.colors.textExtraLight}>
                ({Number(rating).toFixed(1)})
              </Span>
            </Span>
          )}
        </Div>
        <Div mb="0px" ta="center">
          {' '}
          {percentage && (
            <Span fontSize="0.75rem" fontFamily="medium">
              Savings
              <Span mr="0px" fontSize="0.75rem" border="none" fontFamily="medium">
                {' '}
                ({percentage}%)
              </Span>
            </Span>
          )}
        </Div>
      </div>
    </Link>
  </Div>
);

ProductItem.defaultProps = {
  image: '',
  name: '',
  percentage: '',
  rating: '',
  price: '',
  discPrice: ''
};

ProductItem.propTypes = {
  url: PropTypes.string.isRequired,
  discPrice: PropTypes.string,
  price: PropTypes.string,
  image: PropTypes.string,
  name: PropTypes.string,
  rating: PropTypes.number,
  percentage: PropTypes.string
};

export default ProductItem;
