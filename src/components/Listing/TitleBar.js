import React from 'react';
import PropTypes from 'prop-types';
import Heading from 'hometown-components-dev/lib/HeadingHtV1';
import Container from 'hometown-components-dev/lib/ContainerHtV1';
import Section from 'hometown-components-dev/lib/SectionHtV1';
import Row from 'hometown-components-dev/lib/RowHtV1';

const TitleBar = ({ children, title, productCount }) => (
  <Section mb="0.625rem" p="1.25rem 0.5rem" bg="bg">
    <Container type="container" pr="0" pl="0">
      {children}
      <Row display="block" mr="0" ml="0" mb="0" mt="10px">
        <Heading fontSize="1.25rem" color="text" mt="0" mb="0" fontFamily="light">
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
