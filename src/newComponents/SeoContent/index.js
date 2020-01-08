import React from 'react';
import PropTypes from 'prop-types';
import Container from 'hometown-components-dev/lib/ContainerHtV1';
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Row from 'hometown-components-dev/lib/RowHtV1';
import Section from 'hometown-components-dev/lib/SectionHtV1';

const SeoContent = ({ children }) => (
  <Box type="block" pb="2rem" pt="0">
    <Box>
      <Section pt="0.3125rem" pb="0.3125rem" mb="0.625rem">
        <Container pr="0" pl="0">
          <Row display="block" mr="0" ml="0">
            <Box col="12">{children}</Box>
          </Row>
        </Container>
      </Section>
    </Box>
  </Box>
);

SeoContent.defaultProps = {
  children: {}
};

SeoContent.propTypes = {
  children: PropTypes.objectOf(PropTypes.any)
};

export default SeoContent;
