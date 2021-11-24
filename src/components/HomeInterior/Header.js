import React, { Component } from 'react';
import Section from 'hometown-components-dev/lib/SectionHtV1';
import Image from 'hometown-components-dev/lib/ImageHtV1';
import Text from 'hometown-components-dev/lib/TextHtV1';
import Button from 'hometown-components-dev/lib/ButtonHtV1';
import { Link } from 'react-router-dom';

const styles = require('./HomeInterior.scss');

class Header extends React.Component {
  render() {
    return (
      <Section
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '10px',
          marginBottom: '10px'
        }}
      >
        <div style={{ marginLeft: '10%' }}>
          <Image src='https://www.hometown.in/media/cms/designbuild/hometownlogo.png' style={{width:'80%'}} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link to="plan-your-kitchen">
          <Text style={{ marginRight: '20px' }}>Plan Your Kitchen</Text>
          </Link>
          <Link to="design-build">
          <Text style={{ marginRight: '20px' }}>Design & Build</Text>
          </Link>
          <Link to="who-we-are">
          <Text style={{ marginRight: '20px' }}>About Us</Text>
          </Link>
          <Button
              onClick={this.props.handleModal}
            style={{
              width: '200px',
              height: '50px',
              backgroundColor: 'white',
              color: '#F47020',
              border: '1px solid #F47020',
              borderRadius: '5px',
              marginRight: '150px',
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
