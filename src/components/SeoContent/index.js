import React from 'react';
import PropTypes from 'prop-types';
import Container from 'hometown-components-dev/lib/Container';
import SeoContentContainer from 'hometown-components-dev/lib/SeoContent';
import Div from 'hometown-components-dev/lib/Div';
import Row from 'hometown-components-dev/lib/Row';
import Section from 'hometown-components-dev/lib/Section';

const SeoContent = ({ children }) => (
  <Div type="block" pb="2rem" pt="0">
    <SeoContentContainer>
      <Section pt="0.3125rem" pb="0.3125rem" mb="0.625rem">
        <Container pr="0" pl="0">
          <Row display="block" mr="0" ml="0">
            <Div col="12">{children}</Div>
          </Row>
        </Container>
      </Section>
    </SeoContentContainer>
  </Div>
);

SeoContent.defaultProps = {
  children: {}
};

SeoContent.propTypes = {
  children: PropTypes.objectOf(PropTypes.any)
};

export default SeoContent;
