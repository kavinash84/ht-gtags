import React, { Component } from "react";
import PropTypes from "prop-types";
import Box from "hometown-components-dev/lib/BoxHtV1";
import Heading from "hometown-components-dev/lib/HeadingHtV1";
// import Title from "components/Title";
import SlickSlider from "components/SlickSlider";

import "./CategoryCarousel.css";
import CategoryItem from "./CategoryCarouselItem";

const LeftArrow = require("../../../../static/new-home/roundedArrowLeft.svg");
const RightArrow = require("../../../../static/new-home/roundedArrowRight.svg");

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <React.Fragment>
      <img
        className={className}
        src={RightArrow}
        onClick={onClick}
        style={{ ...style, margin: '0px 130px', width: "15px" }}
      />
    </React.Fragment>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <React.Fragment>
      <img
        className={className}
        src={LeftArrow}
        onClick={onClick}
        style={{ ...style, margin: '0px 130px', width: "15px" }}
      />
    </React.Fragment>
  );
}

const adjustSlides = length => ({
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: false,
  infinite: false,
  dots: false,
  arrows: true,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />
  // customPaging: i => (
  //   <div
  //     style={{
  //       marginTop: "20px",
  //       borderTop: "1px solid red"
  //     }}
  //   ></div>
  // )
});

export default class ParentsPick extends Component {
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
        <Heading
          fontFamily="medium"
          style={{ color: "#323131" }}
          fontSize="35px"
          mt="40px"
          mb="20px"
          ml="2%"
        >
          {categoryName}
        </Heading>
        <SlickSlider
          style={{ width: "100%", margin: '0 auto' }}
          className="mainSlider"
          settings={adjustSlides(4)}
        >
          {data.map(slide => (
            <div className="card">
              <CategoryItem
                id={id}
                image={slide.image_url}
                name={slide.name || ""}
                brand={slide.brand_name || ""}
                // maxPrice={slide.mrp}
                // offerPrice={slide.csp}
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
      </Box>
    );
  }
}

ParentsPick.defaultProps = {
  data: [],
  categoryName: "",
  // subTitle: '',
  id: 0
};

ParentsPick.propTypes = {
  data: PropTypes.array,
  categoryName: PropTypes.string,
  // subTitle: PropTypes.string,
  id: PropTypes.number
};
