import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Image from "hometown-components-dev/lib/ImageHtV1";
import Div from "hometown-components-dev/lib/BoxHtV1";
import Heading from "hometown-components-dev/lib/HeadingHtV1";
import Section from "hometown-components-dev/lib/SectionHtV1";
import Row from "hometown-components-dev/lib/RowHtV1";
import Text from "hometown-components-dev/lib/TextHtV1";

@connect(({ spaces }) => ({
  spaces,
  shopCategory: spaces.data.items.text.shopCategory
}))
export default class ShopByCategory extends Component {
  render() {
    const { shopCategory } = this.props;
    return (
      <Section
        p="0"
        pt="0"
        className="catCarousel"
        mb="0"
        style={{ width: "90%", marginLeft: "5%" }}
      >
        <Section pr="15px" pl="0" mb="0px">
          <Div mb="25px" mt="40px" ml="10px">
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
              {shopCategory.title}
            </Heading>
            <div
              style={{
                width: "30px",
                borderTop: "2px solid #222222",
                margin: "auto"
              }}
            />
          </Div>

          <Row
            justifyContent="center"
            style={{ width: "100%", margin: "auto", marginLeft: "8px" }}
          >
            {shopCategory.values.map(slide => (
              <Div style={{ width: "28%", margin: "10px 15px" }}>
                <Link
                  to={slide.url_key}
                  onClick={() => {
                    sessionStorage.setItem(
                      "SpacesScrollPosition",
                      window.pageYOffset
                    );
                  }}
                >
                  <Image
                    src={slide.imgSrc}
                    alt={slide.title}
                    m={5}
                    height="auto"
                    width="100%"
                  />
                  <Text
                    fontSize="10pt"
                    color="label"
                    mt="5px"
                    style={{ textAlign: "center" }}
                  >
                    {slide.title}
                  </Text>
                </Link>
              </Div>
            ))}
          </Row>
        </Section>
      </Section>
    );
  }
}
