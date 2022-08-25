import React, { Component } from 'react';
import Div from 'hometown-components/lib/Div';
import Heading from 'hometown-components/lib/Heading';
import SlickSlider from '../SlickSlider';
import CarouselData from './CarouselData';
import './Slider.css';

const adjustSlidesNew = (length) => ({
    slidesToShow: length > 1 ? 1.4 : length,
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

export class HelpToDecide extends Component {
    render() {
        const { data } = this.props;
        return (
            <Div mt="3rem"pt="1rem" pb="1rem" style={{ backgroundColor: '#F3EFE7'}}>
                <Heading fontSize="22px" ta="center" p="0px 3rem" style={{
                    fontWeight: 'bold',
                    color:"#323231",
                    lineHeight:"36px",
                    whiteSpace: 'normal'
                }}>
                    {data.title}
                </Heading>
                <Div className="carousel-one offset" mt="0rem">
                    <SlickSlider settings={adjustSlidesNew(8)}>
                        {data.values.map((elem,index) => (
                            <CarouselData elem={elem} index={index} component="4"/>
                        ))}
                    </SlickSlider>
                </Div>
            </Div>
        )
    }
}

export default HelpToDecide
