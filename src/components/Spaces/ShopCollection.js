import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Image from "hometown-components-dev/lib/ImageHtV1";
import Div from "hometown-components-dev/lib/BoxHtV1";
import Heading from "hometown-components-dev/lib/HeadingHtV1";

@connect(({ spaces }) => ({
  spaces,
  shopCollection: spaces.data.items.text.shopCollection
}))
export default class ShopByCollection extends Component {
  render() {
    const { shopCollection } = this.props;
    return (
      <Div>
        <Div mb="-5px" mt="25px">
          <Heading
            mb="20px"
            mt="100px"
            fontSize="35px"
            style={{
              textAlign: "center",
              color: "#222222",
              fontFamily: "medium"
            }}
          >
            {shopCollection.title}
          </Heading>
          <div
            style={{
              width: "30px",
              borderTop: "2px solid #222222",
              margin: "auto"
            }}
          />
        </Div>
        <Div>
          {shopCollection.values.map(slide => (
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
                <Image src={slide.imgSrc} alt="collection" style={{ width: "85%", marginLeft: "7.5%" }}/>
              </Div>
            </Link>
          ))}
        </Div>
      </Div>
    );
  }
}
