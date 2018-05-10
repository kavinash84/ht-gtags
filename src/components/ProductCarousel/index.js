import React from 'react';
import PropTypes from 'prop-types';
import ProductCarouselContainer from 'hometown-components/lib/ProductCarousel';

// const styles = require('./ProductCarousel.scss');

const ProductCarousel = ({ data, categoryName }) => (
  <section>
    <div className="head">
      <div className="container">
        <div className="title">
          <h4>{categoryName}</h4>
        </div>
      </div>
    </div>
    <ProductCarouselContainer itemData={data} />
  </section>
);

ProductCarousel.defaultProps = {
  data: [],
  categoryName: ''
};

ProductCarousel.propTypes = {
  data: PropTypes.array,
  categoryName: PropTypes.string
};

export default ProductCarousel;
