import React from 'react';
import PropTypes from 'prop-types';
import Div from 'hometown-components/lib/Div';
import { Link } from 'react-router-dom';

const styles = require('./Slider.scss');

const ProductItem = ({
  image, name, url, discPrice, price, percentage, rating, saving
}) => (
  <Div className={styles.prodSliderItem}>
    <Link className={styles.link} to={url}>
      <img src={image} alt={name} />
      <div className={styles.content}>
        <p className={styles.title}>{name}</p>
        <div>
          <div className={`${styles.priceWrapper} taLeft`}>
            <span className={styles.discPrice}>Rs. {discPrice}</span>
            <span className={styles.price}>{price}</span>
            <span className={styles.saving}>
              Saving {saving} ({percentage})
            </span>
          </div>
          <div className={styles.rating}>{rating}</div>
        </div>
      </div>
    </Link>
  </Div>
);

ProductItem.defaultProps = {
  image: '',
  name: ''
};

ProductItem.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  url: PropTypes.string.isRequired,
  discPrice: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  percentage: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  saving: PropTypes.string.isRequired
};

export default ProductItem;
