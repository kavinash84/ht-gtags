import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Section from 'hometown-components/lib/Section';
import Container from 'hometown-components/lib/Container';
import Title from 'components/Title';
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
            {data.map(item => (
              <div key={item.id}>
                <ProductCarouselItem
                  name={item.data.name}
                  price={item.netprice}
                  discPrice={item.cutprice}
                  saving={item.saving}
                  percentage={item.saving}
                  rating={item.data.reviews.rating}
                  image={item.images[0].zoom_image}
                  url={`/product-details/${item.data.sku}`}
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
