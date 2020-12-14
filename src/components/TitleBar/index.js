import React from 'react';
import PropTypes from 'prop-types';

/**
 * Components
 */
import Heading from 'hometown-components-dev/lib/HeadingHtV1';

const TitleBar = ({ title, productCount }) => (
  <Heading>
    {title} {productCount && `(${productCount})`}
  </Heading>
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
