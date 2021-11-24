import React, { Component } from 'react';
import { connect } from 'react-redux';
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Section from 'hometown-components-dev/lib/SectionHtV1';
import Row from 'hometown-components-dev/lib/RowHtV1';
import Heading from 'hometown-components-dev/lib/HeadingHtV1';
import Image from 'hometown-components-dev/lib/ImageHtV1';
import Text from 'hometown-components-dev/lib/TextHtV1';
import Button from 'hometown-components-dev/lib/ButtonHtV1';

class SpacesWeDesign extends React.Component {
    render() { 
        return (
            <Box mt="70px">
                <Heading 
                 style={{
            fontSize: '40px',
            fontWeight: 600,
            marginBottom: '5px',
            color: 'black',
            textAlign: 'center'
          }}>
                Spaces We Design
                </Heading>
                <Text
                style={{fontSize: "20px", color: "#888888", marginBottom: "40px", width: "70%", textAlign: 'center', marginLeft: '15%', marginTop: '30px' }}
                >
                As one of the largest design set-up with over 15 years of experience in home interiors, no one offers what we do
                </Text>
            </Box>
        );
    }
}
 
export default SpacesWeDesign;