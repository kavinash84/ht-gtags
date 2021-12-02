import React, { Component } from 'react';
import { connect } from 'react-redux';
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Section from 'hometown-components-dev/lib/SectionHtV1';
import Row from 'hometown-components-dev/lib/RowHtV1';
import Heading from 'hometown-components-dev/lib/HeadingHtV1';
import Image from 'hometown-components-dev/lib/ImageHtV1';
import Text from 'hometown-components-dev/lib/TextHtV1';
import Button from 'hometown-components-dev/lib/ButtonHtV1';


@connect(({ homeinterior }) => ({
    homeinterior,
    spaces: homeinterior.data.items.text.spaces
  }))

class SpacesWeDesign extends React.Component {
    render() { 
        const { spaces }  = this.props;
        return (
            <Box mt="90px">
                <Heading 
                 style={{
            fontSize: '40px',
            fontWeight: 600,
            marginBottom: '5px',
            color: 'black',
            textAlign: 'center'
          }}>
                {spaces.title}
                </Heading>
                <Text
                style={{fontSize: "20px", color: "#888888", marginBottom: "10px", width: "70%", textAlign: 'center', marginLeft: '15%', marginTop: '30px', lineHeight: '30px'}}
                >
               {spaces.subtitle}
                </Text>
            </Box>
        );
    }
}
 
export default SpacesWeDesign;