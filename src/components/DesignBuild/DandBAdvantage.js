import React, { Component } from 'react';
import Div from 'hometown-components-dev/lib/BoxHtV1';
import { connect } from 'react-redux';
import DBCarousel from './carousel';

const styles = require('./Designbuild.scss');
c

const adjustSlides = length => ({
  slidesToShow: 2.5,
  slidesToScroll: 1,
  infinite: false,
  autoplay: false,
  dots: true,
  customPaging: i => (
    <div
      style={{
        borderTop: '1px solid #848C7F'
      }}
    ></div>
  )
});

@connect(({ designBuild }) => ({
  designBuild,
  dbAdvantage: designBuild.data.items.text.dbAdvantage
}))
export default class DandBAdvantage extends Component {
  render() {
    const { dbAdvantage } = this.props;
    return (
      <Div style={{ backgroundColor: '#FFFFFF', padding: '30px 30px 10px', textAlign: 'center', marginTop: '15px' }}>
        <Div style={{ fontSize: '20px', fontWeight: '600', marginBottom: '10px', color: 'black' }}>
          {dbAdvantage.title}
        </Div>
        <Div style={{ color: '#888888', marginBottom: '10px' }}>{dbAdvantage.subtitle}</Div>
        <Div style={{ paddingBottom: '' }}>
          <DBCarousel data={dbAdvantage.values} settings={adjustSlides} component={3} />
        </Div>
      </Div>
    );
  }
}
