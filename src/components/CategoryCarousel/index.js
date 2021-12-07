import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BoxHtV1 from 'hometown-components-dev/lib/BoxHtV1';
import Title from 'components/Title';
import SlickSlider from 'components/SlickSlider';
import CategoryCarouselItem from 'components/CategoryCarousel/CategoryCarouselItem';

const adjustSlides = length => ({
  slidesToShow: length >= 4 ? 4 : length,
  slidesToScroll: 3,
  autoplaySpeed: 5000
});

export default class CategoryCarousel extends Component {
  render() {
    const { data, categoryName, subTitle } = this.props;
    return (
      <BoxHtV1>
        {(categoryName !== '' || categoryName !== null) && <Title title={categoryName} subTitle={subTitle} />}
        <SlickSlider settings={adjustSlides(data.length)} className="homeCarouselSlider">
          {data.map(slide => (
            <div key={slide.category_id}>
              <CategoryCarouselItem
                image={slide.image_url}
                name={slide.offer_description || ''}
                discount={slide.offer || slide.info.name}
                url={slide.info.url_key}
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
  subTitle: ''
};

CategoryCarousel.propTypes = {
  data: PropTypes.array,
  categoryName: PropTypes.string,
  subTitle: PropTypes.string
};
