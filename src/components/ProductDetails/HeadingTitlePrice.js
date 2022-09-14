import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Container from "hometown-components-dev/lib/ContainerHtV1";
import Heading from "hometown-components-dev/lib/HeadingHtV1";
// import HeadingH5 from 'components/HeadingH5';
import Row from "hometown-components-dev/lib/RowHtV1";
// import span from 'components/span';
import Section from "hometown-components-dev/lib/SectionHtV1";

const HeadingTitlePrice = ({ name, brand }) => (
  <Section mb="0.3125rem" p="0" mt="0">
    <Container type="container" pr="1rem" pl="1rem">
      <Row mr="0" ml="0" style={{ display: "block" }}>
        <h1
          itemProp="name"
          style={{
            fontFamily: "medium",
            paddingBottom: "5px",
            margin: "5px 0px 0px",
            color: "#222222",
            fontSize: "22px"
          }}
        >
          {name}
        </h1>

        <div
          style={{
            fontSize: "18px",
            color: "#323131",
            fontFamily: "medium"
          }}
          itemProp="brand"
        >
          {brand}
        </div>
      </Row>
    </Container>
  </Section>
);

HeadingTitlePrice.propTypes = {
  name: PropTypes.string,
  brand: PropTypes.string
};

HeadingTitlePrice.defaultProps = {
  name: "",
  brand: ""
};

export default HeadingTitlePrice;
