import React from 'react';
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Text from 'hometown-components-dev/lib/TextHtV1';
import Flex from 'hometown-components-dev/lib/FlexHtV1';
import Image from 'hometown-components-dev/lib/ImageHtV1';

const styles = require('./Icons.scss');

const warranty = require('../../../static/pdp icons/36-months-warranty.png');
const Emi = require('../../../static/pdp icons/EMI-icon.png');
const safe = require('../../../static/pdp icons/Free-&-Safe-delivery-icon.png');
const noquestion = require('../../../static/pdp icons/No-questions-asked-returns.png');

const Icons = () =>{
    return ( 
      <Box>
        <Flex col-3 justifyContent="center" alignItems="center" >
          <Box className={styles.boxes}>
            <Image src={Emi} />
            <Text fontSize="9px" lineHeight="13px" >EMI from ₹321  <a href>Know more</a> </Text>
          </Box>
          <Box className={styles.boxes}>
            <Image src={warranty} />
            <Text fontSize="9px" lineHeight="13px">36 Months' Warranty</Text>
          </Box>
          <Box className={styles.boxes}>
            <Image src={noquestion} />
            <Text fontSize="9px" lineHeight="13px">No Questions Asked Returns</Text>
          </Box>
          <Box className={styles.boxes}>
            <Image src={safe} />
            <Text fontSize="9px" lineHeight="13px">Free and Safe Delivery</Text>
          </Box>
        </Flex>
        <div className={styles.dots}>
            
        </div>
      </Box>
     );
};
export default Icons;
