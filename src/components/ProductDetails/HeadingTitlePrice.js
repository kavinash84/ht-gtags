import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Container from "hometown-components-dev/lib/ContainerHtV1";
import Heading from "hometown-components-dev/lib/HeadingHtV1";
// import HeadingH5 from 'components/HeadingH5';
import Row from "hometown-components-dev/lib/RowHtV1";
// import span from 'components/span';
import Section from "hometown-components-dev/lib/SectionHtV1";




const HeadingTitlePrice = ({
  name,
  brand

}) => (
    <Section mb="0.3125rem" p="0">
      <Container type="container" pr="1rem" pl="1rem">
        <Row display="block" mr="0" ml="0">
          <Heading
            itemProp="name"
            fontSize="22px"
            color="#222222"
            mb="0"
            mt="5px"
            lh="1.7"
            fontFamily="medium"
            ellipsis={false}
            pb="5px"
          >
            {name}
          </Heading>

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
