import React from 'react';
import PropTypes from 'prop-types';

/* ====== Components ====== */
import Col from 'hometown-components-dev/lib/ColHtV1';
import Image from 'hometown-components-dev/lib/ImageHtV1';
import Text from 'hometown-components-dev/lib/TextHtV1';

const UspItem = ({ src, children }) => (
  <Col variant="colBasis" flexDirection="column">
    <Image src={src} height={[40, 40, 50, 60]} alt={children} />
    <Text variant="uspTitle" mt={16}>
      {children}
    </Text>
  </Col>
);

UspItem.defaultProps = {};

UspItem.propTypes = {
  src: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired
};

export default UspItem;
