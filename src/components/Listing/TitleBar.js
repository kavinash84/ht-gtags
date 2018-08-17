import React from 'react';
import PropTypes from 'prop-types';
import Heading from 'hometown-components/lib/Heading';
import Container from 'hometown-components/lib/Container';
// import Div from 'hometown-components/lib/Div';
import Section from 'hometown-components/lib/Section';
import Row from 'hometown-components/lib/Row';
// import { Link } from 'react-router-dom';

// const styles = require('./BreadCrumb.scss');

const TitleBar = ({ children, title, productCount }) => (
  <Section mb="0.625rem" p="1.5rem 0.5rem" bg="block10">
    <Container type="container" pr="0" pl="0">
      {children}
      <Row display="block" mr="0" ml="0" mb="0" mt="10px">
        <Heading fontSize="1.5rem" color="text" mt="0" mb="0" fontFamily="regular">
          {title} {productCount && `(${productCount})`}
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
  productCount: PropTypes.string,
  children: PropTypes.object.isRequired
};

export default TitleBar;
