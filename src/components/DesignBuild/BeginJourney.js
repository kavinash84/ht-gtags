/* eslint-disable max-len */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Flex from 'hometown-components-dev/lib/FlexHtV1';
import Heading from 'hometown-components-dev/lib/HeadingHtV1';
import Image from 'hometown-components-dev/lib/ImageHtV1';
import Text from 'hometown-components-dev/lib/TextHtV1';
import Button from 'hometown-components-dev/lib/ButtonHtV1';

@connect(({ designbuild }) => ({
  designbuild,
  beginJourney: designbuild.data.items.text.beginJourney
}))

class BeginJourney extends React.Component {
  render() {
    const { beginJourney } = this.props;
    return (
      <Box mt="250px">
        <Flex style={{ width: '100%' }}>
          <Box style={{ width: '70%', height: '370px', backgroundColor: '#F5EEEE' }}>
            <Flex style={{ flexDirection: 'column' }}>
              <Heading style={{
 marginTop: '8%', marginLeft: '20%', fontSize: '40px', lineHeight: '50px'
}}
              >
                Begin The Journey To <br /> Your Dream <br /> Home Interiors
              </Heading>
              <Button
              onClick={this.props.handleModal}
                style={{
                  width: '200px',
                  height: '50px',
                  backgroundColor: '#F5EEEE',
                  color: '#F47020',
                  border: '1px solid #F47020',
                  borderRadius: '5px',
                  marginLeft: '20%',
                  marginTop: '50px',
                  textTransform:'none'
                }}
              >
                Speak to our Expert
              </Button>
            </Flex>
          </Box>
          <Image src={beginJourney.imageSrc}
            style={{
              width: '30%',
              height: '520px',
              marginTop: '-150px'
            }}
          />
        </Flex>
      </Box>
    );
  }
}

export default BeginJourney;
