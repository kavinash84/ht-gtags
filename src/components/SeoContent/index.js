import React from 'react';
import PropTypes from 'prop-types';
import Container from 'hometown-components/lib/Container';
import Div from 'hometown-components/lib/Div';
import Row from 'hometown-components/lib/Row';
import Section from 'hometown-components/lib/Section';

const SeoContent = ({ children }) => (
  <Div type="block" pb="3rem" pt="1rem">
    <Section pt="0.3125rem" pb="0.3125rem" mb="0.625rem">
      <Container pr="0" pl="0">
        <Row display="block" mr="0" ml="0">
          <Div col="12">{children}</Div>
        </Row>
      </Container>
    </Section>
  </Div>
);

SeoContent.defaultProps = {
  children: {}
};

SeoContent.propTypes = {
  children: PropTypes.objectOf(PropTypes.any)
};

export default SeoContent;
