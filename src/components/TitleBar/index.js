import React from 'react';
import PropTypes from 'prop-types';
import Heading from 'hometown-components/lib/Heading';
import Container from 'hometown-components/lib/Container';
import Div from 'hometown-components/lib/Div';
import Section from 'hometown-components/lib/Section';
import Span from 'hometown-components/lib/Span';
import Row from 'hometown-components/lib/Row';

const styles = require('./TitleBar.scss');

const TitleBar = ({ title }) => (
  <Section mb="0.625rem" p="1.5rem 0.5rem" bg="primary" boxShadow="0 2px 8px 0 rgba(0, 0, 0, 0.17)">
    <Container type="container" pr="2rem" pl="2rem">
      <Row display="block" mr="0" ml="0" mb="1rem">
        <Div col="9">
          <a href="/" className={`${styles.headerLink}`}>
            Home{' '}
            <Span pl="0.625rem" pr="0.625rem" color="#FFF">
              >
            </Span>
          </a>
          <a href="/" className={`${styles.headerLink}`}>
            {title}
          </a>
        </Div>
      </Row>
      <Row display="block" mr="0" ml="0" mb="1rem">
        <Heading fontSize="1.5rem" color="white" mt="0" mb="0" fontFamily="SFPDLight">
          {title}
        </Heading>
      </Row>
    </Container>
  </Section>
);

TitleBar.defaultProps = {
  title: ''
};

TitleBar.propTypes = {
  title: PropTypes.string
};

export default TitleBar;
