import React from 'react';
import Box from 'hometown-components-dev/lib/BoxHtV1';
// import Flex from 'hometown-components-dev/lib/FlexHtV1';
// import Heading from 'hometown-components-dev/lib/HeadingHtV1';
import Image from 'hometown-components-dev/lib/ImageHtV1';
import Text from 'hometown-components-dev/lib/TextHtV1';
import Button from 'hometown-components-dev/lib/ButtonHtV1';

const logo = require('../../static/designBuildLogo.png');
const styles = require('./Designbuild.scss');

class TopBanner extends React.Component {
  render() {
    return (
      <Box className={styles.main}>
        <Image
          src="https://www.hometown.in/media/cms/D/Top-Image-Living1.jpg"
          alt="topbanner"
          width="100%"
          height="550px"
          style={{ objectFit: 'cover' }}
        />
        <Box style={{ height: '70%', width: '300px', backgroundColor: 'white' }} className={styles.sub}>
          <Image src={logo} alt="topbanner" style={{ objectFit: 'cover', width: '50%', marginLeft: '25%' }} />
          <Text
            style={{
              color: '#666666',
              fontSize: '18px',
              textAlign: 'center',
              padding: '20px 20px',
              lineHeight: '30px'
            }}
          >
            One-Stop Customised Interior Design Solutions With Professional Exceution
          </Text>
          <Button
            style={{
              width: '80%',
              height: '50px',
              backgroundColor: 'white',
              color: '#F47020',
              border: '1px solid #F47020',
              marginLeft: '10%',
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
