import React, { Component } from "react";
import ShopByCategories from "../ShopByCategories";
import DealsOfTheDay from "../DealsOfTheDay/index";
import { Link } from "react-router-dom";
import HeadingHtV1 from "hometown-components-dev/lib/HeadingHtV1";
import Image from "hometown-components-dev/lib/ImageHtV1";
import CategoryCarouselLook from "../../components/CategoryCarouselLook";

// import CategoryCarousel from "../../components/CategoryCarouselHome";
import StyleYourHome from "../../components/StyleYourHome";
import ShopOurBestsellers from "../../components/ShopOurBestsellers";
import CategoryCarouselLookTwo from "../../components/CategoryCarouselLookTwo";
import ShopGiftByPrice from "./shopGiftByPrice/ShopGiftByPrice";
import ShopByRooms from "./shopByRoom/shopByRoom";

// easy finance
const HdfcLogo = require("../../../static/new-home/hdfc-logo.png");
const BajajLogo = require("../../../static/new-home/bajaj-logo.png");

const arrowForward = require("../../../static/new-home/newForwardArrow.svg");

class HomeContainer extends Component {
  render() {
    const {
      secondbanner,
      shopByCategories,
      shopByRooms,
      dealsOfthedaybannerone,
      dealsOfthedaybannerTwo,
      bestSeat,
      getTheLook,
      styleYourHome,
      homePageBanners,
      gifting,

      togetherInMoment,
      TheWayWeAreEntertainingNow,
      midbanner,
      shopOurNewArrivalFurniture,
      wfhAreBack,
      trendsWeLove1,
      forYourMasterSuite,
      getTheLook2,
      ourBeddingFavourites,
      forBetterSleep,
      customiseYourHome,
      shopTheRoom
    } = this.props;
    return (
      <div>
        {/* 2nd banner */}
        <div>
          <Image
            mt="50px"
            mb="30px"
            src={secondbanner.image}
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
        <ShopByCategories shopByCategories={shopByCategories} />
        {/* shop by room */}

        {/* <div mt="20px" mb="15px" style={{ display: "block" }}>
          <CategoryCarousel shopByRooms={shopByRooms} />
        </div> */}
        <ShopByRooms />
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
          dealsOfthedaybannerone={dealsOfthedaybannerone}
        >
          <Image
            mt="50px"
            mb="30px"
            src={dealsOfthedaybannerone.image}
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
            src={dealsOfthedaybannerTwo.image}
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
            {bestSeat.mainTitle}
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
              {bestSeat.button}
              <img
                style={{
                  display: "inline",
                  marginLeft: "-3px",
                  height: "10px",
                  width: "40px"
                }}
                src={arrowForward}
                alt="Arrow"
              />
            </HeadingHtV1>
            <Image
              mt="30px"
              src={bestSeat.image}
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

        <div>
          <CategoryCarouselLook getTheLook={getTheLook} />
        </div>

        {/* style your home */}
        <StyleYourHome styleYourHome={styleYourHome} />

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
          {homePageBanners.map((val, index) => (
            <div style={{ margin: "15px 10%" }}>
              <Link to={val.url_key}>
                <Image
                  style={{ width: "90%", marginLeft: "40px" }}
                  src={val.image}
                  alt="IndoorFountain"
                />
              </Link>
            </div>
          ))}
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
            {gifting.mainTitle}
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
            {gifting.description}
          </div>
          <Link to={gifting.url_key}>
            <HeadingHtV1
              style={{
                textAlign: "center",
                fontSize: "12px",
                fontFamily: "medium",
                color: "#222222",
                margin: "30px 20px"
              }}
            >
              {gifting.buttonTitle}

              <img
                style={{
                  display: "inline",
                  marginLeft: "-3px",
                  height: "10px",
                  width: "40px"
                }}
                src={arrowForward}
                alt="Arrow"
              />
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
                src={gifting.image1}
              />
              <Image
                style={{
                  width: "45%",
                  alignItems: "center",

                  zIndex: "10"
                }}
                src={gifting.image2}
              />
            </div>
          </Link>
        </div>
        {/* shop gifts by price */}
        <div>
          <ShopGiftByPrice />
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
            {togetherInMoment.mainTitle}
          </HeadingHtV1>
          <Link to={togetherInMoment.url_key}>
            <HeadingHtV1
              fontFamily="medium"
              style={{
                textAlign: "center",
                fontSize: "13px",
                fontWeight: "bold",
                color: "#222222"
              }}
            >
              {togetherInMoment.buttonTitle}
              <img
                style={{
                  display: "inline",
                  marginLeft: "-3px",
                  height: "10px",
                  width: "40px"
                }}
                src={arrowForward}
                alt="Arrow"
              />
            </HeadingHtV1>
            <Image
              mt="30px"
              src={togetherInMoment.image}
              style={{
                width: "90%",
                alignItems: "center",
                marginLeft: "5%",
                marginRight: "5%"
              }}
            />
          </Link>
        </div>
        {/* The way we're Entertaining now */}

        <div
          style={{
            display: "flex",
            width: "80%",
            flexDirection: "row",
            justifyContent: "center",
            alignContent: "center",
            marginTop: "20px",
            marginBottom: "30px",
            margin: "5% 10%"
          }}
        >
          <div style={{ width: "" }}>
            <Image
              style={{
                width: "90%",
                alignItems: "center",

                zIndex: "10"
              }}
              src={TheWayWeAreEntertainingNow.image1}
            />
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
              alignItems: "center",
              width: "40%",
              marginLeft: "-40px"
            }}
          >
            <HeadingHtV1
              fontSize="30px"
              textAlign="center"
              ml="10px"
              mr="10px"
              fontWeight="bold"
            >
              {TheWayWeAreEntertainingNow.mainTitleOne}
            </HeadingHtV1>
            <HeadingHtV1
              fontSize="30px"
              textAlign="center"
              ml="10px"
              mr="10px"
              mt="-40px"
            >
              {TheWayWeAreEntertainingNow.mainTitleTwo}
            </HeadingHtV1>
            <Link to={TheWayWeAreEntertainingNow.url_key}>
              <HeadingHtV1
                fontFamily="medium"
                style={{
                  textAlign: "center",
                  fontSize: "13px",
                  fontWeight: "bold",
                  color: "#222222",
                  marginTop: "-15px"
                }}
              >
                {TheWayWeAreEntertainingNow.buttonTitle}
                <img
                  style={{
                    display: "inline",
                    marginLeft: "-3px",
                    height: "10px",
                    width: "40px"
                  }}
                  src={arrowForward}
                  alt="Arrow"
                />
              </HeadingHtV1>
            </Link>
            <Image
              style={{
                alignItems: "center",

                zIndex: "10"
              }}
              src={TheWayWeAreEntertainingNow.image2}
            />
          </div>
        </div>

