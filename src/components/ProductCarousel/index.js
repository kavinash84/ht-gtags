import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Section from 'hometown-components/lib/Section';
import Container from 'hometown-components/lib/Container';
import Title from 'components/Title';
import ProductCarouselItem from './ProductCarouselItem';
import SlickSlider from '../SlickSlider';

const adjustSlides = length => ({
  slidesToShow: length >= 4 ? 4 : length,
  slidesToScroll: 3
});

export default class ProductCarousel extends Component {
  render() {
    const { data, title } = this.props;
    return (
      <Section p="0" pt="2.5rem" mb="0.5rem" className="prodCarousel">
        <Container pr="0" pl="0">
          <Title title={title} />
          <SlickSlider settings={adjustSlides(data.length)}>
            {data.map(item => (
              <div key={item.id}>
                <ProductCarouselItem
                  name={item.name}
                  price={item.price}
                  discPrice={item.disc_price}
                  saving={item.saving}
                  percentage={item.percentage}
                  rating={item.rating}
                  image={item.image}
                  url={item.url}
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
  title: ''
};

ProductCarousel.propTypes = {
  data: PropTypes.array,
  title: PropTypes.string
};
