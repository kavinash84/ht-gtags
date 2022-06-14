import React from "react";
import { connect } from "react-redux";
import Heading from "hometown-components-dev/lib/HeadingHtV1";
import Row from "hometown-components-dev/lib/RowHtV1";
import Div from "hometown-components-dev/lib/BoxHtV1";
import Img from "hometown-components-dev/lib/ImageHtV1";
import Section from "hometown-components-dev/lib/SectionHtV1";

@connect(({ modularkitchen }) => ({
  modularkitchen,
  partners: modularkitchen.data.items.text.partners
}))
class OurPartners extends React.Component {
  render() {
    const { partners } = this.props;
    return (
      <Section>
        <div
          style={{
            height: "200px",
            width: "70%",
            border: "4px solid #fde4d3",
            borderRadius: "20px",

            margin: "70px auto 10px"
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column"
            }}
          >
            <Heading
              mt="20px"
              color="#3A3A3A"
              fontSize="40px"
              ta="center"
              fontWeight="bold"
            >
              Our Partners
            </Heading>

            <Row p="0px 30px">
              {partners.images.map((data, index) => (
                <Div key={index} col="6" margin="0 10px">
                  <Img
                    data-src={data.image}
                    src={`${data.image}?blur=30`}
                    height="70%"
                    width="70%"
                    m="auto"
                    style={{ objectFit: "contain" }}
                  />
                </Div>
              ))}
            </Row>
          </div>
        </div>
      </Section>
    );
  }
}

export default OurPartners;
