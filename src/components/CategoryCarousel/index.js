import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Section from 'hometown-components/lib/Section';
import Container from 'hometown-components/lib/Container';
import Title from 'components/Title';
import CategoryCarouselItem from './CategoryCarouselItem';
import SlickSlider from '../SlickSlider';

const adjustSlides = length => ({
  slidesToShow: length >= 4 ? 4 : length,
  slidesToScroll: 3,
  autoplaySpeed: 5000
});

const OFFER_ID = 5;
export default class CategoryCarousel extends Component {
  render() {
    const {
      data, categoryName, subTitle, id
    } = this.props;
    return (
      <Section p="0" pt="1.5rem" mb="0" className="catCarousel">
        <Container pr="0" pl="0">
          <Title title={categoryName} subTitle={subTitle} />
          <SlickSlider settings={adjustSlides(data.length)}>
            {data.map(slide => (
              <div key={slide.category_id}>
                <CategoryCarouselItem
                  image={slide.image_url}
                  name={slide.info.name}
                  url={OFFER_ID === id || OFFER_ID === parseInt(id, 10) ? '' : slide.info.url_key}
                />
              </div>
            ))}
          </SlickSlider>
        </Container>
      </Section>
    );
  }
}

CategoryCarousel.defaultProps = {
  data: [],
  categoryName: '',
  subTitle: '',
  id: ''
};

CategoryCarousel.propTypes = {
  data: PropTypes.array,
  categoryName: PropTypes.string,
  subTitle: PropTypes.string,
  id: PropTypes.string
};
