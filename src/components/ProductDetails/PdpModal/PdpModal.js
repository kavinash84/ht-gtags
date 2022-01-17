import React, { Component } from "react";
import Div from "hometown-components-dev/lib/BoxHtV1";
import { connect } from "react-redux";
import DBCarousel from "./DBCarousel";

const styles = require("./Pdp.scss");

const pdpModal = {

    items: [
      {
				image: "https://www.hometown.in/media/cms/hometownnew/desktopnewhomepage/shopbycat/shopgiftbyprice01.png",
				title: "Delight Leatherette Two Seater Sofa in Ivory Colour",
        price:"16999",
				url_key: ""
			},
			{
				image: "https://www.hometown.in/media/cms/hometownnew/desktopnewhomepage/shopbycat/shopgiftbyprice01.png",
				title: "Delight Leatherette Two Seater Sofa in Ivory Colour",
        price:"16999",
				url_key: ""
			},
			{
				image: "https://www.hometown.in/media/cms/hometownnew/desktopnewhomepage/shopbycat/shopgiftbyprice01.png",
				title: "Delight Leatherette Two Seater Sofa in Ivory Colour",
        price:"16999",
				url_key: ""
			},
      {
				image: "https://www.hometown.in/media/cms/hometownnew/desktopnewhomepage/shopbycat/shopgiftbyprice01.png",
				title: "Delight Leatherette Two Seater Sofa in Ivory Colour",
        price:"16999",
				url_key: ""
			},
			{
				image: "https://www.hometown.in/media/cms/hometownnew/desktopnewhomepage/shopbycat/shopgiftbyprice01.png",
				title: "Delight Leatherette Two Seater Sofa in Ivory Colour",
        price:"16999",
				url_key: ""
			},
			{
				image: "https://www.hometown.in/media/cms/hometownnew/desktopnewhomepage/shopbycat/shopgiftbyprice01.png",
				title: "Delight Leatherette Two Seater Sofa in Ivory Colour",
        price:"16999",
				url_key: ""
			}
    ]
  }

const adjustSlides = length => ({
  slidesToShow: 3,
  slidesToScroll: 1,
  infinite: false,
  autoplay: false,
  dots: false
  //   customPaging: i => (
  //     <div
  //       style={{
  //         borderTop: "1px solid #848C7F"
  //       }}
  //     />
  //   )
});

export default class PdpModal extends Component {
  render() {

    return (
      <Div
        style={{
          backgroundColor: "#FFFFFF",
          padding: "10px 30px 0px",
          textAlign: "center",
          marginTop: "40px"
        }}
      >


        <Div
          style={{
            paddingBottom: "",
            width: "100%",
            margin: "auto"
          }}
        >
          <DBCarousel
            data={pdpModal.items}
            settings={adjustSlides}
            component={3}
          />
        </Div>
      </Div>
    );
  }
}
