import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Container from 'hometown-components-dev/lib/ContainerHtV1';
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Img from 'hometown-components-dev/lib/ImageHtV1';
import Text from 'hometown-components-dev/lib/TextHtV1';

import SlickSlider from '../SlickSlider';
// import Usp from 'components/Usp';

import BannerTop from '../../../static/HT-Exclusive/Banner01.jpg';
import Banner2 from '../../../static/HT-Exclusive/Banner02.jpg';
import Banner3 from '../../../static/HT-Exclusive/Banner03.jpg';
import Banner4 from '../../../static/HT-Exclusive/Banner04.jpg';
// import Banner5 from '../../../static/HT-Exclusive/BannerDesk5.png';
import CarouselImg1 from '../../../static/HT-Exclusive/Living Room/Sofas.png';
import CarouselImg2 from '../../../static/HT-Exclusive/Living Room/chairs.png';
import CarouselImg3 from '../../../static/HT-Exclusive/Living Room/center-tables.png';
import CarouselImg4 from '../../../static/HT-Exclusive/Living Room/TV-Units.png';
import CarouselImg5 from '../../../static/HT-Exclusive/Living Room/End-Tables.png';
import CarouselImg6 from '../../../static/HT-Exclusive/Bedroom/Dressers.png';
import CarouselImg7 from '../../../static/HT-Exclusive/Bedroom/Night-Stands.png';
import CarouselImg8 from '../../../static/HT-Exclusive/Bedroom/Beds.png';
import CarouselImg9 from '../../../static/HT-Exclusive/Bedroom/Mattresses.png';
import CarouselImg10 from '../../../static/HT-Exclusive/Bedroom/Armoires.png';
import CarouselImg11 from '../../../static/HT-Exclusive/Dining Room/Consloe-Tables.png';
import CarouselImg12 from '../../../static/HT-Exclusive/Dining Room/Dining-Chairs.png';
import CarouselImg13 from '../../../static/HT-Exclusive/Dining Room/Dining-Tables.png';
import CarouselImg14 from '../../../static/HT-Exclusive/Dining Room/Dining-Sets.png';
import CarouselImg15 from '../../../static/HT-Exclusive/Dining Room/Sideboards.png';

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
          name: 'Sofas & Sectionals',
          link: '/furniture/living-room-furniture/ht-exclusive-living/sofa--sectionals'
        },
        {
          url: CarouselImg2,
          name: 'Chairs',
          link: '/furniture/living-room-furniture/accent-chairs'
        },
        {
          url: CarouselImg3,
          name: 'Coffee Tables',
          link: '/furniture/living-room-furniture/ht-exclusive-living/coffee-table'
        },
        {
          url: CarouselImg4,
          name: 'TV Stands & Entertainment Centers',
          link: '/furniture/living-room-furniture/ht-exclusive-living/entertainment-unit'
        },
        {
          url: CarouselImg5,
          name: 'End & Side Tables',
          link: '/furniture/living-room-furniture/ht-exclusive-living/side-table'
        }
      ],
      carouselItem2: [
        {
          url: CarouselImg6,
          name: 'Dressers',
          link: '/furniture/bedroom-furniture/ht-exclusive-bedroom/dressers'
        },
        {
          url: CarouselImg7,
          name: 'Nightstands',
          link: '/furniture/bedroom-furniture/ht-exclusive-bedroom/night-stand'
        },
        {
          url: CarouselImg8,
          name: 'Beds',
          link: '/furniture/bedroom-furniture/ht-exclusive-bedroom/bed'
        },
        {
          url: CarouselImg9,
          name: 'Mattresses',
          link: '/furniture/bedroom-furniture/ht-exclusive-bedroom/bed-mattresses'
        },
        {
          url: CarouselImg10,
          name: 'Armoires',
          link: '/furniture/bedroom-furniture/ht-exclusive-bedroom/bedroom-wardrobe'
        }
      ],
      carouselItem3: [
        {
          url: CarouselImg11,
          name: 'Bar & Counter Stools',
          link: '/furniture/bar-furniture/bar-chairs-and-stools'
        },
        {
          url: CarouselImg12,
          name: 'Dining Chairs & Benches',
          link: '/furniture/dining-kitchen-furniture/ht-exclusive-dining--kitchen/dining-chair'
        },
        {
          url: CarouselImg13,
          name: 'Dining Tables',
          link: '/furniture/dining-kitchen-furniture/ht-exclusive-dining--kitchen/dining-table'
        },
        {
          url: CarouselImg14,
          name: 'Sideboards & Buffet Tables',
          link: '/furniture/dining-kitchen-furniture/ht-exclusive-dining--kitchen/storage-sideboard'
        },
        {
          url: CarouselImg15,
          name: 'Bar Carts',
          link: '/furniture/bar-furniture/serving-trolleys'
        }
      ]
    };
  }

  render() {
    const { carouselItem1, carouselItem2, carouselItem3 } = this.state;

    return (
      <Container mt="0px" pl="0px" pr="0px" sx={{ maxWidth: '100% !important' }}>
        <Box>
          <Img src={BannerTop} alt="" width="100%" />
        </Box>
        <Box sx={{ width: '100%' }}>
          <Text
            style={{
              textAlign: 'center',
              fontFamily: 'Arial',
              lineHeight: '1.7rem',
              fontSize: '1.3rem'
            }}
            px="40px"
            py="20px"
          >
            Bring home the exclusive furniture collections unsurpassed in form, function and design. Whether you are
            reimagining one room or your entire space, HomeTown exclusives add the perfect touch of elegance and beauty.
          </Text>
          <Link to="/furniture/living-room-furniture/ht-exclusive-living">
            <Img src={Banner2} alt="" width="100%" sx={{ aspectRatio: '2.1' }} />
          </Link>
        </Box>
        <Box style={{ padding: '20px' }}>
          <SlickSlider mb="0" mr="5px" ml="5px" settings={adjustSlides(carouselItem1.length)}>
            {carouselItem1.map((slide, index) => (
              <div key={String(index)}>
                {/* <SquareCatItem name={slide.info.name} image={slide.image_url} url={`${slide.info.url_key}`} /> */}
                <Link to={slide.link}>
                  <Img
                    src={slide.url}
                    style={{
                      borderRadius: '50%',
                      height: '175px',
                      width: '175px',
                      margin: '3px auto'
                    }}
                    alt=""
                  />
                </Link>
                <p
                  style={{
                    textAlign: 'center',
                    fontSize: '1.1rem',
                    textDecoration: 'none',
                    color: 'grey',
                    padding: '10px',
                    fontWeight: 'bold'
                  }}
                >
                  {slide.name}
                </p>
              </div>
            ))}
          </SlickSlider>
        </Box>
        <Box>
          <Link to="/furniture/bedroom-furniture/ht-exclusive-bedroom">
            <Img src={Banner3} alt="" width="100%" sx={{ aspectRatio: '2.1' }} />
          </Link>
        </Box>
        <Box style={{ padding: '20px' }}>
          <SlickSlider mb="0" mr="5px" ml="5px" settings={adjustSlides(carouselItem2.length)}>
            {carouselItem2.map((slide, index) => (
              <div key={String(index)}>
                {/* <SquareCatItem name={slide.info.name} image={slide.image_url} url={`${slide.info.url_key}`} /> */}
                <Link to={slide.link}>
                  <Img
                    src={slide.url}
                    style={{
                      borderRadius: '50%',
                      height: '175px',
                      width: '175px',
                      margin: '3px auto'
                    }}
                    alt=""
                  />
                </Link>
                <p
                  style={{
                    textAlign: 'center',
                    fontSize: '1.1rem',
                    textDecoration: 'none',
                    color: 'grey',
                    padding: '10px',
                    fontWeight: 'bold'
                  }}
                >
                  {slide.name}
                </p>
              </div>
            ))}
          </SlickSlider>
        </Box>
        <Box>
          <Link to="/furniture/dining-kitchen-furniture/ht-exclusive-dining--kitchen">
            <Img src={Banner4} alt="" width="100%" sx={{ aspectRatio: '2.2' }} />
          </Link>
        </Box>
        <Box style={{ padding: '20px' }}>
          <SlickSlider mb="0" mr="5px" ml="5px" settings={adjustSlides(carouselItem3.length)}>
            {carouselItem3.map((slide, index) => (
              <div key={String(index)}>
                {/* <SquareCatItem name={slide.info.name} image={slide.image_url} url={`${slide.info.url_key}`} /> */}
                <Link to={slide.link}>
                  <Img
                    src={slide.url}
                    style={{
                      borderRadius: '50%',
                      height: '175px',
                      width: '175px',
                      margin: '5px auto'
                    }}
                    alt=""
                  />
                </Link>
                <p
                  style={{
                    textAlign: 'center',
                    fontSize: '1.1rem',
                    textDecoration: 'none',
                    color: 'grey',
                    padding: '10px',
                    fontWeight: 'bold'
                  }}
                >
                  {slide.name}
                </p>
              </div>
            ))}
          </SlickSlider>
        </Box>
        {/* <Box>
          <Link to="/furniture">
            <Img src={Banner5} alt="" />
          </Link>
        </Box> */}
      </Container>
    );
  }
}

export default connect(null)(HtExclusive);
