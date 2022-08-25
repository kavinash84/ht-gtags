import React, { Component } from 'react';
import Div from 'hometown-components/lib/Div';
import Heading from 'hometown-components/lib/Heading';
import SlickSlider from '../SlickSlider';
import CarouselData from './CarouselData';
import './Slider.css';

const adjustSlidesNew = (length) => ({
    slidesToShow: length > 1 ? 2.2 : length,
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

export class MattressesByMaterial extends Component {
    render() {
        const { data } = this.props;
        return (
            <Div mt="2rem">
                <Heading mt="0.5rem" mb="5px" fontSize="22px" ta="center" p="0px 3rem" style={{
                    fontWeight: 'bold',
                    color:"#323231",
                    lineHeight:"36px",
                    whiteSpace: 'normal'
                }}>
                    {data.title}
                </Heading>
                <div style={{ width: '25px', borderTop: '2px solid #323231', margin: 'auto' }}></div>
                <Div className="carousel-one offset" mt="0rem">
                    <SlickSlider settings={adjustSlidesNew(8)}>
                        {data.values.map((elem,index) => (
                            <CarouselData elem={elem} index={index} component="3"/>
                        ))}
                    </SlickSlider>
                </Div>
            </Div>
        )
    }
}

export default MattressesByMaterial
