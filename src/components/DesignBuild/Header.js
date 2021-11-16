import React, { Component } from 'react';
import Section from 'hometown-components-dev/lib/SectionHtV1';
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Flex from 'hometown-components-dev/lib/FlexHtV1';
import Heading from 'hometown-components-dev/lib/HeadingHtV1';
import Image from 'hometown-components-dev/lib/ImageHtV1';
import Text from 'hometown-components-dev/lib/TextHtV1';
import Button from 'hometown-components-dev/lib/ButtonHtV1';

const logo = require('../../static/duracucine.png');
const styles = require('./Designbuild.scss');

class Header extends React.Component {
    render() {
        return (
          <Section style={{
 display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px', marginBottom: '10px', fontFamily: 'Helvetica Neue'
}}
          >
            <div style={{ marginLeft: '10%' }}>
              <Image src={logo} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={{ marginRight: '40px' }}>Plan Your Kitchen</Text>
              <Text style={{ marginRight: '40px' }}>About Us</Text>
              <Button style={{
 width: '200px', height: '50px', backgroundColor: 'white', color: '#F47020', border: '1px solid #F47020', borderRadius: '5px', marginRight: '150px'
}}
              >
                Request Quote
              </Button>
            </div>
          </Section>
        );
    }
}

export default Header;
