import React, { Component } from 'react';
import Slider from 'react-slick';

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  arrows: true,
  slidesToShow: 8,
  slidesToScroll: 1,
  autoplaySpeed: false,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    }
  ]
};

export default class HomeSlider extends Component {
  render() {
    const styles = require('./HomeSlider.scss');
    const MainSliderItem = require('../../data/MainSliderItem.js');
    console.log(MainSliderItem);

    return (
      <div className={styles.homeSlider}>
        <Slider {...settings}>
          {MainSliderItem.map(slide => (
            <div key={slide.id} className={`${styles.mainSliderItem}`}>
              <img src={slide.img} alt="" />
            </div>
          ))}
        </Slider>
      </div>
    );
  }
}
