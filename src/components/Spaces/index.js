import React, { Component } from "react";
import { connect } from "react-redux";
import Section from "hometown-components-dev/lib/SectionHtV1";
import Image from "hometown-components-dev/lib/ImageHtV1";
import Div from "hometown-components-dev/lib/BoxHtV1";
import { Link } from "react-router-dom";
import SpaceSlider from "./SpaceSlider";
import Arrivals from "./Arrivals";
import ShopByCollection from "./ShopCollection";
import KidsCollection from "./KidsCollection";
import OfferZone from "./OfferZone/OfferZone";
import ShopByCategory from "./ShopCategory";
@connect(({ spaces }) => ({
  spaces,
  general: spaces.data.items.text.general,
  topBanner: spaces.data.items.text.topBanner,
  offerZone: spaces.data.items.text.offerZone
}))
class SpacesContainer extends React.Component {
  render() {
    const { general, topBanner } = this.props;
    return (
      <Section style={{ maxWidth: "1440px", margin: "0 auto" }}>
        <SpaceSlider data={topBanner.values} />
        <Arrivals />
        <ShopByCategory />
        <ShopByCollection />
        <KidsCollection />
        <Div>
          {general.values.map(slide => (
            <Link
              to={slide.url_key}
              onClick={() => {
                sessionStorage.setItem(
                  "SpacesScrollPosition",
                  window.pageYOffset
                );
              }}
            >
              <Div mt="40px" >
                <Image data-src={slide.imgSrc} alt="general" style={{ width: "85%", marginLeft: "7.5%" }}/>
              </Div>
            </Link>
          ))}
        </Div>

        <OfferZone />
      </Section>
    );
  }
}

export default SpacesContainer;
