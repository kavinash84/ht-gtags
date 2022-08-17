import React from 'react';
import Heading from 'hometown-components/lib/Heading';
import Div from 'hometown-components/lib/Div';
import Img from 'hometown-components/lib/Img';
import Text from 'hometown-components/lib/Text';
import { Link } from 'react-router-dom';
import SlickSlider from '../SlickSlider';
import './Slider.css';
import CarouselData from './CarouselData';

const styles = require('./style.scss');

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

function GiftingCarousel({categoryName, data, onClick}) {
    return (
        <Div mt="1.5rem">
            <Heading mb="10px" ta="center" color="#323131" fontSize="22px" fontFamily="regular">
                {data.title}
            </Heading>
            <div style={{ width: '30px', borderTop: '2px solid #323131', margin: 'auto' }}></div>
            <Div className="carousel-one offset" mt="0rem">
                <SlickSlider settings={adjustSlidesNew(8)}>
                    {data.values.map((elem,index) => (
                        // <Div key={index} p="2rem" pl="1rem" pr="1rem" pb="1rem" className={styles.cardContainer}>
                        //     <Link to={elem.link} onClick={onClick}>
                        //         <Div className={styles.card} style={{
                        //             paddingBottom: '1rem',
                        //             boxShadow: '0px 0px 10px 6px #00000029'
                        //         }}>
                        //             <Img src={elem.image} alt={elem.title} />
                        //             <Div pl="10px">
                        //                 <Heading fontSize="19px" color="#666666" ta="left" mb="0px">
                        //                     {elem.title}
                        //                 </Heading>
                        //                 {/* <Text color="#888888" fontSize="12px">
                        //                     {elem.description}
                        //                 </Text> */}
                        //                 {/* <Link to={elem.link} onClick={onClick}>
                        //                     <Text ta="left" mb="0px" mt="0px" className={styles.shopNow} style={{
                        //                         color: 'orangered',
                        //                         fontWeight: 'bold',
                        //                         textAlign: 'left'
                        //                     }}>
                        //                     Shop now
                        //                     </Text>
                        //                 </Link> */}
                        //             </Div>
                        //         </Div>
                        //     </Link>
                        // </Div>
                        <CarouselData elem={elem} index={index}/>
                    ))}
                </SlickSlider>
            </Div>
        </Div>
    )
}

export default GiftingCarousel
