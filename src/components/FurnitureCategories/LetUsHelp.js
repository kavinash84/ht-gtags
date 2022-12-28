import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Section from 'hometown-components-dev/lib/SectionHtV1';
import Row from 'hometown-components-dev/lib/RowHtV1';
import Heading from 'hometown-components-dev/lib/HeadingHtV1';
import Image from 'hometown-components-dev/lib/ImageHtV1';
import Text from 'hometown-components-dev/lib/TextHtV1';
import Button from 'hometown-components-dev/lib/ButtonHtV1';

const styles = require('./Furniture.scss');


class LetUsHelpYou extends React.Component {
 
  render() {
    const {  title, data  } = this.props;
    return (
      <Section>
        <Box
          style={{
            fontSize: '30px',
            fontWeight: 600,
            color: 'black',
            textAlign: 'left',
            marginLeft:'10%',
            marginTop:'80px',
          }}
        >
          {title}
         
        </Box>
        <Row justifyContent="center" style={{ width: '100%', margin: 'auto' }}>
          {data.map(slide => (
            <Box style={{ width: '19%', margin: '30px 10px 10px' }}>
              <Link to={slide.url_key}
               onClick={() => {
              sessionStorage.setItem("HomeInteriorscrollPosition", window.pageYOffset);
            }}>
              <Image data-src={slide.image} src={`${slide.image}?blur=30`} alt={slide.title} m={5} height="240px" width="100%" />
              <Text
                fontSize="20px"
                color="label"
                mt="10px"
                style={{ textAlign: 'center', color: '#323131', fontWeight: '600' }}
              >
                {slide.title}
              </Text>
              </Link>
            </Box>
          ))}
        </Row>
      </Section>
    );
  }
}

export default LetUsHelpYou;
