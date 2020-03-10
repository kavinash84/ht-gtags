import React, { Component } from 'react';

/**
 * Components
 */
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Container from 'hometown-components-dev/lib/ContainerHtV1';

/* ====== Page Components ====== */
import HeaderTopSecondary from './HeaderTopSecondary';

export default class HeaderSecondary extends Component {
  render() {
    return (
      <Box py={15} sx={{ borderBottom: 'solid 1px #727070' }}>
        <Container pr="0" pl="0">
          <HeaderTopSecondary {...this.props} />
        </Container>
      </Box>
    );
  }
}
