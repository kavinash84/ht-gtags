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
const styles = require('./HomeInterior.scss');

@connect(({ homeinterior }) => ({
  homeinterior,
  SpacesWeTransform: homeinterior.data.items.text.SpacesWeTransform
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
            <Box style={{ width: '25%', margin: '30px 10px 10px' }}>
              {/* <Link to={slide.url_key}> */}
              <Image src={slide.imgSrc} alt={slide.title} m={5} height="auto" width="100%" />
              <Text
                fontSize="26px"
                color="label"
                mt="10px"
                style={{ textAlign: 'center', color: 'black', fontWeight: '600' }}
              >
                {slide.title}
              </Text>
              {/* </Link> */}
            </Box>
          ))}
          <Button
            style={{
              width: '350px',
              height: '50px',
              backgroundColor: 'white',
              color: '#F47020',
              border: '1px solid #F47020',
              borderRadius: '5px',
              margin:'50px auto 0',
              textTransform:'none'
            }}
          >
            Speak To Our Designer
          </Button>
        </Row>
      </Section>
    );
  }
}

export default RoomsWeTransform;
