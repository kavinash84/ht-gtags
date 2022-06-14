import React from 'react';
import Box from 'hometown-components-dev/lib/BoxHtV1';
// import Flex from 'hometown-components-dev/lib/FlexHtV1';
import Heading from 'hometown-components-dev/lib/HeadingHtV1';
import Image from 'hometown-components-dev/lib/ImageHtV1';
import Text from 'hometown-components-dev/lib/TextHtV1';
import Button from 'hometown-components-dev/lib/ButtonHtV1';
import { connect } from 'react-redux';

const logo = require('../../static/designBuildLogo.png');
const styles = require('./HomeInterior.scss');

@connect(({ homeinterior }) => ({
  homeinterior,
  topBanner: homeinterior.data.items.text.topBanner
}))

class TopBanner extends React.Component {

  render() {
    const { topBanner } = this.props;
    return (
      <Box className={styles.main}>
        <Image
          data-src={topBanner.img}
          src={`${topBanner.img}?blur=30`}
          alt="topbanner"
          width="100%"
          height="650px"
          style={{ objectFit: 'cover' }}
        />
        <Box style={{ height: '50%', width: '350px', backgroundColor: 'white' }} className={styles.sub}>
          {/* <Image src={topBanner.image} alt="topbanner" style={{ objectFit: 'cover', width: '50%', marginLeft: '25%' }} /> */}
          <Text
            style={{
              color: '#323131',
              fontSize: '35px',
              textAlign: 'center',
              padding: '70px 20px 0px',
              lineHeight: '30px',
              backgroundColor: '#F8F2F2'
            }}
          >
            Home Interiors
          </Text>
          <Heading
            style={{
              color: '#323131',
              fontSize: '35px',
              textAlign: 'center',
              padding: ' 5px 20px',
              lineHeight: '30px'
            }}
          >
            at Home<span style={{ color: '#F15922' }}>Town</span>
          </Heading>
          <Text
            style={{
              color: '#666666',
              fontSize: '16px',
              textAlign: 'center',
              padding: '15px 25px 25px',
              lineHeight: '30px'
            }}
          >
            {topBanner.description}
          </Text>
          <Button
            onClick={this.props.handleModal}
            style={{
              width: '60%',
              height: '50px',
              backgroundColor: 'white',
              color: '#F47020',
              border: '1px solid #F47020',
              marginLeft: '20%',
              borderRadius: '5px',
              textTransform: 'none'
            }}
          >
            Book a Consultation
          </Button>
        </Box>
      </Box>
    );
  }
}
export default TopBanner;
