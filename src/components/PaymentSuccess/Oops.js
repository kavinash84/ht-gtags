import React from 'react';
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Image from 'hometown-components-dev/lib/ImageHtV1';
import Empty from 'hometown-components-dev/lib/EmptyHtV1';
// import { CART_URL } from 'helpers/Constants';

const PaymentFailedIcon = require('../../../static/failed.svg');

const PaymentOops = () => (
  <Box>
    <Empty title="Duhh !!! Something Fishy " subTitle="" btnName="Go to Home" url="/" bg="#fafafa">
      <Image width="100px" src={PaymentFailedIcon} m="auto" alt="Error During Payment" />
    </Empty>
  </Box>
);

export default PaymentOops;
