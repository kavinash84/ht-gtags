import React from 'react';
import { Link } from 'react-router-dom';
/**
 * Components
 */
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Text from 'hometown-components-dev/lib/TextHtV1';
import Image from 'hometown-components-dev/lib/ImageHtV1';
import Button from 'hometown-components-dev/lib/ButtonHtV1';
import { CART_URL } from 'helpers/Constants';

const PaymentFailedIcon = require('../../../static/failed.svg');

const PaymentFailure = () => (
  <Box textAlign="center" py={30}>
    <Image width="100px" src={PaymentFailedIcon} alt="Error During Payment" mb={20} />
    <Text color="primary" fontSize={40} textAlign="center" pb={15}>
      Please try again later !
    </Text>
    <Text color="textLight" textAlign="center" width={1} fontSize={20} fontWeight={500} pb={40}>
      There is an issue with Bajaj Finance. Please try another Payment Method to complete your transaction
    </Text>
    <Link to={CART_URL}>
      <Button fontSize={16} py={15} px={40} height="auto">
        Try again
      </Button>
    </Link>
  </Box>
);

export default PaymentFailure;
