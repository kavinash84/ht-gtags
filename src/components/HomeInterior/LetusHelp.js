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
class LetUsHelpYou extends React.Component {
  render() {
    const { SpacesWeTransform } = this.props;
    return (
      <Section>
        <Box
          style={{
            fontSize: '30px',
            fontWeight: 600,
            marginBottom: '10px',
            color: 'black',
            textAlign: 'left'
          }}
        >
          Let Us Help You
         
        </Box>
        <Row justifyContent="center" style={{ width: '100%', margin: 'auto' }}>
          {SpacesWeTransform.values.map(slide => (
            <Box style={{ width: '20%', margin: '30px 10px 10px' }}>
              {/* <Link to={slide.url_key}> */}
              <Image src={slide.imgSrc} alt={slide.title} m={5} height="auto" width="100%" />
              <Text
                fontSize="22px"
                color="label"
                mt="10px"
                style={{ textAlign: 'center', color: 'black', fontWeight: '600' }}
              >
                {slide.title}
              </Text>
              {/* </Link> */}
            </Box>
          ))}
        </Row>
      </Section>
    );
  }
}

export default LetUsHelpYou;
