import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import Container from 'hometown-components-dev/lib/ContainerHtV1';
import Box from 'hometown-components-dev/lib/BoxHtV1';

const mapStateToProps = ({ services }) => ({
  ...services.promotions
});

/* eslint-disable react/no-danger */
const Promotions = ({ data }) => (
  <Container pt={[40, 40, 40, 60]}>
    {data.items && data.items.text && (
      <Box
        color="rgba(0,0,0,0.5)"
        fontSize="0.875rem"
        mb="1rem"
        dangerouslySetInnerHTML={{ __html: data.items.text }}
      />
    )}
  </Container>
);

Promotions.defaultProps = {
  data: {}
};

Promotions.propTypes = {
  data: PropTypes.object
};
export default connect(mapStateToProps)(Promotions);
