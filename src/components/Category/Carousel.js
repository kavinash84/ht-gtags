import React from 'react';
import PropTypes from 'prop-types';
import Section from 'hometown-components/lib/Section';
import Container from 'hometown-components/lib/Container';
import Row from 'hometown-components/lib/Row';
import Title from 'components/Title';
import SquareCatItem from './SquareCatItem';
import RoundCatItem from './RoundCatItem';
import SlickSlider from '../SlickSlider';

const adjustSlides = length => ({
  slidesToShow: length >= 4 ? 4 : length,
  slidesToScroll: 3
});

const CategoryCarousel = ({ data, categoryName, layout }) => (
  <Section p="0" pt="2.5rem" mb="0" className="catCarousel">
    <Container pr="0" pl="0">
      <Title title={categoryName} subTitle="" />
      <Row display="block" pt="0.625rem" ml="0" mr="0">
        <SlickSlider settings={adjustSlides(data.length)}>
          {data.map((slide, index) => (
            <div key={String(index)}>
              {layout === 'round' ? (
                <SquareCatItem image={slide.image} name={slide.title} url={slide.url_key} layout={layout} />
              ) : (
                <RoundCatItem image={slide.image} name={slide.title} url={slide.url_key} layout={layout} />
              )}
            </div>
          ))}
        </SlickSlider>
      </Row>
    </Container>
  </Section>
);

CategoryCarousel.defaultProps = {
  data: [],
  categoryName: '',
  layout: 'square'
};

CategoryCarousel.propTypes = {
  data: PropTypes.array,
  categoryName: PropTypes.string,
  layout: PropTypes.string
};

export default CategoryCarousel;
