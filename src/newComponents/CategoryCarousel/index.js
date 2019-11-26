import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BoxHtV1 from 'hometown-components/lib/BoxHtV1';
import Title from 'newComponents/Title';
import SlickSlider from 'newComponents/SlickSlider';
import CategoryCarouselItem from 'newComponents/CategoryCarousel/CategoryCarouselItem';

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
      <BoxHtV1>
        {(categoryName !== '' || categoryName !== null) && <Title title={categoryName} subTitle={subTitle} />}
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
      </BoxHtV1>
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
