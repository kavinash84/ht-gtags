import React from 'react';

/**
 * Components
 */
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Flex from 'hometown-components-dev/lib/FlexHtV1';
import Heading from 'hometown-components-dev/lib/HeadingHtV1';
import Image from 'hometown-components-dev/lib/ImageHtV1';

/**
 * Icons
 */
const aeIcon = require('../../../static/american-express.svg');
const maestroIcon = require('../../../static/maestro.svg');
const mastercardIcon = require('../../../static/mastercard.svg');
const visaIcon = require('../../../static/visa.svg');
const intBankingIcon = require('../../../static/net-banking.png');
const walletIcon = require('../../../static/wallet-icon.png');

const AcceptedPaymentOptions = () => (
  <Box variant="col-12" pb={20}>
    <Heading color="textSecondary" fontWeight="normal" fontSize={[15, 15, 18]} pb={10}>
      Accepted Payment Options
    </Heading>
    <Flex >
      <Image src={visaIcon} alt="visaCard" height={30} />
      <Image src={mastercardIcon} alt="Master Card" height={30} />
      <Image src={maestroIcon} alt="Maestro" height={30} />
      <Image src={aeIcon} alt="Amex" height={30} />
      <Image src={intBankingIcon} alt="Diners Club" height={30} />
      <Image src={walletIcon} alt="Wallet" height={30} />
    </Flex>
  </Box>
);

export default AcceptedPaymentOptions;
