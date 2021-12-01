/* eslint-disable object-curly-spacing */
import React from 'react';
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Flex from 'hometown-components-dev/lib/FlexHtV1';
import Heading from 'hometown-components-dev/lib/HeadingHtV1';
import Image from 'hometown-components-dev/lib/ImageHtV1';
import Text from 'hometown-components-dev/lib/TextHtV1';
import Button from 'hometown-components-dev/lib/ButtonHtV1';
import { connect } from 'react-redux';

const logo = require('../../static/designBuildLogo.png');
const styles = require('./ModularWardrobe.scss');

@connect(({ modularwardrobe }) => ({
  modularwardrobe,
  whyChooseUs: modularwardrobe.data.items.text.whyChooseUs
}))

class WhyChose extends React.Component {
  render() {
    const { whyChooseUs }  = this.props;
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
            {whyChooseUs.description}
          </Text>
        </Box>
        <Box mt="20px" className={styles.pos}>
          <Image
            src={whyChooseUs.image}
            alt="topbanner"
            width="100%"
            height="550px"
            style={{ objectFit: 'cover' }}
          />
        </Box>
        <div className={styles.whyus}>
          <div className={styles.outerbox1}>
            <div style={{ borderRight: '2px dashed #DCDCDC' }} className={styles.innerbox}>
              <text className={styles.boldtext}>27</text>
              <text>cities</text>
            </div>
            <div style={{ borderRight: '2px dashed #DCDCDC' }} className={styles.innerbox}>
              <text className={styles.boldtext}>45</text>
              <text>Design Studios</text>
            </div>
            <div style={{ borderRight: '2px dashed #DCDCDC' }} className={styles.innerbox}>
              <text className={styles.boldtext}>1.5 MILLION+</text> <text>Homes Designed</text>
            </div>
            <div className={styles.innerbox}>
              <text className={styles.boldtext}>END TO END</text>
              <text>Project Management</text>
            </div>
          </div>
          <div className={styles.outerbox2}>
            <div style={{ borderRight: '2px dashed #DCDCDC' }} className={styles.innerbox}>
              <text className={styles.boldtext}>100+</text>
              <text>In-House Designers</text>
            </div>
            <div style={{ borderRight: '2px dashed #DCDCDC' }} className={styles.innerbox}>
              <text className={styles.boldtext}>200+</text>
              <text>Empanelled Contractors</text>
            </div>
            <div style={{ borderRight: '2px dashed #DCDCDC' }} className={styles.innerbox}>
              <text className={styles.boldtext}>FREE</text>
              <text>Service Visits</text>
            </div>
            <div className={styles.innerbox}>
              <text className={styles.boldtext}>100%</text>
              <text>Transparent Pricing</text>
            </div>
          </div>
        </div>
      </Box>
    );
  }
}

export default WhyChose;
