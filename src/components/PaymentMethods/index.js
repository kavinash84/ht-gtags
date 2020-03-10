import React from 'react';

/**
 * Components
 */
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Flex from 'hometown-components-dev/lib/FlexHtV1';
import Heading from 'hometown-components-dev/lib/HeadingHtV1';
import Text from 'hometown-components-dev/lib/TextHtV1';
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

const PaymentMethods = () => (
  <Box textAlign="center" py={10} sx={{ border: '2px solid #979797', position: 'relative' }}>
    <Heading
      sx={{
        position: 'absolute',
        fontSize: 14,
        top: '-7px',
        zIndex: 1,
        left: 40,
        color: '#474747',
        bg: '#f5f5f5'
      }}
    >
      Guaranteed Secure Checkout
    </Heading>
    <Text variant="smallSecondary" py={5}>
      verified by
    </Text>
    <Flex justifyContent="space-between" px={15}>
      <Image src={visaIcon} alt="visaCard" height={30} />
      <Image src={mastercardIcon} alt="Master Card" height={30} />
      <Image src={maestroIcon} alt="Maestro" height={30} />
      <Image src={aeIcon} alt="Amex" height={30} />
      <Image src={intBankingIcon} alt="Diners Club" height={30} />
      <Image src={walletIcon} alt="Wallet" height={30} />
    </Flex>
  </Box>
);

export default PaymentMethods;
