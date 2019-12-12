import React from 'react';
import PropTypes from 'prop-types';

/* ====== Components ====== */
import ColHtV1 from 'hometown-components-dev/lib/ColHtV1';
import ImageHtV1 from 'hometown-components-dev/lib/ImageHtV1';
import TextHtV1 from 'hometown-components-dev/lib/TextHtV1';

const UspItem = ({ src, children }) => (
  <ColHtV1 flexDirection="column">
    <ImageHtV1 src={src} height="60px" alt="Free Delivery" />
    <TextHtV1 variant="uspTitle" mt={16}>
      {children}
    </TextHtV1>
  </ColHtV1>
);

UspItem.defaultProps = {};

UspItem.propTypes = {
  src: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired
};

export default UspItem;
