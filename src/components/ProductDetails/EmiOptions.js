/* eslint-disable max-len */
import React from "react";
import PropTypes from "prop-types";
import Div from "hometown-components-dev/lib/BoxHtV1";
import Text from "hometown-components-dev/lib/TextHtV1";
import Heading from "hometown-components-dev/lib/HeadingHtV1";
import { Link } from "react-router-dom";
import SlickSlider from "../SlickSlider";

const styles = require("./EmiOptions.scss");

const adjustSlides = length => ({
  slidesToShow: length >= 2 ? 1.4 : length,
  slidesToScroll: 1,
  autoplay: false,
  infinite: false,
  arrows: false
});

function HtExclusiveTemplate4({ data }) {
  const { headerTitle, collection } = data;
  return (
    <Div m="0px 1rem">
      <Div bg="white" py="20">
        <Heading color="grey" fontSize="15px" ta="left" mb="0">
          {headerTitle}
        </Heading>
        <Div>
          <Div pl="0px" pr="30px">
            <SlickSlider settings={adjustSlides(12)}>
              {collection.length &&
                collection.map((slide, index) => (
                  <Div key={String(index)} p="10px 0px" pr="10px">
                    <Div className={styles.paymentOptions}>
                      <Link to="/promotions">
                        <Div>
                          <Text
                            fontSize="13px"
                            style={{ fontWeight: "bold" }}
                            mt="0"
                            mb="0.3rem"
                          >
                            {slide.title}
                          </Text>
                          <Text fontSize="13px" mt="0" mb="0" lh="16px">
                            {slide.desc}
                          </Text>
                        </Div>
                      </Link>
                    </Div>
                  </Div>
                ))}
            </SlickSlider>
          </Div>
        </Div>
      </Div>
    </Div>
  );
}
HtExclusiveTemplate4.propTypes = {
  data: PropTypes.object
};

HtExclusiveTemplate4.defaultProps = {
  data: {
    mainTitle: "",
    subTitles: "",
    imageCollection: [],
    banner: ""
  }
};

export default HtExclusiveTemplate4;
