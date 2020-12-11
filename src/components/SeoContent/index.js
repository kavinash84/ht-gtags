import React from 'react';
import PropTypes from 'prop-types';
import Container from 'hometown-components-dev/lib/ContainerHtV1';
import SeoContent from 'hometown-components-dev/lib/SeoContent';

const Seo = ({ children }) => (
  <SeoContent>
    <Container>{children}</Container>
  </SeoContent>
);

Seo.defaultProps = {
  children: {}
};

Seo.propTypes = {
  children: PropTypes.objectOf(PropTypes.any)
};

export default Seo;
