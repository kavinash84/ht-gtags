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
      <Row height={35} variant="row.alignCenter" justifyContent="flex-end">
        <Link to="/track-order">
          <Text variant="heading.small" color="white" pr={30}>
            Track Order
          </Text>
        </Link>
        <Link to="/blog">
          <Text variant="heading.small" color="white">
            Blog
          </Text>
        </Link>
      </Row>
    </Container>
  </Box>
);

export default TopBar;
