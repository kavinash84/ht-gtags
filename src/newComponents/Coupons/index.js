import React, { Component } from 'react';

/**
 * Components
 */
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Row from 'hometown-components-dev/lib/RowHtV1';
import Button from 'hometown-components-dev/lib/ButtonHtV1';
import CouponsCard from './Card';

class CouponsContainer extends Component {
  render() {
    return (
      <Box width={4 / 5} px={10}>
        <Row
          mb={40}
          sx={{
            borderBottom: 'divider'
          }}
        >
          <Button width={120} height={40} variant="link" bg="white">
            ACTIVE
          </Button>
          <Button
            width={120}
            height={40}
            variant="linkPrimary"
            bg="white"
            sx={{
              border: 'divider',
              borderBottom: 'none',
              top: 1,
              position: 'relative'
            }}
          >
            MISSED
          </Button>
        </Row>
        <CouponsCard />
        <CouponsCard />
        <CouponsCard />
      </Box>
    );
  }
}

export default CouponsContainer;
