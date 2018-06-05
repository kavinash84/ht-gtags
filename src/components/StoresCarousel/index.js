import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Section from 'hometown-components/lib/Section';
import Container from 'hometown-components/lib/Container';
import Title from 'components/Title';
import StoresCarouselItem from './StoresCarouselItem';
import SlickSlider from '../SlickSlider';

const settings = {
  slidesToShow: 7,
  slidesToScroll: 7
};

export default class CategoryCarousel extends Component {
  render() {
    const { data, categoryName, subTitle } = this.props;
    return (
      <Section p="0" pt="2.5rem" mb="0" className="catCarousel">
        <Container pr="0" pl="0">
          <Title title={categoryName} subTitle={subTitle} />
          <SlickSlider settings={settings}>
            {data.map(slide => (
              <div key={slide.id}>
                <StoresCarouselItem name={slide.name} url={slide.url} />
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
  subTitle: ''
};

CategoryCarousel.propTypes = {
  data: PropTypes.array,
  categoryName: PropTypes.string,
  subTitle: PropTypes.string
};
