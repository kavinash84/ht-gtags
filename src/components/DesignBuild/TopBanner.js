import React from 'react';
import Box from 'hometown-components-dev/lib/BoxHtV1';
// import Flex from 'hometown-components-dev/lib/FlexHtV1';
// import Heading from 'hometown-components-dev/lib/HeadingHtV1';
import Image from 'hometown-components-dev/lib/ImageHtV1';
import Text from 'hometown-components-dev/lib/TextHtV1';
import Button from 'hometown-components-dev/lib/ButtonHtV1';
import { connect } from 'react-redux';

// const logo = require('../../static/designBuildLogo.svg');
const styles = require('./Designbuild.scss');

@connect(({ designbuild }) => ({
  designbuild,
  topBanner: designbuild.data.items.text.topBanner
}))

class TopBanner extends React.Component {
 
  render() {
    const { topBanner }  = this.props;
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
        <Box style={{ height: '70%', width: '300px', backgroundColor: 'white' }} className={styles.sub}>
          <Image data-src={topBanner.image} src={`${topBanner.image}?blur=30`} alt="topbanner" style={{ objectFit: 'cover', width: '85%', marginLeft: '7.5%' }} />
          <Text
            style={{
              color: '#666666',
              fontSize: '16px',
              textAlign: 'center',
              padding: '0px 30px 10px',
              lineHeight: '30px'
            }}
          >
{topBanner.description}
          </Text>
          <Button
           onClick={this.props.handleModal}
            style={{
              width: '70%',
              height: '50px',
              backgroundColor: 'white',
              color: '#F47020',
              border: '1px solid #F47020',
              marginLeft: '15%',
              borderRadius: '5px'
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
