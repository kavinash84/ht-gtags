import React from 'react';
import BoxHtV1 from 'hometown-components-dev/lib/BoxHtV1';
import RowHtV1 from 'hometown-components-dev/lib/RowHtV1';
import HeadingHtV1 from 'hometown-components-dev/lib/HeadingHtV1';
import ImageHtV1 from 'hometown-components-dev/lib/ImageHtV1';

const aeIcon = require('../../../static/american-express.svg');
const maestroIcon = require('../../../static/maestro.svg');
const mastercardIcon = require('../../../static/mastercard.svg');
const visaIcon = require('../../../static/visa.svg');
const intBankingIcon = require('../../../static/net-banking.png');
const walletIcon = require('../../../static/wallet-icon.png');

const PaymentMethods = () => (
  <BoxHtV1 mt="1rem" pl="0.625rem" pr="0.625rem">
    <BoxHtV1 variant="col-12" p="0">
      <HeadingHtV1
        sx={{
          position: 'absolute',
          fontSize: '1em',
          marginBottom: '0.625rem',
          top: '-7px',
          zIndex: 1,
          right: '69px',
          color: '#474747',
          bg: '#f5f5f5'
        }}
      >
        Gauranteed Secure Checkout
      </HeadingHtV1>
    </BoxHtV1>
    <RowHtV1 ml="0" mr="0" sx={{ border: '2px solid #979797', position: 'relative' }}>
      <BoxHtV1 variant="col-2" mb="0" p="0 5px">
        <ImageHtV1 src={visaIcon} alt="visaCard" width="100%" />
      </BoxHtV1>
      <BoxHtV1 variant="col-2" mb="0" p="0 5px">
        <ImageHtV1 src={mastercardIcon} alt="Master Card" width="100%" />
      </BoxHtV1>
      <BoxHtV1 variant="col-2" mb="0" p="0 5px">
        <ImageHtV1 src={maestroIcon} alt="Maestro" width="100%" />
      </BoxHtV1>
      <BoxHtV1 variant="col-2" mb="0" p="0 5px">
        <ImageHtV1 src={aeIcon} alt="Amex" width="100%" />
      </BoxHtV1>
      <BoxHtV1 variant="col-2" mb="0" p="6px 5px">
        <ImageHtV1 src={intBankingIcon} alt="Diners Club" width="100%" />
      </BoxHtV1>
      <BoxHtV1 variant="col-2" mb="0" p="5px 5px">
        <ImageHtV1 src={walletIcon} alt="Wallet" width="100%" />
      </BoxHtV1>
    </RowHtV1>
  </BoxHtV1>
);

export default PaymentMethods;
