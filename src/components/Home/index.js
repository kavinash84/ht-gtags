import React, { Component } from "react";
import ShopByCategories from "../ShopByCategories";

import { Link } from "react-router-dom";
import HeadingHtV1 from "hometown-components-dev/lib/HeadingHtV1";
import Image from "hometown-components-dev/lib/ImageHtV1";
import CategoryCarouselLook from "../../components/CategoryCarouselLook";
import CategoryCarouselDeals from "../../components/CategoryCarouselDeals";

import StyleYourHome from "../../components/StyleYourHome";

import ShopGiftByPrice from "./shopGiftByPrice/ShopGiftByPrice";
import ShopByRooms from "./shopByRoom/shopByRoom";

// easy finance
const HdfcLogo = require("../../../static/new-home/hdfc-logo.png");
const BajajLogo = require("../../../static/new-home/bajaj-logo.png");

const arrowForward = require("../../../static/new-home/newForwardArrow.svg");

class HomeContainer extends Component {
  render() {
    const {
      dealoftheday,
      bestsellers,
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
      shopTheRoom,
      isLoggedIn,
      easyFinance
    } = this.props;
    return (
      <div>
        {/* 2nd banner */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            width: "80%",
            margin: "0 10%"
          }}
        >
          <Image
            mt="50px"
            mb="30px"
            src={secondbanner.image}
            style={{
              zIndex: "10px"
            }}
          />
        </div>
        {/* shop by categories */}
        <ShopByCategories shopByCategories={shopByCategories} />
        {/* shop by room */}

        <div>
          <ShopByRooms shopByRooms={shopByRooms} />
        </div>

        {/* Deals of the day */}

        {dealoftheday && dealoftheday.length ? (
          <div>
            <CategoryCarouselDeals
              categoryName="Deals Of The Day"
              colSize="20%"
              id={1}
              data={dealoftheday}
            />
          </div>
        ) : null}

        {/* sale of the day */}

        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-evenly",
            alignContent: "center",
            marginTop: "70px"
          }}
          dealsOfthedaybannerone={dealsOfthedaybannerone}
        >
          <Image
            mt="50px"
            mb="30px"
            src={dealsOfthedaybannerone.image}
            style={{
              width: "45%",

              zIndex: "10"
            }}
          />
          <Image
            mt="50px"
            mb="30px"
            src={dealsOfthedaybannerTwo.image}
            style={{
              width: "45%",

              zIndex: "10"
            }}
          />
        </div>

        {/* Beast seat in the house  */}
        <div>
          <HeadingHtV1
            mb="20px"
            mt="70px"
            fontSize="30px"
            style={{
              textAlign: "center",
              color: "#222222",
              fontFamily: "medium"
            }}
          >
            {bestSeat.mainTitle}
          </HeadingHtV1>
          <Link
            onClick={() => {
              sessionStorage.setItem("HtscrollPosition", window.pageYOffset);
            }}
            to={bestSeat.url_key}
          >
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
                width: "92%",
                alignItems: "center",
                marginLeft: "4%",
                marginRight: "4%"
              }}
            />
          </Link>
        </div>
        {/* get the look one */}

        <div>
          {getTheLook.data.length ? (
            <CategoryCarouselLook getTheLook={getTheLook} />
          ) : null}
        </div>

        {/* style your home */}
        <StyleYourHome styleYourHome={styleYourHome} />

        {/* Shop homeware */}
        <div
          style={{
            width: "80%",
            display: "flex",
            margin: "auto",
            flexDirection: "column",
            justifyContent: "center",
            alignContent: "center"
          }}
        >
          {homePageBanners.map((val, index) => (
            <div
              style={{
                marginTop: "30px",
                marginBottom: "10px"
              }}
            >
              <Link
                onClick={() => {
                  sessionStorage.setItem(
                    "HtscrollPosition",
                    window.pageYOffset
                  );
                }}
                to={val.url_key}
              >
                <Image
                  // style={{ width: "97%" }}
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
            alignContent: "center",
            marginTop: "50px"
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
              width: "60%",
              margin: "0 20%",
              justifyContent: "center",
              alignContent: "center",

              textAlign: "center"
            }}
          >
            {gifting.description}
          </div>
          <Link
            onClick={() => {
              sessionStorage.setItem("HtscrollPosition", window.pageYOffset);
            }}
            to={gifting.url_key}
          >
            <HeadingHtV1
              style={{
                textAlign: "center",
                fontSize: "15px",
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
                width: "85%",
                margin: "auto",
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
            mt="10px"
            fontSize="30px"
            style={{
              textAlign: "center",
              color: "#222222",
              fontFamily: "medium"
            }}
          >
            {togetherInMoment.mainTitle}
          </HeadingHtV1>
          <Link
            onClick={() => {
              sessionStorage.setItem("HtscrollPosition", window.pageYOffset);
            }}
            to={togetherInMoment.url_key}
          >
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
            margin: "3% 10%"
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
              justifyContent: "flex-end",
              alignItems: "center",
              width: "40%",
              marginLeft: "-40px"
            }}
          >
            <div style={{ marginBottom: "-70px" }}>
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
                mt="6px"
              >
                {TheWayWeAreEntertainingNow.mainTitleTwo}
              </HeadingHtV1>
              <Link
                onClick={() => {
                  sessionStorage.setItem(
                    "HtscrollPosition",
                    window.pageYOffset
                  );
                }}
                to={TheWayWeAreEntertainingNow.url_key}
              >
                <HeadingHtV1
                  fontFamily="medium"
                  style={{
                    textAlign: "center",
                    fontSize: "13px",
                    fontWeight: "bold",
                    color: "#222222",
                    marginTop: "15px"
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
            </div>
            <Image
              style={{
                alignItems: "center",
                marginTop: "135px",
                zIndex: "10"
              }}
              src={TheWayWeAreEntertainingNow.image2}
            />
          </div>
        </div>

        {/* Mid banner */}

        {!isLoggedIn ? (
          <div style={{ marginTop: "50px" }}>
            <Link
              to={midbanner.url_key}
              onClick={() => {
                sessionStorage.setItem("HtscrollPosition", window.pageYOffset);
              }}
            >
              <Image
                src={midbanner.image}
                width="90%"
                alt="MidBanner"
                style={{ display: "block", margin: "0 5%" }}
              />
            </Link>
          </div>
        ) : null}

        {/* </Link> */}

        {/* shop our new arrivals in furniture */}
        <div>
          <HeadingHtV1
            mb="20px"
            mt="70px"
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
          <Link
            onClick={() => {
              sessionStorage.setItem("HtscrollPosition", window.pageYOffset);
            }}
            to={shopOurNewArrivalFurniture.url_key}
          >
            <Image
              mt="15px"
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
          <Link
            onClick={() => {
              sessionStorage.setItem("HtscrollPosition", window.pageYOffset);
            }}
            to={wfhAreBack.url_key}
          >
            <div
              style={{
                display: "flex",
                width: "100%",
                flexDirection: "column",
                justifyContent: "space-evenly",
                alignContent: "center",
                marginTop: "40px"
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
                  width: "80%",
                  marginLeft: "10%",
                  marginRight: "10%",
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
            mt="70px"
            fontSize="30px"
            style={{
              width: "70%",
              textAlign: "left",
              marginLeft: "12.5%",
              color: "#222222",
              fontFamily: "medium"
            }}
          >
            {trendsWeLove1.mainTitle}
          </HeadingHtV1>
          <Link
            onClick={() => {
              sessionStorage.setItem("HtscrollPosition", window.pageYOffset);
            }}
            to={trendsWeLove1.url_key}
          >
            <Image
              mt="10px"
              src={trendsWeLove1.image1}
              style={{
                width: "75%",

                alignItems: "center",
                marginLeft: "12.5%",
                marginRight: "12.5%"
              }}
            />
          </Link>
          <Image
            mt="60px"
            src={trendsWeLove1.image2}
            style={{
              width: "75%",

              alignItems: "center",
              marginLeft: "12.5%",
              marginRight: "12.5%"
            }}
          />
          <Image
            mt="60px"
            src={trendsWeLove1.image3}
            style={{
              width: "75%",

              alignItems: "center",
              marginLeft: "12.5%",
              marginRight: "12.5%"
            }}
          />
          <Image
            mt="60px"
            src={trendsWeLove1.image4}
            style={{
              width: "75%",

              alignItems: "center",
              marginLeft: "12.5%",
              marginRight: "12.5%"
            }}
          />
        </div>
        {/* for your master suite */}

        <div>
          <HeadingHtV1
            mb="20px"
            mt="80px"
            fontSize="30px"
            style={{
              textAlign: "center",
              color: "#222222",
              fontFamily: "medium"
            }}
          >
            {forYourMasterSuite.mainTitle}
          </HeadingHtV1>
          <Link
            onClick={() => {
              sessionStorage.setItem("HtscrollPosition", window.pageYOffset);
            }}
            to={forYourMasterSuite.url_key}
          >
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
          {getTheLook2.id === "2" || getTheLook2.id === 2 ? (
            <CategoryCarouselLook getTheLook={getTheLook2} />
          ) : null}
        </div>
        {/* our bedding favourites */}
        <div>
          <HeadingHtV1
            mb="20px"
            mt="150px"
            fontSize="30px"
            style={{
              textAlign: "center",
              color: "#222222",
              fontFamily: "medium"
            }}
          >
            {ourBeddingFavourites.mainTitle}
          </HeadingHtV1>
          <Link
            onClick={() => {
              sessionStorage.setItem("HtscrollPosition", window.pageYOffset);
            }}
            to={ourBeddingFavourites.url_key}
          >
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

        <div style={{ marginTop: "80px" }}>
          <div className="gradient-sleep">
            <HeadingHtV1
              style={{
                textAlign: "center",
                color: "#323131",
                fontFamily: "medium",
                width: "90%",
                alignItems: "center",
                marginLeft: "5%",
                marginRight: "5%"
              }}
              backgroundColor="#EDEDED99"
              fontSize="30px"
              mt="30px"
              pb="30px"
              pt="30px"
            >
              {forBetterSleep.mainTitle}
              <div
                style={{
                  width: "30px",
                  borderTop: "2px solid #222222",
                  margin: "auto",
                  marginBottom: "20px",
                  marginTop: "20px"
                }}
              />
            </HeadingHtV1>
          </div>

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
                width: "80%",
                justifyContent: "center",
                margin: "30px 9.5%"
              }}
            >
              <div style={{ width: "20%", margin: "0 10px" }}>
                <Link
                  onClick={() => {
                    sessionStorage.setItem(
                      "HtscrollPosition",
                      window.pageYOffset
                    );
                  }}
                  to={forBetterSleep.data[0].url_key}
                >
                  <Image
                    src={forBetterSleep.data[0].image}
                    alt="ForABetterSleep01"
                  />
                  <div
                    style={{
                      background: "#FFFFFF",
                      padding: "16px 10px",
                      width: "85%",
                      margin: "-52px auto 0px",
                      position: "relative",
                      opacity: "90%",
                      textAlign: "center",
                      fontSize: "20px",
                      color: "black"
                      // fontWeight: 'bolder'
                    }}
                  >
                    {forBetterSleep.data[0].title}
                  </div>
                </Link>
              </div>
              <div style={{ width: "20%", margin: "0 10px" }}>
                <Link
                  onClick={() => {
                    sessionStorage.setItem(
                      "HtscrollPosition",
                      window.pageYOffset
                    );
                  }}
                  to={forBetterSleep.data[1].url_key}
                >
                  <Image
                    src={forBetterSleep.data[1].image}
                    alt="ForABetterSleep02"
                  />
                  <div
                    style={{
                      background: "#FFFFFF",
                      padding: "16px 10px",
                      width: "85%",
                      margin: "-52px auto 0px",
                      position: "relative",
                      opacity: "90%",
                      textAlign: "center",
                      fontSize: "20px",
                      color: "black"
                    }}
                  >
                    {forBetterSleep.data[1].title}
                  </div>
                </Link>
              </div>
              <div style={{ width: "20%", margin: "0 10px" }}>
                <Link
                  onClick={() => {
                    sessionStorage.setItem(
                      "HtscrollPosition",
                      window.pageYOffset
                    );
                  }}
                  to={forBetterSleep.data[2].url_key}
                >
                  <Image
                    src={forBetterSleep.data[2].image}
                    alt="ForABetterSleep03"
                  />
                  <div
                    style={{
                      background: "#FFFFFF",
                      padding: "16px 10px",
                      width: "85%",
                      margin: "-52px auto 0px",
                      position: "relative",
                      opacity: "90%",
                      textAlign: "center",
                      fontSize: "20px",
                      color: "black"
                    }}
                  >
                    {forBetterSleep.data[2].title}
                  </div>
                </Link>
              </div>
              <div style={{ width: "20%", margin: "0 10px" }}>
                <Link
                  onClick={() => {
                    sessionStorage.setItem(
                      "HtscrollPosition",
                      window.pageYOffset
                    );
                  }}
                  to={forBetterSleep.data[3].url_key}
                >
                  <Image
                    src={forBetterSleep.data[3].image}
                    alt="ForABetterSleep04"
                  />
                  <div
                    style={{
                      background: "#FFFFFF",
                      padding: "16px 10px",
                      width: "85%",
                      margin: "-52px auto 0px",
                      position: "relative",
                      opacity: "90%",
                      textAlign: "center",
                      fontSize: "20px",
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

        {console.log(bestsellers, "bestsellers")}
        {bestsellers && bestsellers.length ? (
          <Div pl="10px" pr="10px" mt="30px" mb="15px" bg="#F7F0F0">
            <CategoryCarouselDeals
              categoryName="Shop our Bestsellers"
              colSize="45%"
              id={2}
              data={bestsellers}
            />
          </Div>
        ) : null}
        {/* D&B and MK */}

        <div style={{ position: "relative", marginTop: "10%" }}>
          <div
            style={{
              border: "2px solid black",
              padding: "20px 10px",
              position: "absolute",
              height: "105%",
              width: "50%",
              zIndex: "-10",
              margin: "0% 25%"
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
            <Link
              onClick={() => {
                sessionStorage.setItem("HtscrollPosition", window.pageYOffset);
              }}
              to={customiseYourHome.url_key1}
            >
              <Image
                mt="30px"
                src={customiseYourHome.image1}
                style={{
                  width: "80%",
                  alignItems: "center",
                  marginLeft: "10%",
                  marginRight: "10%"
                }}
              />
            </Link>
            <Link
              onClick={() => {
                sessionStorage.setItem("HtscrollPosition", window.pageYOffset);
              }}
              to={customiseYourHome.url_key2}
            >
              <Image
                mt="30px"
                src={customiseYourHome.image2}
                style={{
                  width: "80%",
                  alignItems: "center",
                  marginLeft: "10%",
                  marginRight: "10%"
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
          <Link
            onClick={() => {
              sessionStorage.setItem("HtscrollPosition", window.pageYOffset);
            }}
            to={shopTheRoom.url_key}
          >
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
            marginTop: "70px",
            backgroundColor: "#F5EEEE"
          }}
        >
          <HeadingHtV1
            pb="0px"
            pt="10px"
            ta="center"
            mb="10px"
            fontSize="30px"
            style={{
              color: "#323131",
              whiteSpace: "normal",
              fontFamily: "medium"
            }}
          >
            {easyFinance.headerTitle}
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
              width: "70%",
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
                <Image
                  src={easyFinance.data[0].url}
                  width="90%"
                  style={{ zIndex: "10" }}
                />
                <HeadingHtV1
                  fontSize="20px"
                  mb="5px"
                  lineHeight="23px"
                  style={{ color: "#575757" }}
                >
                  {easyFinance.data[0].title}
                </HeadingHtV1>
                <div
                  fontSize="10px"
                  lineHeight="18px"
                  style={{ color: "#575757" }}
                >
                  {easyFinance.data[0].desc}
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
                <Image
                  src={easyFinance.data[1].url}
                  width="90%"
                  style={{ zIndex: "10" }}
                />
                <HeadingHtV1
                  fontSize="20px"
                  mb="5px"
                  lineHeight="23px"
                  style={{ color: "#575757" }}
                >
                  {easyFinance.data[1].title}
                </HeadingHtV1>
                <div
                  fontSize="15px"
                  lineHeight="18px"
                  style={{ color: "#575757" }}
                >
                  {easyFinance.data[1].desc}
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
                <Image
                  src={easyFinance.data[2].url}
                  width="90%"
                  style={{ zIndex: "10" }}
                />
                <HeadingHtV1
                  fontSize="20px"
                  mb="5px"
                  lineHeight="23px"
                  style={{ color: "#575757" }}
                >
                  {easyFinance.data[2].title}
                </HeadingHtV1>
                <div
                  fontSize="15px"
                  lineHeight="18px"
                  style={{ color: "#575757" }}
                >
                  {easyFinance.data[2].desc}
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
                <Image
                  src={easyFinance.data[3].url}
                  width="90%"
                  style={{ zIndex: "10" }}
                />
                <HeadingHtV1
                  fontSize="20px"
                  mb="5px"
                  lineHeight="23px"
                  style={{ color: "#575757" }}
                >
                  {easyFinance.data[3].title}
                </HeadingHtV1>
                <div
                  fontSize="8px"
                  lineHeight="18px"
                  style={{ color: "#575757" }}
                >
                  {easyFinance.data[3].desc}
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
