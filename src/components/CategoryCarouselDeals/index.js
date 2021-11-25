import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BoxHtV1 from 'hometown-components/lib/Div';
import Heading from 'hometown-components/lib/Heading';
import Title from 'components/Title';
import SlickSlider from 'components/SlickSlider';
import CategoryCarouselItem from 'components/CategoryCarouselDeals/CategoryCarouselItem';

import './CategoryCarousel.css';

const adjustSlides = length => ({
  slidesToShow: length >= 1 ? 1.3 : length,
  slidesToScroll: 1,
  autoplay: false,
  infinite: false,
  dots: true,
  arrows: false
});

export default class CategoryCarousel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      containsCoupon: false
    };
  }

  componentDidMount() {
    const { data } = this.props;
    let couponCheck = data.map(obj => {
      if (obj.coupon_code) return true;
      return false;
    });
    if (couponCheck.includes(true)) {
      this.setCouponFlag(true);
    } else {
      this.setCouponFlag(false);
    }
  }

  setCouponFlag(flag) {
    this.setState({
      containsCoupon: flag
    });
  }

  render() {
    const { containsCoupon } = this.state;
    const { data, categoryName, id } = this.props;

    return (
      <BoxHtV1 p="20px">
        {(categoryName !== '' || categoryName !== null) && (
          <Heading
            fontFamily="medium"
            style={{ textAlign: 'center', color: '#323131' }}
            fontSize="22px"
            mt="0px"
            mb="10px"
          >
            {categoryName}
          </Heading>
        )}
        <div
          style={{
            width: '30px',
            borderTop: '2px solid #222222',
            margin: 'auto',
            marginBottom: '10px'
          }}
        />
        <SlickSlider className="mainSlider" settings={adjustSlides(8)}>
          {data.map(slide => (
            <div className="card">
              <CategoryCarouselItem
                id={id}
                image={slide.image_url}
                name={slide.name || ''}
                brand={slide.brand_name || ''}
                maxPrice={slide.mrp}
                offerPrice={slide.csp}
                coupon={slide.coupon_code}
                off={slide.off}
                percentage={slide.percentage}
                fixedValue={slide.mrp}
                toDate={slide.to_date}
                url={slide.product_url}
                specialPrice={slide.csp}
                couponType={slide.coupon_type}
                couponEndDate={slide.coupon_end_date}
                delivery={slide.delivered_by}
                couponFlag={containsCoupon}
                percentageOff={slide.percentage_off}
              />
            </div>
          ))}
        </SlickSlider>
        <BoxHtV1 bg="#F7F0F0" style={{ height: '300px', width: '100vw', zIndex: -1 }} mt="-270px" ml="-30px" />
      </BoxHtV1>
    );
  }
}

CategoryCarousel.defaultProps = {
  data: [],
  categoryName: '',
  // subTitle: '',
  id: 0
};

CategoryCarousel.propTypes = {
  data: PropTypes.array,
  categoryName: PropTypes.string,
  // subTitle: PropTypes.string,
  id: PropTypes.number
};
