import React, { Component } from 'react';
import { connect } from 'react-redux';
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Section from 'hometown-components-dev/lib/SectionHtV1';
import Row from 'hometown-components-dev/lib/RowHtV1';
import Heading from 'hometown-components-dev/lib/HeadingHtV1';
import Image from 'hometown-components-dev/lib/ImageHtV1';
import Text from 'hometown-components-dev/lib/TextHtV1';
import Button from 'hometown-components-dev/lib/ButtonHtV1';

const imageSrc = require('../../../static/categories/dbadvantage.png');
const styles = require('./Designbuild.scss');

@connect(({ designbuild }) => ({
  designbuild,
  SpacesWeTransform: designbuild.data.items.text.SpacesWeTransform
}))
class RoomsWeTransform extends React.Component {
  render() {
    const { SpacesWeTransform } = this.props;
    return (
      <Section>
        <Box
          style={{
            fontSize: '40px',
            fontWeight: 600,
            marginBottom: '5px',
            color: 'black',
            textAlign: 'center'
          }}
        >
          Rooms We Transform
          <div
            style={{
              width: '30px',
              borderTop: '2px solid #222222',
              margin: 'auto',
              marginTop: '15px'
            }}
          />
        </Box>
        <Row justifyContent="center" style={{ width: '100%', margin: 'auto' }}>
          {SpacesWeTransform.values.map(slide => (
            <Box style={{ width: '40%', margin: '30px 10px 10px' }}>
              {/* <Link to={slide.url_key}> */}
              <Image src={slide.imgSrc} alt={slide.title} m={5} height="auto" width="100%" />
              <Text
                fontSize="30px"
                color="label"
                mt="10px"
                style={{ textAlign: 'center', color: 'black', fontWeight: '600' }}
              >
                {slide.title}
              </Text>
              <Text
                fontSize="20px"
                color="label"
                mt="15px"
                style={{
                  textAlign: 'center',
                  color: '#999999',
                  lineHeight: '30px',
                  width: '90%',
                  marginLeft: '5%'
                }}
              >
                {slide.description}
              </Text>

              {/* </Link> */}
            </Box>
          ))}
        </Row>
      </Section>
    );
  }
}

export default RoomsWeTransform;
