import React from 'react';
import Heading from 'hometown-components/lib/Heading';
import Div from 'hometown-components/lib/Div';
import Img from 'hometown-components/lib/Img';
import Text from 'hometown-components/lib/Text';
import { Link } from 'react-router-dom';
import SlickSlider from '../SlickSlider';
import './Slider.css';
import CarouselDataTwo from './CarouselDataTwo';

const styles = require('./style.scss');

const adjustSlidesNew = (length) => ({
    slidesToShow: length > 1 ? 1.9 : length,
    slidesToScroll: 1,
    infinite: false,
    autoplay: false,
    dots: false,
    customPaging: i => (
      <div
        style={{
          borderTop: '1px solid #848C7F'
        }}
      ></div>
    )
  });

function GiftingCarousel({categoryName, data, link, onClick}) {
    return (
        <div>
            {/* <Heading mb="10px" ta="center" color="#323131" fontSize="22px" fontFamily="regular">
                {categoryName}
            </Heading> */}
            {/* <div style={{ width: '30px', borderTop: '2px solid #323131', margin: 'auto' }}></div> */}
            <Div className="carousel-one offset" mt="1rem" pl="0rem" mb="1rem">
                <Div className={styles.flexTwo} pr="1rem" style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                }}>
                    <Heading mb="10px" ta="left" color="#323131" pl="1rem" fontSize="16px" fontFamily="regular">
                        {categoryName}
                    </Heading>
                    <Link to={link} onClick={onClick}>
                        <Text fontSize="14px">Shop All</Text>
                    </Link>
                </Div>    
                <SlickSlider settings={adjustSlidesNew(8)}>
                    {data.map((elem,index) => (
                        // <Div key={index} pr="20px" className={styles.cardTwo}>
                        //     <Div mb="1rem">
                        //         <Link to={elem.link1} onClick={onClick}>
                        //             <Img src={elem.image1} alt={categoryName} />
                        //         </Link>    
                        //     </Div>
                        //     <Div>
                        //         <Link to={elem.link2} onClick={onClick}>
                        //             <Img src={elem.image2} alt={categoryName} />
                        //         </Link>    
                        //     </Div>     
                        // </Div>
                        <CarouselDataTwo elem={elem} index={index} categoryName={categoryName} />
                    ))}
                </SlickSlider>
            </Div>
        </div>
    )
}

export default GiftingCarousel
