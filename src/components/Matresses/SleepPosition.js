import React, { Component } from 'react';
import Div from 'hometown-components/lib/Div';
import Heading from 'hometown-components/lib/Heading';
import Text from 'hometown-components/lib/Text';
import SlickSlider from '../SlickSlider';
import './Slider.css';
import CarouselData from './CarouselData';

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

export class SleepPosition extends Component {
    render() {
        const { data } = this.props;
        return (
            <Div mt="2rem" p="2rem 0rem" style={{ backgroundColor: '#779296'}}>
                <Heading mt="1rem" mb="5px" fontSize="22px" ta="center" p="0px 2.5rem" style={{
                    fontWeight: 'bold',
                    color:"#FFFFFF",
                    lineHeight:"31px",
                    whiteSpace: 'normal'
                }}>
                    {data.title}
                </Heading>
                <Text ta="center" color="#FFFFFF" fontSize="14px">{data.subHeading}</Text>
                <Div className="carousel-one offset" mt="0rem">
                    <SlickSlider settings={adjustSlidesNew(8)}>
                        {data.values.map((elem,index) => (
                            <CarouselData elem={elem} index={index} component="1"/>
                        ))}
                    </SlickSlider>
                </Div>
            </Div>
        )
    }
}

export default SleepPosition
