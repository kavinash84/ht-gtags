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
import { setCity, gaVisitEvent } from "redux/modules/stores";
import StoreListItem from "./StoreListItem";
import { filterStoreList } from "selectors/homepage";
import StoresCarouselItem from "./StoresCarouselItem";
import SlickSlider from "../SlickSlider";

const LeftArrow = require("../../../static/new-home/arrowLeft.svg");
const RightArrow = require("../../../static/new-home/arrowRight.svg");

const styles = require("./Stores.scss");

const mapStateToProps = ({ stores }) => ({
  filteredStores: filterStoreList(stores),
  stores2: stores,
  stores
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ setSelectedCity: setCity, gaVisitEvent }, dispatch);

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <React.Fragment>
      <img
        className={className}
        src={RightArrow}
        onClick={onClick}
        style={{ ...style, margin: 0, width: "15px" }}
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
        style={{ ...style, margin: 0, width: "15px" }}
      />
    </React.Fragment>
  );
}

class StoresCarousel extends Component {
  state = {
    activeSlide: "AHMEDABAD",
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
      arrows: true,
      infinite: false,
      afterChange: this.nextClick,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />
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
    return (
      <Section p="0" pt="1rem" pb="0" mb="0" className="storeCarousel">
        <Container pr="0" pl="0" bg="">
          <Row type="block" m="0" mb="5px" mt="20px">
            {/* <Title title="Stores" subTitle="" /> */}
            <div
              style={{
                backgroundImage: "linear-gradient(to bottom, #EDEDED99, white)",
                margin: "0px 40px",
                width: "100%"
              }}
              className={styles.storesTitle}
            >
              <Heading
                mb="10px"
                fontFamily="medium"
                fontSize="32px"
                m="auto"
                style={{
                  textAlign: "center",
                  color: "#222222"
                }}
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
              marginBottom: "10px"
            }}
          />
          {Array.isArray(cities) && cities.length && (
            <Row type="block" m="0" mb="0.5rem">
              <Div col={12} p="0 0.75rem 0.5rem">
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "center"
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      width: "30%",
                      justifyContent: "center",
                      border: "1px solid #FCD6C0",
                      padding: "10px",
                      borderRadius: "4px"
                    }}
                  >
                    <div
                      style={{ width: "50%" }}
                      className={styles.custome_store_slider}
                    >
                      <SlickSlider settings={settings1}>
                        {cities.map((city, index) => (
                          <div key={String(index)}>
                            <StoresCarouselItem city={city} />
                          </div>
                        ))}
                      </SlickSlider>
                    </div>
                  </div>
                </div>
                {stores2.data && (
                  <SlickSlider settings={settings2}>
                    {stores2.data.items.text
                      .filter(
                        item =>
                          item.city.toUpperCase() === this.state.activeSlide
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
          )}
        </Container>
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
