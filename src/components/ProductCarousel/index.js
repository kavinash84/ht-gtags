import React from 'react';
import PropTypes from 'prop-types';
import Section from 'hometown-components/lib/Section';
import Container from 'hometown-components/lib/Container';
import Title from 'components/Title';
import { formatAmount } from 'utils/formatters';
import { formatProductURL } from 'utils/helper';
import ProductCarouselItem from './ProductCarouselItem';
import SlickSlider from '../SlickSlider';

const adjustSlides = length => ({
  slidesToShow: length >= 4 ? 4 : length,
  slidesToScroll: 1
});

const ProductCarousel = ({ data, title, length }) => (
  <Section p="0" pt="0rem" mb="2.5rem" display="flex" className="prodCarousel">
    <Container pr="0" pl="0">
      <Title title={title} />
      <SlickSlider settings={adjustSlides(length)}>
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
              image={`${item.image}-product_500.jpg`}
              url={`/${formatProductURL(item.meta.name, item.meta.sku)}`}
            />
          </div>
        ))}
      </SlickSlider>
    </Container>
  </Section>
);

ProductCarousel.defaultProps = {
  data: [],
  title: '',
  length: 4
};

ProductCarousel.propTypes = {
  data: PropTypes.array,
  title: PropTypes.string,
  length: PropTypes.number
};

export default ProductCarousel;
