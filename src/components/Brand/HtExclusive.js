import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Container from 'hometown-components-dev/lib/ContainerHtV1';
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Img from 'hometown-components-dev/lib/ImageHtV1';
import Text from 'hometown-components-dev/lib/TextHtV1';

import SlickSlider from '../SlickSlider';
// import Usp from 'components/Usp';

import BannerTop from '../../../static/HT-Exclusive/BannerDesk1.png';
import Banner2 from '../../../static/HT-Exclusive/BannerDesk2.png';
import Banner3 from '../../../static/HT-Exclusive/BannerDesk3.png';
import Banner4 from '../../../static/HT-Exclusive/BannerDesk4.png';
import Banner5 from '../../../static/HT-Exclusive/BannerDesk5.png';
import CarouselImg1 from '../../../static/HT-Exclusive/CarouselImg1.png';
import CarouselImg2 from '../../../static/HT-Exclusive/CarouselImg2.png';
import CarouselImg3 from '../../../static/HT-Exclusive/CarouselImg3.png';
import CarouselImg4 from '../../../static/HT-Exclusive/CarouselImg4.png';
import CarouselImg5 from '../../../static/HT-Exclusive/CarouselImg5.png';
import CarouselImg6 from '../../../static/HT-Exclusive/CarouselImg6.png';
import CarouselImg7 from '../../../static/HT-Exclusive/CarouselImg7.png';
import CarouselImg8 from '../../../static/HT-Exclusive/CarouselImg8.png';
import CarouselImg9 from '../../../static/HT-Exclusive/CarouselImg9.png';
import CarouselImg10 from '../../../static/HT-Exclusive/CarouselImg10.png';
import CarouselImg11 from '../../../static/HT-Exclusive/CarouselImg11.png';
import CarouselImg12 from '../../../static/HT-Exclusive/CarouselImg12.png';
import CarouselImg13 from '../../../static/HT-Exclusive/CarouselImg13.png';
import CarouselImg14 from '../../../static/HT-Exclusive/CarouselImg14.png';
import CarouselImg15 from '../../../static/HT-Exclusive/CarouselImg15.png';

// import Heading from 'hometown-components/lib/Heading'

import './HtExclusive.css';

const adjustSlides = length => ({
  slidesToShow: length >= 5 ? 5 : length,
  slidesToScroll: 1,
  autoplay: false,
  infinite: true
});

export class HtExclusive extends Component {
  constructor(props) {
    super(props);

    this.state = {
      carouselItem1: [
        {
          url: CarouselImg1,
          name: 'Fabric Sofa',
          link: '/furniture/living-room-furniture/sofas'
        },
        {
          url: CarouselImg2,
          name: 'Chairs',
          link: '/furniture/living-room-furniture/accent-chairs'
        },
        {
          url: CarouselImg3,
          name: 'Coffee Tables',
          link: '/furniture/living-room-furniture/coffee-tables'
        },
        {
          url: CarouselImg4,
          name: 'TV Stands & Entertainment Centers',
          link: '/furniture/living-room-furniture/tv-units'
        },
        {
          url: CarouselImg5,
          name: 'End & Side Tables',
          link: '/furniture/living-room-furniture/end-tables'
        }
      ],
      carouselItem2: [
        {
          url: CarouselImg6,
          name: 'Dressers',
          link: '/furniture/bedroom-furniture/chest-of-drawers'
        },
        {
          url: CarouselImg7,
          name: 'Nightstands',
          link: '/furniture/bedroom-furniture/bedside-tables'
        },
        {
          url: CarouselImg8,
          name: 'Beds',
          link: '/furniture/bedroom-furniture/beds'
        },
        {
          url: CarouselImg9,
          name: 'Mattresses',
          link: '/furniture/mattresses'
        },
        {
          url: CarouselImg10,
          name: 'Armoires',
          link: '/furniture/bedroom-furniture/wardrobes'
        }
      ],
      carouselItem3: [
        {
          url: CarouselImg11,
          name: 'Bar & Counter Stools',
          link: '/furniture/bar-furniture'
        },
        {
          url: CarouselImg12,
          name: 'Dining Chairs & Benches',
          link: '/furniture/dining-kitchen-furniture/dining-chairs'
        },
        {
          url: CarouselImg13,
          name: 'Dining Tables',
          link: '/furniture/dining-kitchen-furniture/dining-tables'
        },
        {
          url: CarouselImg14,
          name: 'Sideboards & Buffet Tables',
          link: '/furniture/dining-kitchen-furniture/storage-sideboards'
        },
        {
          url: CarouselImg15,
          name: 'Bar Carts',
          link: '/furniture/bar-furniture/bar-cabinets'
        }
      ]
    };
  }

