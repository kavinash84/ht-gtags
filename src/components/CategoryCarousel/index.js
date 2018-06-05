import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Section from 'hometown-components/lib/Section';
import Container from 'hometown-components/lib/Container';
import Title from 'components/Title';
import CategoryCarouselItem from './CategoryCarouselItem';
import SlickSlider from '../SlickSlider';

const settings = {
  slidesToShow: 4,
  slidesToScroll: 4
};

export default class CategoryCarousel extends Component {
  render() {
    const { data, categoryName, subTitle } = this.props;
    console.log(data);
    return (
      <Section p="0" pt="2.5rem" mb="0" className="catCarousel">
        <Container pr="0" pl="0">
          <Title title={categoryName} subTitle={subTitle} />
          <SlickSlider settings={settings}>
            {data.map(slide => (
              <div key={slide.category_id}>
                <CategoryCarouselItem image={slide.image_url} name={slide.info.name} url={slide.info.url_key} />
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
