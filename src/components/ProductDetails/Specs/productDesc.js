import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Container from "hometown-components-dev/lib/ContainerHtV1";
import Row from "hometown-components-dev/lib/RowHtV1";
import Div from "hometown-components-dev/lib/BoxHtV1";
import Heading from "hometown-components-dev/lib/HeadingHtV1";
// import Text from 'components/Text';
import Section from 'hometown-components-dev/lib/SectionHtV1';
import Button from "hometown-components-dev/lib/ButtonHtV1";
// import Theme from 'hometown-components/lib/Theme';

const formatDescription = desc => {
  desc.split('<br>').join('').split('&nbsp;').join('');
  return desc && desc.trim();
};

const Description = styled.div`
font-size: 14px;
line-height: 1.6;
ul {
  padding-left: 20px;
  li {
    font-size: 14px;
    margin-bottom: 5px;
    font-family: light;
    @media (max-width: 768px) {
      font-size: 12px;
    }
  }
}
`;

/* eslint-disable react/no-danger */
const ProductDesc = ({ desc, showmore, toggleShowMore }) => {
  desc = formatDescription(desc);
  return (
    <Section mb="0.3125rem" pr="0" pl="0" pt="0" mt="0">
      <Container type="container" pr="1rem" pl="0">
        <Row display="block" mb="0" mr="0" ml="0">
          <Div col="12" className={(desc.length > 120 && showmore) ? 'showLess' : 'showmore'}>

            <Description
              itemProp="description"
              fontSize="0.875rem"
              dangerouslySetInnerHTML={{ __html: desc }}
            />
          </Div>

        </Row>
      </Container>
    </Section>
  );
};

ProductDesc.propTypes = {
  desc: PropTypes.string.isRequired,
  showmore: PropTypes.bool.isRequired,
  toggleShowMore: PropTypes.func.isRequired,
};

export default ProductDesc;
