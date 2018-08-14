import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Container from 'hometown-components/lib/Container';
import Div from 'hometown-components/lib/Div';
import Row from 'hometown-components/lib/Row';
import Section from 'hometown-components/lib/Section';

const SeoContentContainer = styled.div`
  padding-bottom: 2rem;
  padding-top: 2rem;
  font-size: 0.875rem;
  line-height: 1.7;
  h1 {
    margin-top: 1.5rem;
    margin-bottom: 0.625rem;
    font-size: 1.5rem;
  }
  h2 {
    margin-top: 1.5rem;
    margin-bottom: 0.625rem;
    font-size: 1.25rem;
    &:first-child {
      margin-top: 0;
      font-size: 1.5rem;
    }
  }
  p {
    margin-top: 0.625rem;
    margin-bottom: 0.625rem;
    font-size: 0.875rem;
    line-height: 1.7;
  }
  br {
    display: none;
  }
`;

const SeoContent = ({ children }) => (
  <Div type="block" pb="0" pt="0">
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
