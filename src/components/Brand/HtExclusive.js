import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Container from 'hometown-components-dev/lib/ContainerHtV1';
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Img from 'hometown-components-dev/lib/ImageHtV1';
import Text from 'hometown-components-dev/lib/TextHtV1';

import SlickSlider from '../SlickSlider';
// import Usp from 'components/Usp';

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
          url: "https://static.hometown.in/media/cms/extras-desktop/Sofas.png",
          name: 'Sofas & Sectionals',
          link: '/furniture/living-room-furniture/ht-exclusive-living/sofa--sectionals'
        },
        {
          url: "https://static.hometown.in/media/cms/extras-desktop/chairs.png",
          name: 'Chairs',
          link: '/furniture/living-room-furniture/accent-chairs'
        },
        {
          url: "https://static.hometown.in/media/cms/extras-desktop/center-tables.png",
          name: 'Coffee Tables',
          link: '/furniture/living-room-furniture/ht-exclusive-living/coffee-table'
        },
        {
          url: "https://static.hometown.in/media/cms/extras-desktop/TV-Units.png",
          name: 'TV Stands & Entertainment Centers',
          link: '/furniture/living-room-furniture/ht-exclusive-living/entertainment-unit'
        },
        {
          url: "https://static.hometown.in/media/cms/extras-desktop/End-Tables.png",
          name: 'End & Side Tables',
          link: '/furniture/living-room-furniture/ht-exclusive-living/side-table'
        }
      ],
      carouselItem2: [
        {
          url: "https://static.hometown.in/media/cms/extras-desktop/Dressers.png",
          name: 'Dressers',
          link: '/furniture/bedroom-furniture/ht-exclusive-bedroom/dressers'
        },
        {
          url: "https://static.hometown.in/media/cms/extras-desktop/Night-Stands.png",
          name: 'Nightstands',
          link: '/furniture/bedroom-furniture/ht-exclusive-bedroom/night-stand'
        },
        {
          url: "https://static.hometown.in/media/cms/extras-desktop/Beds.png",
          name: 'Beds',
          link: '/furniture/bedroom-furniture/ht-exclusive-bedroom/bed'
        },
        {
          url: "https://static.hometown.in/media/cms/extras-desktop/Mattresses.png",
          name: 'Mattresses',
          link: '/furniture/bedroom-furniture/ht-exclusive-bedroom/bed-mattresses'
        },
        {
          url: "https://static.hometown.in/media/cms/extras-desktop/Armoires.png",
          name: 'Armoires',
          link: '/furniture/bedroom-furniture/ht-exclusive-bedroom/bedroom-wardrobe'
        }
      ],
      carouselItem3: [
        {
          url: "https://static.hometown.in/media/cms/extras-desktop/Consloe-Tables.png",
          name: 'Bar & Counter Stools',
          link: '/furniture/bar-furniture/bar-chairs-and-stools'
        },
        {
          url: "https://static.hometown.in/media/cms/extras-desktop/Dining-Chairs.png",
          name: 'Dining Chairs & Benches',
          link: '/furniture/dining-kitchen-furniture/ht-exclusive-dining--kitchen/dining-chair'
        },
        {
          url: "https://static.hometown.in/media/cms/extras-desktop/Dining-Tables.png",
          name: 'Dining Tables',
          link: '/furniture/dining-kitchen-furniture/ht-exclusive-dining--kitchen/dining-table'
        },
        {
          url: "https://static.hometown.in/media/cms/extras-desktop/Dining-Tables.png",
          name: 'Sideboards & Buffet Tables',
          link: '/furniture/dining-kitchen-furniture/ht-exclusive-dining--kitchen/storage-sideboard'
        },
        {
          url: "https://static.hometown.in/media/cms/extras-desktop/Sideboards.png",
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
          <Img src="https://static.hometown.in/media/cms/extras-desktop/Banner01.jpg" alt="" width="100%" />
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
            <Img src="https://static.hometown.in/media/cms/extras-desktop/Banner02.jpg" alt="" width="100%" sx={{ aspectRatio: '2.1' }} />
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
            <Img src="https://static.hometown.in/media/cms/extras-desktop/Banner03.jpg" alt="" width="100%" sx={{ aspectRatio: '2.1' }} />
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
            <Img src="https://static.hometown.in/media/cms/extras-desktop/Banner04.jpg" alt="" width="100%" sx={{ aspectRatio: '2.2' }} />
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
