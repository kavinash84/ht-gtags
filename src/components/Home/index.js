import React, { Component } from "react";
import ShopByCategories from "../ShopByCategories";
import DealsOfTheDay from "../DealsOfTheDay/index";
import { Link } from "react-router-dom";
import HeadingHtV1 from "hometown-components-dev/lib/HeadingHtV1";
import Image from "hometown-components-dev/lib/ImageHtV1";
import CategoryCarouselLook from "../../components/CategoryCarouselLook";
import CategoryCarousel from "../../components/CategoryCarouselHome";
import StyleYourHome from "../../components/StyleYourHome";
import ShopOurBestsellers from "../../components/ShopOurBestsellers";

// Shop by room
// const shopByRoom01 = require("../../../static/new-home/shopbyroom01.png");
// const shopByRoom02 = require("../../../static/new-home/shopbyroom02.png");
// const shopByRoom03 = require("../../../static/new-home/shopbyroom01.png");
// const shopByRoom04 = require("../../../static/new-home/shopbyroom02.png");

const bestseatbanner01 = require("../../../static/new-home/bestseatbanner01.png");
const secondBanner = require("../../../static/new-home/bannerImage.png");
const GiftBanner01 = require("../../../static/new-home/giftbanner01.png");
const GiftBanner02 = require("../../../static/new-home/giftbanner02.png");
const TogetherInTheMoment = require("../../../static/new-home/togetherinthemomentbanner.png");
const MidBanner = require("../../../static/new-home/midbanner.png");
const WorkFromHome01 = require("../../../static/new-home/WorkFromHome01.png");
const WorkFromHome02 = require("../../../static/new-home/WorkFromHome02.png");
const OurBeddingFev = require("../../../static/new-home/ourbeddingfev.png");
const MasterSuite = require("../../../static/new-home/mastersuite01.png");
const TrendsWeLove01 = require("../../../static/new-home/trendswelove01.png");
const TrendsWeLove02 = require("../../../static/new-home/trendswelove02.png");
const TrendsWeLove03 = require("../../../static/new-home/trendswelove03.png");
const TrendsWeLove04 = require("../../../static/new-home/trendswelove04.png");
const ShopTheRoomBanner01 = require("../../../static/new-home/ShopTheRoomBanner01.png");
const modularKitchenBanner = require("../../../static/new-home/modularKitchenBanner.png");
const HomeInteriorsBannner = require("../../../static/new-home/HomeInteriorsBannner.png");

// sales of the day
const salesOfTheDay01 = require("../../../static/new-home/saleoftheday01.png");
const salesOfTheDay02 = require("../../../static/new-home/saleoftheday02.png");

// Get the look
// const GetTheLook01 = require("../../../static/new-home/getthelook01.png");
// const GetTheLook02 = require("../../../static/new-home/getthelook02.png");
// const GetTheLook03 = require("../../../static/new-home/getthelook03.png");
// const GetTheLook04 = require("../../../static/new-home/getthelook04.png");
// const GetTheLook05 = require("../../../static/new-home/getthelook05.png");
// const GetTheLook06 = require("../../../static/new-home/getthelook06.png");

// Shop Homeware
const IndoorFountain = require("../../../static/new-home/Homeware01.png");
const Pillow = require("../../../static/new-home/Homeware02.png");
const Curtains = require("../../../static/new-home/Homeware03.png");
const Containers = require("../../../static/new-home/Homeware04.png");

