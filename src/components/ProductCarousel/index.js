import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Section from 'hometown-components/lib/Section';
import Container from 'hometown-components/lib/Container';
import Title from 'components/Title';
import { formatAmount } from 'utils/formatters';
import ProductCarouselItem from './ProductCarouselItem';
import SlickSlider from '../SlickSlider';

const adjustSlides = length => ({
  slidesToShow: length >= 4 ? 4 : length,
  slidesToScroll: 1
});

export default class ProductCarousel extends Component {
  render() {
    const { data, title, length } = this.props;
    return (
      <Section p="0" pt="0rem" mb="0.5rem" display="flex" className="prodCarousel">
        <Container pr="0" pl="0">
          <Title title={title} />
          <SlickSlider settings={adjustSlides(length)}>
            {data.map((item, index) => (
              <div key={String(index)}>
                <ProductCarouselItem
                  name={item.meta.name}
                  price={item.meta.max_special_price && formatAmount(item.meta.max_special_price)}
                  discPrice={formatAmount(item.meta.price)}
                  saving={item.meta.max_saving_percentage}
                  percentage={item.meta.max_saving_percentage}
                  rating={item.reviews.rating}
                  image={`${item.image}-product_500.jpg`}
                  url={`/${item.meta.name}/sku/${item.meta.sku}`}
                />
              </div>
            ))}
          </SlickSlider>
        </Container>
      </Section>
    );
  }
}

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