  render() {
    const { carouselItem1, carouselItem2, carouselItem3 } = this.state;

    return (
      <Container mt="0px" pl="0px" pr="0px">
        <Box>
          <Img src={BannerTop} alt="" />
        </Box>
        <Box sx={{ width: '100%' }}>
          <Text style={{ textAlign: 'center', fontFamily: 'Arial', lineHeight: '1.5rem' }} px="40px" py="20px">
            For over a decade, Hometown has established high and unparallel quality and industry standard in the
            furniture gamut. HT Exclusive is to present to you the best of the best products, aesthetics and values
          </Text>
          <Link to="/furniture/living-room-furniture/">
            <Img src={Banner2} alt="" />
          </Link>
        </Box>
        <Box style={{ padding: '15px', height: '200px' }}>
          <SlickSlider mb="0" mr="5px" ml="5px" settings={adjustSlides(carouselItem1.length)}>
            {carouselItem1.map((slide, index) => (
              <div key={String(index)}>
                {/* <SquareCatItem name={slide.info.name} image={slide.image_url} url={`${slide.info.url_key}`} /> */}
                <Link to={slide.link}>
                  <Img
                    src={slide.url}
                    style={{
                      borderRadius: '50%',
                      height: '150px',
                      width: '150px',
                      margin: '3px auto'
                    }}
                    alt=""
                  />
                  <p
                    style={{
                      textAlign: 'center',
                      fontSize: '0.9rem',
                      textDecoration: 'none',
                      color: 'grey'
                    }}
                  >
                    {slide.name}
                  </p>
                </Link>
              </div>
            ))}
          </SlickSlider>
        </Box>
        <Box>
          <Link to="/furniture/bedroom-furniture/">
            <Img src={Banner3} alt="" />
          </Link>
        </Box>
        <Box style={{ padding: '15px', height: '200px' }}>
          <SlickSlider mb="0" mr="5px" ml="5px" settings={adjustSlides(carouselItem2.length)}>
            {carouselItem2.map((slide, index) => (
              <div key={String(index)}>
                {/* <SquareCatItem name={slide.info.name} image={slide.image_url} url={`${slide.info.url_key}`} /> */}
                <Link to={slide.link}>
                  <Img
                    src={slide.url}
                    style={{
                      borderRadius: '50%',
                      height: '150px',
                      width: '150px',
                      margin: '3px auto'
                    }}
                    alt=""
                  />
                  <p
                    style={{
                      textAlign: 'center',
                      fontSize: '0.9rem',
                      textDecoration: 'none',
                      color: 'grey'
                    }}
                  >
                    {slide.name}
                  </p>
                </Link>
              </div>
            ))}
          </SlickSlider>
        </Box>
        <Box>
          <Link to="/furniture/dining-kitchen-furniture/">
            <Img src={Banner4} alt="" />
          </Link>
        </Box>
        <Box style={{ padding: '15px', height: '200px' }}>
          <SlickSlider mb="0" mr="5px" ml="5px" settings={adjustSlides(carouselItem3.length)}>
            {carouselItem3.map((slide, index) => (
              <div key={String(index)}>
                {/* <SquareCatItem name={slide.info.name} image={slide.image_url} url={`${slide.info.url_key}`} /> */}
                <Link to={slide.link}>
                  <Img
                    src={slide.url}
                    style={{
                      borderRadius: '50%',
                      height: '150px',
                      width: '150px',
                      margin: '5px auto'
                    }}
                    alt=""
                  />
                  <p
                    style={{
                      textAlign: 'center',
                      fontSize: '0.9rem',
                      textDecoration: 'none',
                      color: 'grey'
                    }}
                  >
                    {slide.name}
                  </p>
                </Link>
              </div>
            ))}
          </SlickSlider>
        </Box>
        <Box>
          <Link to="/furniture">
            <Img src={Banner5} alt="" />
          </Link>
        </Box>
      </Container>
    );
  }
}

export default connect(null)(HtExclusive);