// For a better sleep
const ForABetterSleep = require("../../../static/new-home/ForABetterSleep.png");
const ForABetterSleep01 = require("../../../static/new-home/ForABetterSleep01.png");
const ForABetterSleep02 = require("../../../static/new-home/ForABetterSleep02.png");
const ForABetterSleep03 = require("../../../static/new-home/ForABetterSleep03.png");
const ForABetterSleep04 = require("../../../static/new-home/ForABetterSleep04.png");

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
              marginRight: "5%",
              zIndex: "10px"
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

        {/* sale of the day */}

        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-evenly",
            alignContent: "center"
          }}
        >
          <Image
            mt="50px"
            mb="30px"
            src={salesOfTheDay01}
            style={{
              width: "45%",
              alignItems: "center",

              marginLeft: "2.5%",
              zIndex: "10"
            }}
          />
          <Image
            mt="50px"
            mb="30px"
            src={salesOfTheDay02}
            style={{
              width: "45%",
              alignItems: "center",

              marginRight: "2.5%",
              zIndex: "10"
            }}
          />
        </div>

        {/* Beast seat in the house -01 */}
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
                fontSize: "13px",
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

        {/* style your home */}
        <StyleYourHome />

        {/* Shop homeware */}
        <div
          style={{
            marginBottom: "20px",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignContent: "center"
          }}
        >
          <div style={{ margin: "15px 10%" }}>
            <Link to="/home-decor/garden">
              <Image
                style={{ width: "90%", marginLeft: "40px" }}
                src={IndoorFountain}
                alt="IndoorFountain"
              />
            </Link>
          </div>
          <div style={{ margin: "15px 10%" }}>
            <Link to="/home-furnishings/pillows/memory-foam-pillows">
              <Image
                src={Pillow}
                alt="Pillow"
                style={{ width: "90%", marginLeft: "40px" }}
              />
            </Link>
          </div>
          <div style={{ margin: "15px 10%" }}>
            <Link to="/home-furnishings/curtains">
              <Image
                src={Curtains}
                alt="Curtains"
                style={{ width: "90%", marginLeft: "40px" }}
              />
            </Link>
          </div>
          <div style={{ margin: "15px 10%" }}>
            <Link to="/kitchenware/food-storage">
              <Image
                src={Containers}
                alt="Containers"
                style={{ width: "90%", marginLeft: "40px" }}
              />
            </Link>
          </div>
        </div>

        {/* Gift for every reason */}

        <div
          style={{
            display: "flex",
            width: "100%",
            flexDirection: "column",
            justifyContent: "space-evenly",
            alignContent: "center"
          }}
        >
          <HeadingHtV1
            mb="10px"
            style={{
              textAlign: "center",
              color: "#323131",
              fontFamily: "medium",
              margin: "20px 0"
            }}
            fontSize="30px"
          >
            Gifts For Every Reason
          </HeadingHtV1>
          <div
            style={{
              fontSize: "15px",
              color: "gray",
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              margin: "0 250px",
              textAlign: "center"
            }}
          >
            Casual get-togethers or intimate soirees, our dining room furniture
            collection has the perfect pieces to make every moment into a
            memorable one. Shop dining room sets, dining chairs, bar stools,
            sideboards or serving trolleys
          </div>
          <Link to="/gifts">
            <HeadingHtV1
              style={{
                textAlign: "center",
                fontSize: "12px",
                fontFamily: "medium",
                color: "#222222",
                margin: "30px 20px"
              }}
            >
              SHOP GIFTING
              {/* <img
                style={{
                  display: 'inline',
                  marginLeft: '-6px',
                  height: '10px',
                  width: '40px'
                }}
                src={arrowForward}
                alt="Arrow"
              /> */}
            </HeadingHtV1>
            <div
              style={{
                display: "flex",
                margin: "0 10%",
                justifyContent: "space-evenly",
                alignContent: "center"
              }}
            >
              <Image
                style={{
                  width: "45%",
                  alignItems: "center",

                  zIndex: "10"
                }}
                src={GiftBanner01}
              />
              <Image
                style={{
                  width: "45%",
                  alignItems: "center",

                  zIndex: "10"
                }}
                src={GiftBanner02}
              />
            </div>
          </Link>
        </div>
        {/* Together In the moment */}
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
            Together In the moment
          </HeadingHtV1>
          <Link to="/furniture/living-room-furniture/sofas">
            <HeadingHtV1
              fontFamily="medium"
              style={{
                textAlign: "center",
                fontSize: "13px",
                fontWeight: "bold",
                color: "#222222"
              }}
            >
              SHOP DINNING SET
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
              src={TogetherInTheMoment}
              style={{
                width: "90%",
                alignItems: "center",
                marginLeft: "5%",
                marginRight: "5%"
              }}
            />
          </Link>
        </div>
        {/* Mid banner */}
        <div style={{ marginTop: "30px" }}>
          {/* <Link to="/furniture"> */}
          <Image
            src={MidBanner}
            width="90%"
            alt="MidBanner"
            style={{ display: "block", margin: "0 5%" }}
          />
          {/* </Link> */}
        </div>

        {/* shop our new arrivals in furniture */}
        {/* wfh Favourites are back */}

        <div
          style={{
            display: "flex",
            width: "100%",
            flexDirection: "column",
            justifyContent: "space-evenly",
            alignContent: "center"
          }}
        >
          <HeadingHtV1
            style={{
              textAlign: "center",
              color: "#323131",
              fontFamily: "medium",
              margin: "30px 0 10px 0px"
            }}
            fontSize="30px"
          >
            Wfh Favourites Are Back
          </HeadingHtV1>
          <div
            style={{
              fontSize: "15px",
              color: "gray",
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              margin: "10px 250px 20px 250px",
              textAlign: "center"
            }}
          >
            Desks and Chairs are ready to ship.
          </div>

          {/* <HeadingHtV1
              style={{
                textAlign: "center",
                fontSize: "12px",
                fontFamily: "medium",
                color: "#222222",
                margin: "30px 20px"
              }}
            >
              SHOP GIFTING
              <img
                style={{
                  display: 'inline',
                  marginLeft: '-6px',
                  height: '10px',
                  width: '40px'
                }}
                src={arrowForward}
                alt="Arrow"
              />
            </HeadingHtV1> */}
          <div
            style={{
              display: "flex",
              margin: "0 10%",
              justifyContent: "space-evenly",
              alignContent: "center"
            }}
          >
            <Image
              style={{
                width: "45%",
                alignItems: "center",

                zIndex: "10"
              }}
              src={WorkFromHome01}
            />
            <Image
              style={{
                width: "45%",
                alignItems: "center",

                zIndex: "10"
              }}
              src={WorkFromHome02}
            />
          </div>
        </div>
        {/* Trends we love */}
        <div>
          <HeadingHtV1
            mt="60px"
            fontSize="30px"
            style={{
              width: "100%",
              textAlign: "left",
              marginLeft: "12%",
              color: "#222222",
              fontFamily: "medium"
            }}
          >
            Trends We Love
          </HeadingHtV1>
          {/* <Link to="/home-decor/trends/bahama-luxe"> */}

          <Image
            mt="10px"
            src={TrendsWeLove01}
            style={{
              width: "75%",
              alignItems: "center",
              marginLeft: "12%"
            }}
          />
          <Image
            mt="60px"
            src={TrendsWeLove02}
            style={{
              width: "75%",
              alignItems: "center",
              marginLeft: "12%"
            }}
          />
          <Image
            mt="60px"
            src={TrendsWeLove03}
            style={{
              width: "75%",
              alignItems: "center",
              marginLeft: "12%"
            }}
          />
          <Image
            mt="60px"
            src={TrendsWeLove04}
            style={{
              width: "75%",
              alignItems: "center",
              marginLeft: "12%"
            }}
          />
          {/* </Link> */}
        </div>
        {/* for your master suite */}

        <div>
          <HeadingHtV1
            mb="20px"
            mt="50px"
            fontSize="30px"
            style={{
              textAlign: "center",
              color: "#222222",
              fontFamily: "medium"
            }}
          >
            For Your Master Suite
          </HeadingHtV1>
          <Link to="/furniture/living-room-furniture/sofas">
            <HeadingHtV1
              fontFamily="medium"
              style={{
                textAlign: "center",
                fontSize: "13px",
                fontWeight: "bold",
                color: "#222222"
              }}
            >
              SHOP BEDROOMS
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
              src={MasterSuite}
              style={{
                width: "90%",
                alignItems: "center",
                marginLeft: "5%",
                marginRight: "5%"
              }}
            />
          </Link>
        </div>
        {/* our bedding favourites */}
        <div>
          <HeadingHtV1
            mb="20px"
            mt="50px"
            fontSize="30px"
            style={{
              textAlign: "center",
              color: "#222222",
              fontFamily: "medium"
            }}
          >
            Our Bedding Favourites
          </HeadingHtV1>
          <Link to="/furniture/living-room-furniture/sofas">
            <HeadingHtV1
              fontFamily="medium"
              style={{
                textAlign: "center",
                fontSize: "13px",
                fontWeight: "bold",
                color: "#222222"
              }}
            >
              SHOP BEDDING
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
              src={OurBeddingFev}
              style={{
                width: "90%",
                alignItems: "center",
                marginLeft: "5%",
                marginRight: "5%"
              }}
            />
          </Link>
          <div
            style={{
              fontSize: "15px",
              color: "gray",
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              margin: "20px 250px 40px 250px",
              textAlign: "center"
            }}
          >
            Bring plus style and comfort to Your bedroom with our wide range of
            bedsheet, comforters, duvets
          </div>
        </div>

        {/* For a better sleep */}

        <div
          style={{
            paddingLeft: "30px",
            paddingRight: "30px"
          }}
        >
          <div className="gradient-sleep">
            <HeadingHtV1
              style={{
                textAlign: "center",
                color: "#323131",
                fontFamily: "medium"
              }}
              fontSize="30px"
              mb="10px"
              mt="0px"
              pb="5px"
              pt="30px"
            >
              For A Better Sleep
            </HeadingHtV1>
          </div>
          <div
            style={{
              width: "30px",
              borderTop: "2px solid #222222",
              margin: "auto",
              marginBottom: "20px"
            }}
          />
          {/* <Link to="/furniture/bedroom-furniture"> */}
          <Image
            src={ForABetterSleep}
            alt="ForABetterSleep"
            style={{
              width: "90%",
              alignItems: "center",
              marginLeft: "5%",
              marginRight: "5%"
            }}
          />
          {/* </Link> */}
          <div mt="30px">
            <div
              style={{
                display: "flex",
                width: "90%",
                justifyContent: "center",
                margin: "30px 5%"
              }}
            >
              <div style={{ width: "20%", margin: "0 10px" }}>
                <Link to="/furniture/mattresses">
                  <Image src={ForABetterSleep01} alt="ForABetterSleep01" />
                  <div
                    style={{
                      background: "#FFFFFF",
                      padding: "15px 10px",
                      width: "85%",
                      margin: "-45px auto 0px",
                      position: "relative",
                      opacity: "90%",
                      textAlign: "center",
                      fontSize: "14px",
                      color: "black"
                      // fontWeight: 'bolder'
                    }}
                  >
                    Mattress
                  </div>
                </Link>
              </div>
              <div style={{ width: "20%", margin: "0 10px" }}>
                <Link to="/home-furnishings/pillows">
                  <Image src={ForABetterSleep02} alt="ForABetterSleep02" />
                  <div
                    style={{
                      background: "#FFFFFF",
                      padding: "15px 10px",
                      width: "85%",
                      margin: "-45px auto 0px",
                      position: "relative",
                      opacity: "90%",
                      textAlign: "center",
                      fontSize: "14px",
                      color: "black"
                    }}
                  >
                    Pillows
                  </div>
                </Link>
              </div>
              <div style={{ width: "20%", margin: "0 10px" }}>
                <Link to="/home-furnishings/bedding/comforters">
                  <Image src={ForABetterSleep03} alt="ForABetterSleep03" />
                  <div
                    style={{
                      background: "#FFFFFF",
                      padding: "15px 10px",
                      width: "85%",
                      margin: "-45px auto 0px",
                      position: "relative",
                      opacity: "90%",
                      textAlign: "center",
                      fontSize: "14px",
                      color: "black"
                    }}
                  >
                    Comforters
                  </div>
                </Link>
              </div>
              <div style={{ width: "20%", margin: "0 10px" }}>
                <Link to="/home-furnishings/protectors/mattress-protectors">
                  <Image src={ForABetterSleep04} alt="ForABetterSleep04" />
                  <div
                    style={{
                      background: "#FFFFFF",
                      padding: "15px 10px",
                      width: "85%",
                      margin: "-45px auto 0px",
                      position: "relative",
                      opacity: "90%",
                      textAlign: "center",
                      fontSize: "14px",
                      color: "black"
                    }}
                  >
                    Mattress Protectors
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* shop our bestsellers */}
        <ShopOurBestsellers />

        {/* shop the room */}

        <div>
          <HeadingHtV1
            mb="20px"
            mt="50px"
            fontSize="30px"
            style={{
              textAlign: "center",
              color: "#222222",
              fontFamily: "medium"
            }}
          >
            Shop The Room
          </HeadingHtV1>
          <Link to="/furniture/living-room-furniture/sofas">
            <HeadingHtV1
              fontFamily="medium"
              style={{
                textAlign: "center",
                fontSize: "13px",
                fontWeight: "bold",
                color: "#222222"
              }}
            >
              SHOP THE LOOK
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
              src={ShopTheRoomBanner01}
              style={{
                width: "90%",
                alignItems: "center",
                marginLeft: "5%",
                marginRight: "5%"
              }}
            />
          </Link>
          <div
            style={{
              fontSize: "15px",
              color: "gray",
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              margin: "20px 250px 40px 250px",
              textAlign: "center"
            }}
          >
            A glamorous upgrade from the classic living room, we have created a
            blue and mixed matal haven for the contemporary homemaker
          </div>
        </div>

        {/* D&B and MK */}
        <div
          style={{
            marginTop: "50px",
            paddingLeft: "50px",
            paddingRight: "50px"
          }}
        >
          <div style={{ border: "2px solid black", padding: "20px 10px" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <div
                style={{
                  color: "#323131",

                  fontFamily: "medium",
                  marginBottom: "10px",
                  fontSize: "30px"
                }}
              >
                Customise Your Home With Us
              </div>
              <div
                style={{
                  width: "30px",
                  borderTop: "2px solid #222222",
                  margin: "auto",
                  marginBottom: "20px"
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HomeContainer;
