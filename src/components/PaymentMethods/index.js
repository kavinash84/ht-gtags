import React from 'react';
import Div from 'hometown-components/lib/Div';
import Row from 'hometown-components/lib/Row';
import Heading from 'hometown-components/lib/Heading';
import Img from 'hometown-components/lib/Img';

const aeIcon = require('../../../static/american-express.svg');
const maestroIcon = require('../../../static/maestro.svg');
const mastercardIcon = require('../../../static/mastercard.svg');
const visaIcon = require('../../../static/visa.svg');
const intBankingIcon = require('../../../static/net-banking.png');
const walletIcon = require('../../../static/wallet-icon.png');

const PaymentMethods = () => (
  <Div mt="1rem" pl="0.625rem" pr="0.625rem">
    <Heading fontSize="1em" mb="0.625rem" color="secondary">
      We Accept
    </Heading>
    <Row ml="0" mr="0">
      <Div col="2" mb="0" p="0 5px">
        <Img src={visaIcon} alt="visaCard" width="100%" />
      </Div>
      <Div col="2" mb="0" p="0 5px">
        <Img src={mastercardIcon} alt="Master Card" width="100%" />
      </Div>
      <Div col="2" mb="0" p="0 5px">
        <Img src={maestroIcon} alt="Maestro" width="100%" />
      </Div>
      <Div col="2" mb="0" p="0 5px">
        <Img src={aeIcon} alt="Amex" width="100%" />
      </Div>
      <Div col="2" mb="0" p="6px 5px">
        <Img src={intBankingIcon} alt="Diners Club" width="100%" />
      </Div>
      <Div col="2" mb="0" p="5px 5px">
        <Img height="24px" src={walletIcon} alt="Wallet" width="100%" />
      </Div>
    </Row>
  </Div>
);

export default PaymentMethods;
