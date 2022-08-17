import React from 'react';
import PropTypes from 'prop-types';

/* ====== Helpers / Formatters ====== */
import { formatAmount } from 'utils/formatters';
import { formatProductURL } from 'utils/helper';

/* ====== Components ====== */
import Box from 'hometown-components-dev/lib/BoxHtV1';

/* ====== Page Components ====== */
import Title from 'components/Title';

import ProductCarouselItem from './ProductCarouselItem';
import SlickSlider from '../SlickSlider';

const adjustSlides = length => ({
  slidesToShow: length >= 4 ? 4 : 4,
  slidesToScroll: length === 1 ? 0 : 1,
  infinite: !(length < 4)
});

const ProductCarousel = ({
  data,
  title,
  length
  // height
}) => (
  <Box width={1}>
    <Title title={title} />
    <SlickSlider settings={adjustSlides(length)} className="recommendedSlider">
      {data.map((item, index) => (
        <div key={String(index)}>
          <ProductCarouselItem
            name={item.meta.name}
            discPrice={item.meta.max_special_price && formatAmount(item.meta.max_special_price)}
            price={formatAmount(item.meta.price)}
            saving={item.meta.max_saving_percentage}
            percentage={item.meta.max_saving_percentage}
            rating={item.reviews.rating}
            reviewsCount={item.reviews.count}
            image={`${item.image}.jpg`}
            url={`${formatProductURL(item.meta.name, item.meta.sku)}`}
            // height={height}
          />
        </div>
      ))}
    </SlickSlider>
  </Box>
);

ProductCarousel.defaultProps = {
  data: [],
  title: '',
  length: 4
  // height: '281px'
};

ProductCarousel.propTypes = {
  data: PropTypes.array,
  title: PropTypes.string,
  length: PropTypes.number
  // height: PropTypes.string
};

export default ProductCarousel;
