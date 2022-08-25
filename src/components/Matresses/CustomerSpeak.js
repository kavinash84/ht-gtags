import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Div from 'hometown-components/lib/Div';
import Heading from 'hometown-components/lib/Heading';
import Img from 'hometown-components/lib/Img';
import Text from 'hometown-components/lib/Text';
import SlickSlider from '../SlickSlider';
import CarouselData from './CarouselData';
import './Slider.css';

// const quotes = require('../../../static/mattresses/Quotes.png');

const adjustSlidesNew = (length) => ({
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: false,
    autoplay: false,
    // dots: true,
    customPaging: i => (
      <div
        style={{
          borderTop: '1px solid #848C7F'
        }}
      ></div>
    )
  });

export class CustomerSpeak extends Component {
    render() {
        const { data } = this.props;
        return (
            <Div mt="2rem">
                <Heading fontSize="22px" ta="center" p="0px 3rem" mb="5px" style={{
                    fontWeight: 'bold',
                    color:"#323231",
                    lineHeight:"36px",
                    whiteSpace: 'normal'
                }}>
                    {data.title}
                </Heading>
                <div style={{ width: '25px', borderTop: '2px solid #323231', margin: 'auto' }}></div>
                <Div mt="0rem">
                    <SlickSlider settings={adjustSlidesNew(8)}>
                        {data.values.map((elem,index) => (
                            <CarouselData elem={elem} index={index} component="6"/>
                        ))}
                    </SlickSlider>
                </Div>
            </Div>
        )
    }
}

export default CustomerSpeak
