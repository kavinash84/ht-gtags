import React, { Component } from "react";
// import SlickSlider from "components/SlickSlider";
import DealsOfTheDayCards from "./DealsOfTheDay";

class DealsOfTheDay extends Component {
  render() {
    // const adjustSlides = length => ({
    //   slidesToShow: 3,
    //   slidesToScroll: 1,
    //   infinite: false,
    //   autoplay: false,
    //   dots: false
    //   //   customPaging: i => (
    //   //     <div
    //   //       style={{
    //   //         borderTop: "1px solid #848C7F"
    //   //       }}
    //   //     />
    //   //   )
    // });
    return (
      // <SlickSlider
      //   settings={settings(data.length)}
      //   className="homeCarouselSlider"
      // >

      // </SlickSlider>
      <div>
        <DealsOfTheDayCards />
      </div>
    );
  }
}

export default DealsOfTheDay;
