import React from 'react';
import PropTypes from 'prop-types';

/* ====== Components ====== */
import BoxHtV1 from 'hometown-components-dev/lib/BoxHtV1';

/* ====== Page Components ====== */
import Title from 'newComponents/Title';
import SlickSlider from 'newComponents/SlickSlider';
import CategoryCarouselItem from 'newComponents/CategoryCarousel/CategoryCarouselItem';

const adjustSlides = length => ({
  slidesToShow: length >= 4 ? 4 : length,
  slidesToScroll: 3,
  autoplaySpeed: 5000
});

const CategoryCarousel = ({ data, categoryName }) => (
  <BoxHtV1>
    <Title title={categoryName} subTitle="" ta="center" />
    <SlickSlider settings={adjustSlides(data.length)}>
      {data.map((slide, index) => (
        <div key={String(index)}>
          <CategoryCarouselItem image={slide.image} name={slide.title} url={slide.url_key} />
        </div>
      ))}
    </SlickSlider>
  </BoxHtV1>
);

CategoryCarousel.defaultProps = {
  data: [],
  categoryName: ''
  // layout: 'square'
};

CategoryCarousel.propTypes = {
  data: PropTypes.array,
  categoryName: PropTypes.string
  // layout: PropTypes.string
};

export default CategoryCarousel;
