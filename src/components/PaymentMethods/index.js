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

const PaymentMethods = props => (
  <Box
    textAlign="center"
    pt={[20, 20, 10]}
    pb={10}
    sx={{ border: '2px solid #979797', position: 'relative' }}
    m={['0 -15px', '0 -15px', 0]}
    {...props}
  >
    <Heading
      sx={{
        position: 'absolute',
        fontSize: 14,
        top: [-13, -13, -7],
        left: [16, 16, 40],
        zIndex: 1,
        color: '#474747',
        bg: '#f5f5f5',
        width: [150, 150, 'auto']
      }}
    >
      Guaranteed Secure Checkout
    </Heading>
    <Text variant="smallSecondary" py={5}>
      verified by
    </Text>
    <Flex
      justifyContent={['flex-start', 'flex-start', 'space-between']}
      px={15}
      sx={{ flexWrap: ['wrap', 'wrap', 'nowrap'] }}
    >
      <Image src={visaIcon} alt="visaCard" height={30} mr={[5, 5, 0]} mb={[5, 5, 0]} sx={{ flexShrink: 0 }} />
      <Image src={mastercardIcon} alt="Master Card" height={30} mr={[5, 5, 0]} mb={[5, 5, 0]} sx={{ flexShrink: 0 }} />
      <Image src={maestroIcon} alt="Maestro" height={30} mr={[5, 5, 0]} mb={[5, 5, 0]} sx={{ flexShrink: 0 }} />
      <Image src={aeIcon} alt="Amex" height={30} mr={[5, 5, 0]} mb={[5, 5, 0]} sx={{ flexShrink: 0 }} />
      <Image src={intBankingIcon} alt="Diners Club" height={30} mr={[5, 5, 0]} mb={[5, 5, 0]} sx={{ flexShrink: 0 }} />
      <Image src={walletIcon} alt="Wallet" height={30} mr={[5, 5, 0]} mb={[5, 5, 0]} sx={{ flexShrink: 0 }} />
    </Flex>
  </Box>
);

export default PaymentMethods;
