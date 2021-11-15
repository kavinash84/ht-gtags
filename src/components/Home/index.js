import React, { Component } from "react";
import ShopByCategories from "../ShopByCategories";
import DealsOfTheDay from "../DealsOfTheDay/index";
import { Link } from "react-router-dom";
import HeadingHtV1 from "hometown-components-dev/lib/HeadingHtV1";
import Image from "hometown-components-dev/lib/ImageHtV1";
import CategoryCarouselLook from "../../components/CategoryCarouselLook";
import CategoryCarousel from "../../components/CategoryCarouselHome";

// Shop by room
// const shopByRoom01 = require("../../../static/new-home/shopbyroom01.png");
// const shopByRoom02 = require("../../../static/new-home/shopbyroom02.png");
// const shopByRoom03 = require("../../../static/new-home/shopbyroom01.png");
// const shopByRoom04 = require("../../../static/new-home/shopbyroom02.png");

const bestseatbanner01 = require("../../../static/new-home/bestseatbanner01.png");
const secondBanner = require("../../../static/new-home/bannerImage.png");

// Get the look
// const GetTheLook01 = require("../../../static/new-home/getthelook01.png");
// const GetTheLook02 = require("../../../static/new-home/getthelook02.png");
// const GetTheLook03 = require("../../../static/new-home/getthelook03.png");
// const GetTheLook04 = require("../../../static/new-home/getthelook04.png");
// const GetTheLook05 = require("../../../static/new-home/getthelook05.png");
// const GetTheLook06 = require("../../../static/new-home/getthelook06.png");

class HomeContainer extends Component {
  state = {
    open: true
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
    //   ],
    // getTheLook1: [
    //   {
    //     image: GetTheLook01,
    //     name: "Delight Leatherette Three Seater Sofa in Ivory Colour",
    //     link:
    //       "/delight-leatherette-three-seater-sofa-in-ivory-colour/sku/HO340FU74ZTLHTFUR"
    //   },
    //   {
    //     image: GetTheLook02,
    //     name: "Delight Leatherette Two Seater Sofa in Ivory Colour",
    //     link:
    //       "/delight-leatherette-two-seater-sofa-in-ivory-colour/sku/HO340FU73ZTMHTFUR"
    //   },
    //   {
    //     image: GetTheLook03,
    //     name: "Delight Leatherette Single Seater Sofa in Ivory Colour",
    //     link:
    //       "/delight-leatherette-single-seater-sofa-in-ivory-colour/sku/HO340FU72ZTNHTFUR"
    //   }
    // ]
  };
  render() {
    // const { getTheLook1 } = this.state;
    return (
      <div>
        {/* 2nd banner */}
        <div>
          <Image
            mt="50px"
            mb="30px"
            src={secondBanner}
            style={{
              width: "90%",
              alignItems: "center",
              marginLeft: "5%",
              marginRight: "5%"
            }}
          />
        </div>
        {/* shop by categories */}
        <ShopByCategories />
        {/* shop by room */}

        <div mt="20px" mb="15px" style={{ display: "block" }}>
          <CategoryCarousel />
        </div>

        {/* deals of the day section */}
        <DealsOfTheDay />

        {/* Beast seat in the house */}
        <div>
          <HeadingHtV1
            mb="20px"
            mt="40px"
            fontSize="30px"
            style={{
              textAlign: "center",
              color: "#222222",
              fontFamily: "medium"
            }}
          >
            Best Seat In the House
          </HeadingHtV1>
          <Link to="/furniture/living-room-furniture/sofas">
            <HeadingHtV1
              fontFamily="medium"
              style={{
                textAlign: "center",
                fontSize: "15px",
                fontWeight: "bold",
                color: "#222222"
              }}
            >
              SHOP SOFAS AND RECLINERS{" "}
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
            <Image
              mt="30px"
              src={bestseatbanner01}
              style={{
                width: "90%",
                alignItems: "center",
                marginLeft: "5%",
                marginRight: "5%"
              }}
            />
          </Link>
        </div>
        {/* get the look */}
        <div pl="30px" pr="30px" pt="30px" pb="20px" mb="10px" bg="#F9F9F9">
          <CategoryCarouselLook />
        </div>
      </div>
    );
  }
}

export default HomeContainer;
