import React from "react";
import PropTypes from "prop-types";

/* ====== Components ====== */
import Box from "hometown-components-dev/lib/BoxHtV1";

/* ====== Page Components ====== */
import Title from "components/Title";
import SlickSlider from "components/SlickSlider";
import CategoryCarouselItem from 'components/CategoryCarousel/CategoryCarouselItem';

const adjustSlides = length => ({
  slidesToShow: length >= 4 ? 4 : length,
  slidesToScroll: 3,
  autoplaySpeed: 5000
});

const CategoryCarousel = ({ data, categoryName }) => (
  <Box>
    {categoryName !== null && (
      <Title title={categoryName} subTitle="" textAlign="center" />
    )}
    <SlickSlider
      settings={adjustSlides(data.length)}
      className="categoryCarousel"
    >
      {data.map((slide, index) => (
        <div key={String(index)}>
          <CategoryCarouselItem image={slide.image} name={slide.title} url={slide.url_key} />
        </div>
      ))}
    </SlickSlider>
  </Box>
);

CategoryCarousel.defaultProps = {
  data: [],
  categoryName: ""
};

CategoryCarousel.propTypes = {
  data: PropTypes.array,
  categoryName: PropTypes.string
};

export default CategoryCarousel;
