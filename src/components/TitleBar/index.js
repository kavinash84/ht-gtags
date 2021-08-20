import React from 'react';
import PropTypes from 'prop-types';

/**
 * Components
 */
import Heading from 'hometown-components-dev/lib/HeadingHtV1';

const TitleBar = ({ title, productCount, marginLeftTop }) => (
  <Heading as="h1" ml={marginLeftTop} mt="2rem">
    {title} {productCount && `(${productCount})`}
  </Heading>
);

TitleBar.defaultProps = {
  title: '',
  productCount: '',
  marginLeftTop: 0
};

TitleBar.propTypes = {
  title: PropTypes.string,
  productCount: PropTypes.string,
  marginLeftTop: PropTypes.any
};

export default TitleBar;
