import React, { Component } from "react";
import PropTypes from "prop-types";
import Box from "hometown-components-dev/lib/BoxHtV1";
import Heading from "hometown-components-dev/lib/HeadingHtV1";
// import Title from "components/Title";
import SlickSlider from "components/SlickSlider";
import CategoryCarouselItem from "components/CategoryCarouselDeals/CategoryCarouselItem";

import "./CategoryCarousel.css";

const adjustSlides = length => ({
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: false,
  infinite: false,
  dots: false,
  arrows: true
  // customPaging: i => (
  //   <div
  //     style={{
  //       marginTop: "20px",
  //       borderTop: "1px solid red"
  //     }}
  //   ></div>
  // )
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
      <Box p="40px">
        {(categoryName !== "" || categoryName !== null) && (
          <Heading
            fontFamily="medium"
            style={{ textAlign: "center", color: "#323131" }}
            fontSize="30px"
            mt="40px"
            mb="20px"
          >
            {categoryName}
          </Heading>
        )}

        <SlickSlider
          style={{ width: "80%", marginLeft: "10%", marginRight: "10%" }}
          className="mainSlider"
          settings={adjustSlides(4)}
        >
          {data.map(slide => (
            <div className="card">
              <CategoryCarouselItem
                id={id}
                image={slide.image_url}
                name={slide.name || ""}
                brand={slide.brand_name || ""}
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
        <Box
          bg="#F7F0F0"
          style={{ height: "400px", width: "100vw", zIndex: -1 }}
          mt="-22%"
          ml="-30px"
        />
      </Box>
    );
  }
}

CategoryCarousel.defaultProps = {
  data: [],
  categoryName: "",
  // subTitle: '',
  id: 0
};

CategoryCarousel.propTypes = {
  data: PropTypes.array,
  categoryName: PropTypes.string,
  // subTitle: PropTypes.string,
  id: PropTypes.number
};
