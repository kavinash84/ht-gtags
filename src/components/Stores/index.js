import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Section from "hometown-components-dev/lib/SectionHtV1";
import Container from "hometown-components-dev/lib/ContainerHtV1";
import Row from "hometown-components-dev/lib/RowHtV1";
import { bindActionCreators } from "redux";
import Slider from "react-slick";
import Div from "hometown-components-dev/lib/BoxHtV1";
import Heading from "hometown-components-dev/lib/HeadingHtV1";
// import Col from 'hometown-components-dev/lib/ColHtV1';
const LeftArrow = require("../../../static/new-home/arrowLeft.svg");
const RightArrow = require("../../../static/new-home/arrowRight.svg");
import { setCity, gaVisitEvent } from "redux/modules/stores";

import StoreListItem from "./StoreListItem";

import { filterStoreList } from "selectors/homepage";
import StoresCarouselItem from "./StoresCarouselItem";

import SlickSlider from "../SlickSlider";
const styles = require("./Stores.scss");
const mapStateToProps = ({ stores }) => ({
  filteredStores: filterStoreList(stores),
  stores2: stores,
  stores
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ setSelectedCity: setCity, gaVisitEvent }, dispatch);

class StoresCarousel extends Component {
  constructor(props) {
    super(props);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
  }
  next() {
    this.slider.slickNext();
  }
  previous() {
    this.slider.slickPrev();
  }
  state = {
    activeSlide: "Ahmedabad",
    selectedStores: []
  };
  nextClick = e => {
    const { cities } = this.props;
    const actSlide = cities[e];
    this.setState({ activeSlide: actSlide });
  };
  render() {
    const settings1 = {
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: false,
      infinite: false,
      arrows: false,

      afterChange: this.nextClick
    };
    const settings2 = {
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: false,
      infinite: false,
      arrows: false
      // afterChange: this.nextClick
    };
    const { cities, stores2, gaVisitEvent } = this.props;
    // console.log(this.state.localCities, cities, "activeSlide");
    return (
      <Section p="0" pt="1rem" pb="0" mb="0" className="storeCarousel">
        {Array.isArray(cities) && cities.length && (
          <Container pr="0" pl="0" bg="">
            <Row type="block" m="0" mb="5px">
              {/* <Title title="Stores" subTitle="" /> */}
              <div
                style={{
                  backgroundImage:
                    "linear-gradient(to bottom, #EDEDED99, white)",
                  margin: "20px 40px",
                  width: "100%",
                  paddingTop: "40px"
                }}
              >
                <Heading
                  mb="5px"
                  fontFamily="medium"
                  fontSize="30px"
                  m="auto"
                  style={{ textAlign: "center", color: "#222222" }}
                >
                  Stores
                </Heading>
              </div>
            </Row>
            <div
              style={{
                width: "30px",
                borderTop: "2px solid #222222",
                margin: "auto",
                marginBottom: "40px"
              }}
            />
            <Row type="block" m="0" mb="0.5rem">
              <Div col={12} p="0 0.75rem 0.5rem">
                <div
                  style={{
                    textAlign: "center",
                    width: "40%",
                    height: "50%",
                    margin: "auto",
                    border: "1px solid #fcd6c0",
                    borderRadius: "5px"
                  }}
                >
                  <div
                    style={{ position: "absolute", top: "65%", left: "35%" }}
                  >
                    <img
                      onClick={this.previous}
                      style={{
                        display: "inline",

                        height: "10px"
                      }}
                      src={LeftArrow}
                      alt="Arrow"
                    />
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      width: "25%",
                      left: "38%",
                      top: "63%"
                    }}
                  >
                    <Slider
                      settings={settings1}
                      ref={c => (this.slider = c)}
                      className={styles.slickNext}
                    >
                      {cities.map((city, index) => (
                        <div key={String(index)}>
                          <StoresCarouselItem city={city} />
                        </div>
                      ))}
                    </Slider>
                  </div>
                  <div
                    style={{ position: "absolute", top: "65%", left: "64%" }}
                  >
                    <img
                      onClick={this.next}
                      style={{
                        display: "inline",

                        height: "10px"
                      }}
                      src={RightArrow}
                      alt="Arrow"
                    />
                  </div>
                </div>

                {stores2.data && (
                  <SlickSlider settings={settings2}>
                    {stores2.data.items.text
                      .filter(
                        item =>
                          item.city.toUpperCase() ===
                          this.state.activeSlide.toUpperCase()
                      )
                      .map((store, index) => (
                        <StoreListItem
                          key={String(index)}
                          city={store.city}
                          store={store.store}
                          address={store.address}
                          pincode={store.pincode}
                          state={store.state}
                          phone={store.phone}
                          gaVisitHandler={gaVisitEvent.recordStoreVisit}
                          url={
                            store.meta.url.length > 0
                              ? store.meta.url
                              : `/store/${hyphenedString(
                                  store.city
                                ).toLowerCase()}/${hyphenedString(
                                  store.store
                                ).toLowerCase()}`
                          }
                        />
                      ))}
                  </SlickSlider>
                )}
              </Div>
            </Row>
          </Container>
        )}
      </Section>
    );
  }
}

StoresCarousel.defaultProps = {
  cities: []
};

StoresCarousel.propTypes = {
  cities: PropTypes.array
};

export default connect(mapStateToProps, mapDispatchToProps)(StoresCarousel);
