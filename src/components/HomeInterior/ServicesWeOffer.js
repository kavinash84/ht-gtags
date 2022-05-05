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
  ServicesOffer: homeinterior.data.items.text.ServicesOffer
}))
class ServicesWeOffer extends React.Component {
  render() {
    const { ServicesOffer } = this.props;
    return (
      <Section>
        <Box
          style={{
            fontSize: '40px',
            fontWeight: 600,
            marginBottom: '5px',
            color: 'black',
            textAlign: 'center',
            marginTop: '80px'
          }}
        >
          {ServicesOffer.title}
         
        </Box>
        <Text
                style={{fontSize: "19px", color: "#888888", marginBottom: "20px", width: "70%", textAlign: 'center', marginLeft: '15%', marginTop: '30px' }}
                >
                {ServicesOffer.subtitle}
                </Text>
        <Row justifyContent="center" style={{ width: '100%', margin: 'auto' }}>
          {ServicesOffer.values.map(slide => (
            <Box style={{ width: '25%', margin: '25px 18px 50px' }}>
              {/* <Link to={slide.url_key}> */}
              <Image data-src={slide.imgSrc} alt={slide.title} m={5} height="100%" width="100%" />
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
          onClick={this.props.handleModal}
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

export default ServicesWeOffer;
