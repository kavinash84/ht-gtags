import React from 'react';
import PropTypes from 'prop-types';
import Div from 'hometown-components-dev/lib/Div';
import Span from 'hometown-components-dev/lib/Span';
import Heading from 'hometown-components-dev/lib/Heading';
import ImageShimmer from 'hometown-components-dev/lib/ImageShimmer';
import Img from 'hometown-components-dev/lib/Img';
import Theme from 'hometown-components-dev/lib/Theme';
import { Link } from 'react-router-dom';

const styles = require('./Slider.scss');

const ProductItem = ({
 image, name, url, discPrice, price, height
}) => (
  <Div col="11" className={styles.combineItem} p="0 15px">
    <Link className={styles.link} to={url}>
      <ImageShimmer src={image} height={height}>
        {imageURL => <Img alt={name} src={imageURL} width="100%" className={styles.prodImage} />}
      </ImageShimmer>
      <Div className={styles.content}>
        <Heading mb="4px" color={Theme.colors.text} fontFamily="light" fontSize="0.875rem" ta="left">
          {name}
        </Heading>
        <Div mb="0px" ta="left">
          <Span mr="0.3125rem" color={Theme.colors.text} fontSize="0.875rem" fontFamily="medium">
            {' '}
            Rs. {discPrice || price}{' '}
          </Span>
          {discPrice && (
            <Span mr="0" fontSize="0.75em" fontFamily="regular">
              {' '}
              <s>Rs. {price}</s>
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
  price: '',
  discPrice: '',
  height: 0
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
