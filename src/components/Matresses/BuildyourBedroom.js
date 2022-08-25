import React, { Component } from 'react';
import Div from 'hometown-components/lib/Div';
import Heading from 'hometown-components/lib/Heading';
import SlickSlider from '../SlickSlider';
import CarouselData from './CarouselData';
import './Slider.css';
import Text from 'hometown-components/lib/Text';

const adjustSlidesNew = (length) => ({
    slidesToShow: length > 1 ? 1.5 : length,
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

export class BuildyourBedroom extends Component {
    render() {
        const { data } = this.props;
        return (
            <Div mt="3.5rem" pt="1rem"pb="1rem" style={{ backgroundColor: '#F3EFE7'}}>
                <Heading mt="1rem" fontSize="22px" ta="center" p="0px 3rem" mb="0px" style={{
                    fontWeight: 'bold',
                    color:"#323231",
                    lineHeight:"36px",
                    whiteSpace: 'normal'
                }}>
                    {data.title}
                </Heading>
                <Text ta="center" color="#666666" mt="0px" fontSize="1rem">{data.subHeading}</Text>
                {/* <div style={{ width: '25px', borderTop: '2px solid #17245B', margin: 'auto' }}></div> */}
                <Div className="carousel-one offset" mt="0rem">
                    <SlickSlider settings={adjustSlidesNew(8)}>
                        {data.values.map((elem,index) => (
                            <CarouselData elem={elem} index={index} component="5"/>
                        ))}
                    </SlickSlider>
                </Div>
            </Div>
        )
    }
}

export default BuildyourBedroom
