import React, { Component, Fragment } from 'react';

/**
 * Components
 */
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Container from 'hometown-components-dev/lib/ContainerHtV1';

/* ====== Page Components ====== */
import HeaderTopSecondary from './HeaderTopSecondary';
import TopBar from '../Header/TopBar';

export default class HeaderSecondary extends Component {
  render() {
    return (
      <Fragment>
        <TopBar />
        <Box pt={15} sx={{ borderBottom: 'solid 1px #727070' }}>
          <Container pr="0" pl="0" mb={10}>
            <HeaderTopSecondary />
          </Container>
        </Box>
      </Fragment>
    );
  }
}
