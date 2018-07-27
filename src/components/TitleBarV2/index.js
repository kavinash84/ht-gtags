import React from 'react';
import PropTypes from 'prop-types';
import Heading from 'hometown-components/lib/Heading';
import Container from 'hometown-components/lib/Container';
import Div from 'hometown-components/lib/Div';
import Section from 'hometown-components/lib/Section';
import Span from 'hometown-components/lib/Span';
import Row from 'hometown-components/lib/Row';

const styles = require('./TitleBarV2.scss');

const TitleBar = ({ title, productCount }) => (
  <Section
    mb="0.625rem"
    p="1.5rem 0.5rem"
    bg="prime"
    boxShadow="0 2px 8px 0 rgba(0, 0, 0, 0.17)"
    style={{ background: '#ae8873 !important' }}
  >
    <Container type="container" pr="0" pl="0">
      <Row display="block" mr="0" ml="0" mb="1rem">
        <Div col="9">
          <a href="/" className={`${styles.headerLinkV1}`}>
            Home{' '}
            <Span pl="0.625rem" pr="0.625rem" color="#fff">
              >
            </Span>
          </a>
          <a href="/" className={`${styles.headerLinkV1}`}>
            {title}
          </a>
        </Div>
      </Row>
      <Row display="block" mr="0" ml="0" mb="0">
        <Heading fontSize="1.5rem" color="white" mt="0" mb="0" fontWeight="400">
          {title} {productCount !== '' && { productCount }}
        </Heading>
      </Row>
    </Container>
  </Section>
);

TitleBar.defaultProps = {
  title: '',
  productCount: ''
};

TitleBar.propTypes = {
  title: PropTypes.string,
  productCount: PropTypes.string
};

export default TitleBar;
