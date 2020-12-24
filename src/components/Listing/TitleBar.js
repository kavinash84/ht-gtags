import React from 'react';
import PropTypes from 'prop-types';
// import Heading from 'hometown-components-dev/lib/HeadingHtV1';
import Container from 'hometown-components-dev/lib/ContainerHtV1';
import Section from 'hometown-components-dev/lib/SectionHtV1';
// import Row from 'hometown-components-dev/lib/RowHtV1';

const TitleBar = ({ children }) => (
  <Section my={0} p="24px 10px" bg="bg">
    <Container type="container" pr="0" pl="0">
      {children}
    </Container>
  </Section>
);

TitleBar.defaultProps = {
  // title: '',
  // productCount: ''
};

TitleBar.propTypes = {
  // title: PropTypes.string,
  // productCount: PropTypes.string,
  children: PropTypes.object.isRequired
};

export default TitleBar;
