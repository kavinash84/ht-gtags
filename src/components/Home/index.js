import React, { Component } from 'react';
import ShopByCategories from '../ShopByCategories';
import DealsOfTheDay from '../DealsOfTheDay/index';
import { Link } from 'react-router-dom';
import HeadingHtV1 from 'hometown-components-dev/lib/HeadingHtV1';
import Image from 'hometown-components-dev/lib/ImageHtV1';

// Shop by room
// const shopByRoom01 = require("../../../static/new-home/shopbyroom01.png");
// const shopByRoom02 = require("../../../static/new-home/shopbyroom02.png");
// const shopByRoom03 = require("../../../static/new-home/shopbyroom01.png");
// const shopByRoom04 = require("../../../static/new-home/shopbyroom02.png");

const bestseatbanner01 = require('../../../static/new-home/bestseatbanner01.png');

class HomeContainer extends Component {
  // state = {
  //   open: true,
  //   shopByRoom: [
  //     {
  //       image: shopByRoom01,
  //       name: "Living Room",
  //       description:
  //         "From classic neutrals to chic modern, our living room furniture collection has something for everyone home. Shop sofas, recliners, coffee tables, end tables, media units, ottomans and much more",
  //       link: "/furniture/living-room-furniture"
  //     },
  //     {
  //       image: shopByRoom02,
  //       name: "Dining",
  //       description:
  //         "Casual get-togethers or intimate soirees, our dining room furniture collection has the perfect pieces to make every moment into a memorable one. Shop dining room sets, dining chairs, bar stools, sideboards or serving trolleys",
  //       link: "/furniture/dining-kitchen-furniture"
  //     },
  //     {
  //       image: shopByRoom03,
  //       name: "Bedroom",
  //       description:
  //         "Grand master suites to cosy sleep rooms, our bedroom furniture collection in classic, contemporary or modern designs make for a perfect sleep haven. Shop beds, wardrobes, dressers, night stands and much more.",
  //       link: "/furniture/bedroom-furniture"
  //     },
  //     {
  //       image: shopByRoom04,
  //       name: "Kids room",
  //       description:
  //         "Girl bedrooms or boy bedrooms, our kids furniture range is perfect to fuel their imagination and compliment their personalities. Shop bunked beds, themed bedroom sets, study desk, book shelves and much more",
  //       link: "/furniture/kids-furniture"
  //     }
  //   ]
  // };
  render() {
    return (
      <div>
        {/* shop by categories */}
        <ShopByCategories />

        {/* deals of the day section */}
        <DealsOfTheDay />

        {/* Beast seat in the house */}
        <div>
          <HeadingHtV1
            mb="20px"
            fontSize="22px"
            style={{
              textAlign: 'center',
              color: '#222222',
              fontFamily: 'medium'
            }}
          >
            Best Seat In the House
          </HeadingHtV1>
          <Link to="/furniture/living-room-furniture/sofas">
            <HeadingHtV1
              fontFamily="medium"
              style={{
                textAlign: 'center',
                fontSize: '12px',
                fontWeight: 'bold',
                color: '#222222'
              }}
            >
              SHOP SOFAS AND RECLINERS{' '}
              {/* <img
                style={{
                  display: "inline",
                  marginLeft: "-8px",
                  height: "10px",
                  width: "40px"
                }}
                src={arrowForward}
                alt="Arrow"
              /> */}
            </HeadingHtV1>
            <Image mt="30px" src={bestseatbanner01} style={{ width: '300px', alignItems: 'center' }} />
          </Link>
        </div>
      </div>
    );
  }
}

export default HomeContainer;
