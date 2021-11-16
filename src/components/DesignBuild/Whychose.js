/* eslint-disable object-curly-spacing */
import React from 'react';
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Flex from 'hometown-components-dev/lib/FlexHtV1';
import Heading from 'hometown-components-dev/lib/HeadingHtV1';
import Image from 'hometown-components-dev/lib/ImageHtV1';
import Text from 'hometown-components-dev/lib/TextHtV1';
import Button from 'hometown-components-dev/lib/ButtonHtV1';

const logo = require('../../static/designBuildLogo.png');
const styles = require('./Designbuild.scss');

class WhyChose extends React.Component {
  render() {
    return (
      <Box mt="80px">
        <Box>
          <Heading style={{ color: '#323131', fontSize: '40px', textAlign: 'center' }}>Why Choose Us?</Heading>
          <Text
            style={{
              color: '#888888',
              fontSize: '24px',
              textAlign: 'center',
              width: '80%',
              marginLeft: '10%',
              lineHeight: '35px',
              marginTop: '25px'
            }}
          >
            At DuraCucine, we bring you more than 15 years of expertise in kitchen solutions that are perfected for the
            Indian homes.
          </Text>
        </Box>
        <Box mt="20px">
          <Image
            src="https://www.hometown.in/media/cms/D/Top-Image-Living1.jpg"
            alt="topbanner"
            width="100%"
            height="550px"
            style={{ objectFit: 'cover' }}
          />
        </Box>
        <Box className={styles.whyus}>
          <div className={styles.outerbox1}>
            <div style={{ borderRight: '2px dashed #707070' }} className={styles.innerbox}>
              <text className={styles.boldtext}>27</text>
              <text>cities</text>
              <p>&nbsp;</p>
              <p>&nbsp;</p>
            </div>
            <div style={{ borderRight: '2px dashed #707070' }} className={styles.innerbox}>
              <text className={styles.boldtext}>45</text>
              <text>Design</text>
              <text>Studios</text>
            </div>
            <div style={{ borderRight: '2px dashed #707070' }} className={styles.innerbox}>
              <text className={styles.boldtext}>1.5 MILLION+</text> <text>Homes</text>
              <text>Designed</text>
            </div>
            <div className={styles.innerbox}>
              <text className={styles.boldtext}>END TO END</text>
              <text>Project</text>
              <text>Management</text>
            </div>
          </div>
          <div className={styles.outerbox2}>
            <div style={{ borderRight: '2px dashed #707070' }} className={styles.innerbox}>
              <text className={styles.boldtext}>100+</text>
              <text>In-House</text>
              <text>Designers</text>
            </div>
            <div style={{ borderRight: '2px dashed #707070' }} className={styles.innerbox}>
              <text className={styles.boldtext}>200+</text>
              <text>Empanelled</text>
              <text>Contractors</text>
            </div>
            <div style={{ borderRight: '2px dashed #707070' }} className={styles.innerbox}>
              <text className={styles.boldtext}>FREE</text>
              <text>Service</text>
              <text>Visits</text>
            </div>
            <div className={styles.innerbox}>
              <text className={styles.boldtext}>100%</text>
              <text>Transparent</text>
              <text>Pricing</text>
            </div>
          </div>
        </Box>
      </Box>
    );
  }
}

export default WhyChose;
