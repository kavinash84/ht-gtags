import React from 'react';
import PropTypes from 'prop-types';
import Div from 'hometown-components/lib/Div';
import { Link } from 'react-router-dom';

const styles = require('./Slider.scss');

const ProductItem = ({
  image, name, url, discPrice, price, rating, percentage
}) => (
  <Div className={styles.prodSliderItem}>
    <Link className={styles.link} to={url}>
      <img src={image} alt={name} />
      <div className={styles.content}>
        <p className={styles.title}>{name}</p>
        <div>
          <div className={`${styles.priceWrapper} taLeft`}>
            <span className={styles.discPrice}>Rs. {discPrice}</span>
            {price && <span className={styles.price}>Rs. {price}</span>}
            {percentage && <span className={styles.saving}>Saving ({percentage} %)</span>}
          </div>
          {rating !== 0 && <div className={styles.rating}>{rating}</div>}
        </div>
      </div>
    </Link>
  </Div>
);

ProductItem.defaultProps = {
  image: '',
  name: '',
  percentage: '',
  rating: ''
};

ProductItem.propTypes = {
  url: PropTypes.string.isRequired,
  discPrice: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  image: PropTypes.string,
  name: PropTypes.string,
  rating: PropTypes.number,
  percentage: PropTypes.string
};

export default ProductItem;
