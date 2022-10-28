import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/**
 * Components
 */
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Text from 'hometown-components-dev/lib/TextHtV1';

/**
 * helpers
 */
import {
  MY_ORDER_URL,
  MY_PROFILE_URL,
  MY_ADDRESS_URL,
  MY_CASES_URL,
  MY_DASHBOARD_URL,
  // MY_HOMETOWN_WALLET_URL
} from 'helpers/Constants';

const MenuItem = ({ text, to, ...props }) => (
  <Box pb={10} {...props}>
    <Link to={to}>
      <Text variant="small" {...props}>
        {text}
      </Text>
    </Link>
  </Box>
);

MenuItem.defaultProps = {
  to: 'order',
  text: ''
};

MenuItem.propTypes = {
  to: PropTypes.string,
  text: PropTypes.string
};

const MyOrder = ({ page }) => (
  <Fragment>
    <Box
      pt={30}
      pb={10}
      sx={{
        borderBottom: 'divider'
      }}
    >
      <MenuItem
        to={MY_DASHBOARD_URL}
        pb={0}
        text="Dashboard"
        fontFamily="medium"
        color={page === 'order' ? 'primary' : 'textPrimary'}
      />
    </Box>
    <Box
      py={20}
      sx={{
        borderBottom: 'divider'
      }}
    >
      <Text variant="small" color="textLight" fontSize={12} fontFamily="light" pb={12}>
        ORDER
      </Text>
      <MenuItem to={MY_ORDER_URL} pb={0} text="Order & Returns" color={page === 'order' ? 'primary' : 'textPrimary'} />
    </Box>
    <Box
      py={20}
      sx={{
        borderBottom: 'divider'
      }}
    >
      <Text variant="small" color="textLight" fontSize={12} fontFamily="light" pb={12}>
        ACCOUNT
      </Text>

      <MenuItem to={MY_PROFILE_URL} text="My Profile" color={page === 'profile' ? 'primary' : 'textPrimary'} />
      <MenuItem to={MY_ADDRESS_URL} text="My Address" color={page === 'address' ? 'primary' : 'textPrimary'} />
      {/* <MenuItem
        // to={MY_HOMETOWN_WALLET_URL}
        text="My Hometown Wallet"
        color={page === 'hometownwallet' ? 'primary' : 'textPrimary'}
        pb={0}
      /> */}
    </Box>
    <Box py={20}>
      <Text variant="small" color="textLight" fontSize={12} fontFamily="light" pb={12}>
        COMPLAINTS
      </Text>
      <MenuItem to={MY_CASES_URL} text="My Cases" color={page === 'cases' ? 'primary' : 'textPrimary'} pb={0} />
    </Box>
  </Fragment>
);

MyOrder.defaultProps = {
  page: 'order'
};

MyOrder.propTypes = {
  page: PropTypes.string
};

export default MyOrder;
