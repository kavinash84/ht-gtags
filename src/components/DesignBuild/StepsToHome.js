import React, { Component } from 'react';
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Flex from 'hometown-components-dev/lib/FlexHtV1';
import Heading from 'hometown-components-dev/lib/HeadingHtV1';
import Image from 'hometown-components-dev/lib/ImageHtV1';
import Text from 'hometown-components-dev/lib/TextHtV1';
import Button from 'hometown-components-dev/lib/ButtonHtV1';
import Section from 'hometown-components-dev/lib/SectionHtV1';
import StepsMain from './StepsMain';

const styles = require('./Designbuild.scss');

class StepsToYourHome extends React.Component {
    render() { 
        return(
            <Box mt="70px">
              <Flex >
                  <Image src="https://www.hometown.in/media/cms/D/Top-Image-Living1.jpg" style={{width: '55%', height: '750px'}}/>
                  <Box style={{width:'45%', height:'750px', backgroundColor: '#F5F5F5'}}>
                      <StepsMain />
                  </Box>
              </Flex>
            </Box>
        );
    }
}
 
export default StepsToYourHome;