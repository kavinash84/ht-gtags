import React, { Component } from "react";
import SlickSlider from "components/SlickSlider";
import Div from "hometown-components-dev/lib/BoxHtV1";

const styles = require("./TextCarousel.scss");

export class TextCarousel extends Component {
  render() {
    const { textData } = this.props;
    return (
      <Div m="0px" mb="0px">
        <SlickSlider
          mb="0px"
          settings={{ autoplay: true, autoplaySpeed: 3000 }}
        >
          {textData.map(slide => (
            <div className={styles.example1}>
              <h3>{slide.text}</h3>
            </div>
          ))}
        </SlickSlider>
      </Div>
    );
  }
}

export default TextCarousel;