        {/* Mid banner */}
        <div style={{ marginTop: "30px" }}>
          {/* <Link to="/furniture"> */}
          <Image
            src={midbanner.image}
            width="90%"
            alt="MidBanner"
            style={{ display: "block", margin: "0 5%" }}
          />
          {/* </Link> */}
        </div>

        {/* shop our new arrivals in furniture */}
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
            {shopOurNewArrivalFurniture.mainTitle}
          </HeadingHtV1>
          <div
            style={{
              width: "30px",
              borderTop: "2px solid #222222",
              margin: "auto",
              marginBottom: "10px"
            }}
          />
          <Link to={shopOurNewArrivalFurniture.url_key}>
            <Image
              mt="30px"
              src={shopOurNewArrivalFurniture.image}
              style={{
                width: "90%",
                alignItems: "center",
                marginLeft: "5%",
                marginRight: "5%"
              }}
            />
          </Link>
        </div>

        {/* wfh Favourites are back */}
        <div>
          <Link to={wfhAreBack.url_key}>
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
                {wfhAreBack.mainTitle}
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
                {wfhAreBack.description}
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
                    display: "inline",
                    marginLeft: "-3px",
                    height: "10px",
                    width: "40px"
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
                  alignContent: "center",
                  position: "relative"
                }}
              >
                <Image
                  style={{
                    width: "45%",
                    alignItems: "center",

                    zIndex: "10"
                  }}
                  src={wfhAreBack.image1}
                />

                <Image
                  style={{
                    width: "45%",
                    alignItems: "center",

                    zIndex: "10"
                  }}
                  src={wfhAreBack.image2}
                />
              </div>
            </div>
          </Link>
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
            {trendsWeLove1.mainTitle}
          </HeadingHtV1>
          <Link to={trendsWeLove1.url_key}>
            <Image
              mt="10px"
              src={trendsWeLove1.image1}
              style={{
                width: "75%",
                alignItems: "center",
                marginLeft: "12%"
              }}
            />
          </Link>
          <Image
            mt="60px"
            src={trendsWeLove1.image2}
            style={{
              width: "75%",
              alignItems: "center",
              marginLeft: "12%"
            }}
          />
          <Image
            mt="60px"
            src={trendsWeLove1.image3}
            style={{
              width: "75%",
              alignItems: "center",
              marginLeft: "12%"
            }}
          />
          <Image
            mt="60px"
            src={trendsWeLove1.image4}
            style={{
              width: "75%",
              alignItems: "center",
              marginLeft: "12%"
            }}
          />
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
            {forYourMasterSuite.mainTitle}
          </HeadingHtV1>
          <Link to={forYourMasterSuite.url_key}>
            <HeadingHtV1
              fontFamily="medium"
              style={{
                textAlign: "center",
                fontSize: "13px",
                fontWeight: "bold",
                color: "#222222"
              }}
            >
              {forYourMasterSuite.buttonTitle}
              <img
                style={{
                  display: "inline",
                  marginLeft: "-3px",
                  height: "10px",
                  width: "40px"
                }}
                src={arrowForward}
                alt="Arrow"
              />
            </HeadingHtV1>
            <Image
              mt="30px"
              src={forYourMasterSuite.image}
              style={{
                width: "90%",
                alignItems: "center",
                marginLeft: "5%",
                marginRight: "5%"
              }}
            />
          </Link>
        </div>
        {/* get the look two */}
        <div>
          <CategoryCarouselLookTwo getTheLook2={getTheLook2} />
        </div>
        {/* our bedding favourites */}
        <div>
          <HeadingHtV1
            mb="20px"
            mt="90px"
            fontSize="30px"
            style={{
              textAlign: "center",
              color: "#222222",
              fontFamily: "medium"
            }}
          >
            {ourBeddingFavourites.mainTitle}
          </HeadingHtV1>
          <Link to={ourBeddingFavourites.url_key}>
            <HeadingHtV1
              fontFamily="medium"
              style={{
                textAlign: "center",
                fontSize: "13px",
                fontWeight: "bold",
                color: "#222222"
              }}
            >
              {ourBeddingFavourites.buttonTitle}
              <img
                style={{
                  display: "inline",
                  marginLeft: "-3px",
                  height: "10px",
                  width: "40px"
                }}
                src={arrowForward}
                alt="Arrow"
              />
            </HeadingHtV1>
            <Image
              mt="30px"
              src={ourBeddingFavourites.image}
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
            {ourBeddingFavourites.description}
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
              {forBetterSleep.mainTitle}
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
            src={forBetterSleep.image}
            alt="ForABetterSleep"
            style={{
              width: "90%",
              alignItems: "center",
              marginLeft: "5%",
              marginRight: "5%"
            }}
          />
          {/* </Link> */}
          <div>
            <div
              style={{
                display: "flex",
                width: "90%",
                justifyContent: "center",
                margin: "30px 5%"
              }}
            >
              <div style={{ width: "20%", margin: "0 10px" }}>
                <Link to={forBetterSleep.data[0].url_key}>
                  <Image
                    src={forBetterSleep.data[0].image}
                    alt="ForABetterSleep01"
                  />
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
                    {forBetterSleep.data[0].title}
                  </div>
                </Link>
              </div>
              <div style={{ width: "20%", margin: "0 10px" }}>
                <Link to={forBetterSleep.data[1].url_key}>
                  <Image
                    src={forBetterSleep.data[1].image}
                    alt="ForABetterSleep02"
                  />
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
                    {forBetterSleep.data[1].title}
                  </div>
                </Link>
              </div>
              <div style={{ width: "20%", margin: "0 10px" }}>
                <Link to={forBetterSleep.data[2].url_key}>
                  <Image
                    src={forBetterSleep.data[2].image}
                    alt="ForABetterSleep03"
                  />
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
                    {forBetterSleep.data[2].title}
                  </div>
                </Link>
              </div>
              <div style={{ width: "20%", margin: "0 10px" }}>
                <Link to={forBetterSleep.data[3].url_key}>
                  <Image
                    src={forBetterSleep.data[3].image}
                    alt="ForABetterSleep04"
                  />
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
                    {forBetterSleep.data[3].title}
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* shop our bestsellers */}
        <ShopOurBestsellers />
        {/* D&B and MK */}

        <div style={{ position: "relative", marginTop: "10%" }}>
          <div
            style={{
              border: "2px solid black",
              padding: "20px 10px",
              position: "absolute",
              height: "165vh",
              width: "70%",
              zIndex: "-10",
              margin: "0% 15%"
            }}
          />
          <div
            style={{
              display: "flex",
              textAlign: "center",
              alignContent: "center",
              justifyContent: "center",
              flexDirection: "column"
            }}
          >
            <div
              style={{
                color: "#323131",
                marginTop: "20px",
                fontFamily: "medium",
                marginBottom: "10px",
                fontSize: "30px"
              }}
            >
              {customiseYourHome.mainTitle}
            </div>
            <div
              style={{
                width: "30px",
                borderTop: "2px solid #222222",
                margin: "auto",
                marginBottom: "20px"
              }}
            />
            <Link to={customiseYourHome.url_key1}>
              <Image
                mt="30px"
                src={customiseYourHome.image1}
                style={{
                  width: "90%",
                  alignItems: "center",
                  marginLeft: "5%",
                  marginRight: "5%"
                }}
              />
            </Link>
            <Link to={customiseYourHome.url_key2}>
              <Image
                mt="30px"
                src={customiseYourHome.image2}
                style={{
                  width: "90%",
                  alignItems: "center",
                  marginLeft: "5%",
                  marginRight: "5%"
                }}
              />
            </Link>
          </div>
        </div>

        {/* shop the room */}

        <div>
          <HeadingHtV1
            mb="20px"
            mt="100px"
            fontSize="30px"
            style={{
              textAlign: "center",
              color: "#222222",
              fontFamily: "medium"
            }}
          >
            {shopTheRoom.mainTitle}
          </HeadingHtV1>
          <Link to={shopTheRoom.url_key}>
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
              <img
                style={{
                  display: "inline",
                  marginLeft: "-3px",
                  height: "10px",
                  width: "40px"
                }}
                src={arrowForward}
                alt="Arrow"
              />
            </HeadingHtV1>
            <Image
              mt="30px"
              src={shopTheRoom.image}
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
            {shopTheRoom.description}
          </div>
        </div>

        {/* Easy finance - static images */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            padding: "20px 30px",
            marginTop: "30px",
            backgroundColor: "#F5EEEE"
          }}
        >
          <HeadingHtV1
            pb="0px"
            pt="10px"
            ta="center"
            mb="10px"
            style={{
              color: "#323131",
              whiteSpace: "normal",
              fontFamily: "medium"
            }}
          >
            Easy Finance
          </HeadingHtV1>
          <div
            style={{
              width: "30px",
              borderTop: "2px solid #222222",
              margin: "auto",
              marginBottom: "20px"
            }}
          />
          <div
            style={{
              display: "flex",
              width: "80%",
              justifyContent: "center",
              margin: "10px 5% 30px 5%"
            }}
          >
            <div style={{ width: "20%", margin: "0 10px" }}>
              <div
                style={{
                  height: "230px",
                  backgroundColor: "white",
                  paddingTop: "30px",
                  paddingBottom: "30px",
                  paddingLeft: "30px",
                  paddingRight: "30px",
                  display: "flex",
                  justifyContent: "space-evenly",
                  alignContent: "center",
                  flexDirection: "column"
                }}
              >
                <Image src={HdfcLogo} width="90%" style={{ zIndex: "10" }} />
                <HeadingHtV1
                  fontSize="20px"
                  mb="5px"
                  lineHeight="23px"
                  style={{ color: "#575757" }}
                >
                  Upto 10% Cashback
                </HeadingHtV1>
                <div
                  fontSize="10px"
                  lineHeight="18px"
                  style={{ color: "#575757" }}
                >
                  On debit and credit cards
                </div>
              </div>
            </div>
            <div style={{ width: "20%", margin: "0 10px" }}>
              <div
                style={{
                  height: "230px",
                  backgroundColor: "white",
                  paddingTop: "30px",
                  paddingBottom: "30px",
                  paddingLeft: "30px",
                  paddingRight: "30px",
                  display: "flex",
                  justifyContent: "space-evenly",
                  alignContent: "center",
                  flexDirection: "column"
                }}
              >
                <Image src={BajajLogo} width="90%" style={{ zIndex: "10" }} />
                <HeadingHtV1
                  fontSize="20px"
                  mb="5px"
                  lineHeight="23px"
                  style={{ color: "#575757" }}
                >
                  0% Interest
                </HeadingHtV1>
                <div
                  fontSize="15px"
                  lineHeight="18px"
                  style={{ color: "#575757" }}
                >
                  On upto 6 months EMI for orders above 3000
                </div>
              </div>
            </div>
            <div style={{ width: "20%", margin: "0 10px" }}>
              <div
                style={{
                  height: "230px",
                  backgroundColor: "white",
                  paddingTop: "30px",
                  paddingBottom: "30px",
                  paddingLeft: "30px",
                  paddingRight: "30px",
                  display: "flex",
                  justifyContent: "space-evenly",
                  alignContent: "center",
                  flexDirection: "column"
                }}
              >
                <Image src={HdfcLogo} width="90%" style={{ zIndex: "10" }} />
                <HeadingHtV1
                  fontSize="20px"
                  mb="5px"
                  lineHeight="23px"
                  style={{ color: "#575757" }}
                >
                  Upto 10% Cashback
                </HeadingHtV1>
                <div
                  fontSize="15px"
                  lineHeight="18px"
                  style={{ color: "#575757" }}
                >
                  On debit and credit cards
                </div>
              </div>
            </div>
            <div style={{ width: "20%", margin: "0 10px" }}>
              <div
                style={{
                  height: "230px",
                  backgroundColor: "white",
                  paddingTop: "30px",
                  paddingBottom: "30px",
                  paddingLeft: "30px",
                  paddingRight: "30px",
                  display: "flex",
                  justifyContent: "space-evenly",
                  alignContent: "center",
                  flexDirection: "column"
                }}
              >
                <Image src={BajajLogo} width="90%" style={{ zIndex: "10" }} />
                <HeadingHtV1
                  fontSize="20px"
                  mb="5px"
                  lineHeight="23px"
                  style={{ color: "#575757" }}
                >
                  0% Interest
                </HeadingHtV1>
                <div
                  fontSize="8px"
                  lineHeight="18px"
                  style={{ color: "#575757" }}
                >
                  On upto 6 months EMI for orders above 3000
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HomeContainer;
