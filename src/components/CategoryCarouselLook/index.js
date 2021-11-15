import React, { Component } from "react";
// import PropTypes from "prop-types";
// import BoxHtV1 from 'hometown-components/lib/Div';
// import Title from 'components/Title';
import HeadingHtV1 from "hometown-components-dev/lib/HeadingHtV1";
// import SlickSlider from "components/SlickSlider";
import CategoryCarouselItem from "components/CategoryCarouselLook/CategoryCarouselItem";

// const adjustSlides = length => ({
//   slidesToShow: length >= 2 ? 1.5 : length,
//   slidesToScroll: 1,
//   // autoplaySpeed: 5000,
//   autoplay: false,
//   infinite: false,
//   dots: true,
//   arrows: false
// });

export default class CategoryCarousel extends Component {
  render() {
    // const { data, categoryName } = this.props;
    // console.log(data, "data");
    return (
      <div>
        {/* {(categoryName !== "" || categoryName !== null) && (
        
         
        )} */}
        <HeadingHtV1
          fontFamily="medium"
          style={{ textAlign: "center", color: "#323131" }}
          fontSize="25px"
          mt="30px"
          mb="10px"
        >
          Get The Look
        </HeadingHtV1>

        <div>
          <CategoryCarouselItem />
        </div>
      </div>
    );
  }
}

// CategoryCarousel.defaultProps = {
//   data: [],
//   categoryName: ""
//   // subTitle: ''
// };

// CategoryCarousel.propTypes = {
//   data: PropTypes.array,
//   categoryName: PropTypes.string
//   // subTitle: PropTypes.string
// };
