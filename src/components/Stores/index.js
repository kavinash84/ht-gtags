import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Row from "hometown-components-dev/lib/RowHtV1";
// import Div from "hometown-components/lib/Div";
import HeadingHtV1 from "hometown-components-dev/lib/HeadingHtV1";
// import Col from 'hometown-components-dev/lib/ColHtV1';

import { filterStoreList } from "selectors/homepage";
import StoresCarouselItem from "./StoresCarouselItem";

import SlickSlider from "../SlickSlider";

const settings = {
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: false,
  infinite: false
};

@connect(({ stores }) => ({
  filteredStores: filterStoreList(stores),
  stores
}))
export default class StoresCarousel extends Component {
  render() {
    const { cities } = this.props;
    return (
      <div
        style={{ padding: "1rem 0 0 0", marginBottom: "0" }}
        className="storeCarousel"
      >
        <div style={{ paddingRight: "0", paddingLeft: "0" }}>
          <Row type="block" m="0" mb="5px">
            {/* <Title title="Stores" subTitle="" /> */}
            <div
              style={{
                backgroundImage: "linear-gradient(to bottom, #EDEDED99, white)",
                margin: "0px 40px",
                width: "100%"
              }}
            >
              <HeadingHtV1
                mb="5px"
                fontFamily="medium"
                fontSize="22px"
                m="auto"
                style={{ textAlign: "center", color: "#222222" }}
              >
                Stores
              </HeadingHtV1>
            </div>
          </Row>
          <div
            style={{
              width: "30px",
              borderTop: "2px solid #222222",
              margin: "auto",
              marginBottom: "10px"
            }}
          />
          <Row type="block" m="0" mb="0.5rem">
            <div style={{ padding: "0 0.75rem 0.5rem" }} col={12}>
              <SlickSlider settings={settings}>
                {cities.map((city, index) => (
                  <div key={String(index)}>
                    <StoresCarouselItem city={city} />
                  </div>
                ))}
              </SlickSlider>
            </div>
          </Row>
        </div>
      </div>
    );
  }
}

StoresCarousel.defaultProps = {
  cities: []
  // filteredStores: []
};

StoresCarousel.propTypes = {
  cities: PropTypes.array
  // filteredStores: PropTypes.array
};
