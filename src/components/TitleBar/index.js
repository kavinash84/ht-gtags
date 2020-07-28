import React from 'react';
import PropTypes from 'prop-types';

/**
 * Components
 */
import Heading from 'hometown-components-dev/lib/HeadingHtV1';
import Row from 'hometown-components-dev/lib/RowHtV1';

const TitleBar = ({ title, productCount, marginLeft }) => (
  <Row>
    <Heading ml={marginLeft} mt={30}>
      {title} {productCount && `(${productCount})`}
    </Heading>
  </Row>
);

TitleBar.defaultProps = {
  title: '',
  productCount: '',
  marginLeft: 120
};

TitleBar.propTypes = {
  title: PropTypes.string,
  productCount: PropTypes.string,
  marginLeft: PropTypes.string
};

export default TitleBar;
