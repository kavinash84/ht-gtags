import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Components
 */
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Container from 'hometown-components-dev/lib/ContainerHtV1';
import Row from 'hometown-components-dev/lib/RowHtV1';
import Text from 'hometown-components-dev/lib/TextHtV1';

const TopBar = () => (
  <Box bg="bgPrimary">
    <Container>
      <Row height={35} variant="row.alignCenter" justifyContent="flex-end" pr={[18, 18, 0]}>
        <Link to="/track-order">
          <Text variant="heading.small" color="white" pr={30}>
            Track Order
          </Text>
        </Link>
        <a href="https://blog.hometown.in" rel="noreferrer noopener" target="_balnk">
          <Text variant="heading.small" color="white">
            Blog
          </Text>
        </a>
      </Row>
    </Container>
  </Box>
);

export default TopBar;
