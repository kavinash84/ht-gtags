import React, { Component } from "react";
import ShopByCategories from "../ShopByCategories";
import Div from "hometown-components-dev/lib/BoxHtV1";
import { Link } from "react-router-dom";
import HeadingHtV1 from "hometown-components-dev/lib/HeadingHtV1";
import Image from "hometown-components-dev/lib/ImageHtV1";
import CategoryCarouselLook from "../../components/CategoryCarouselLook";
import CategoryCarouselDeals from "../../components/CategoryCarouselDeals";

import StyleYourHome from "../../components/StyleYourHome";
import MainSliderTwo from "../../components/mainSlider2";
import ShopGiftByPrice from "./shopGiftByPrice/ShopGiftByPrice";
import ShopByRooms from "./shopByRoom/shopByRoom";
import ShopOurNewArrivals from "../ShopOurNewArrivals";
import "./Slider.css";
import BankOfferes from "./bankOfferesCarosal";
// easy finance
// const HdfcLogo = require("../../../static/new-home/hdfc-logo.png");
// const BajajLogo = require("../../../static/new-home/bajaj-logo.png");

const arrowForward = require("../../../static/new-home/newForwardArrow.svg");
const ShopNowarrowForward = require("../../../static/new-home/shopnowarrow.svg");

class HomeContainer extends Component {
  render() {
    const {
      dealoftheday,
      bestsellers,
      secondbanner,
      secondmainbanner,
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
        <Link
          onClick={() => {
            sessionStorage.setItem("HtscrollPosition", window.pageYOffset);
          }}
          to={secondbanner.url_key}
        >
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
        </Link>
        {/* shop by categories */}
        <ShopByCategories shopByCategories={shopByCategories} />
        {/* mid banner */}
        <div style={{ marginBottom: "40px" }}>
          <MainSliderTwo secondmainbanner={secondmainbanner} />
        </div>
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

        {/* <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-evenly",
            alignContent: "center",
            marginTop: "70px"
          }}
          dealsOfthedaybannerone={dealsOfthedaybannerone}
        >
          {dealsOfthedaybannerone.url_key ? (
            <Link
              onClick={() => {
                sessionStorage.setItem("HtscrollPosition", window.pageYOffset);
              }}
              to={dealsOfthedaybannerone.url_key}
              style={{
                width: "45%",

                zIndex: "10"
              }}
            >
              <Image mt="50px" mb="30px" src={dealsOfthedaybannerone.image} />
            </Link>
          ) : (
            <Image
              style={{
                width: "45%",

                zIndex: "10"
              }}
              mt="50px"
              mb="30px"
              src={dealsOfthedaybannerone.image}
            />
          )}
          {dealsOfthedaybannerTwo.url_key ? (
            <Link
              onClick={() => {
                sessionStorage.setItem("HtscrollPosition", window.pageYOffset);
              }}
              to={dealsOfthedaybannerTwo.url_key}
              style={{
                width: "45%",

                zIndex: "10"
              }}
            >
              <Image mt="50px" mb="30px" src={dealsOfthedaybannerTwo.image} />
            </Link>
          ) : (
            <Image
              mt="50px"
              mb="30px"
              src={dealsOfthedaybannerTwo.image}
              style={{
                width: "45%",

                zIndex: "10"
              }}
            />
          )}
        </div> */}

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
            fontSize="35px"
          >
            {gifting.mainTitle}
          </HeadingHtV1>
          <div
            style={{
              fontSize: "20px",
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
            <Link
              onClick={() => {
                sessionStorage.setItem("HtscrollPosition", window.pageYOffset);
              }}
              to={gifting.url_key_gift1}
              style={{
                width: "45%",
                alignItems: "center",

                zIndex: "10"
              }}
            >
              <Image src={gifting.image1} />
            </Link>
            <Link
              onClick={() => {
                sessionStorage.setItem("HtscrollPosition", window.pageYOffset);
              }}
              to={gifting.url_key_gift2}
              style={{
                width: "45%",
                alignItems: "center",

                zIndex: "10"
              }}
            >
              <Image src={gifting.image2} />
            </Link>
          </div>
        </div>
        {/* shop gifts by price */}
        {/* <div>
          <ShopGiftByPrice />
        </div> */}
        {/* Together In the moment */}
        <div>
          <HeadingHtV1
            mb="30px"
            mt="60px"
            fontSize="35px"
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
                fontSize: "15px",
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
        <div>
          <Link
            onClick={() => {
              sessionStorage.setItem("HtscrollPosition", window.pageYOffset);
            }}
            to={TheWayWeAreEntertainingNow.url_key}
          >
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
                  className="thewayweare"
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
                <div style={{ marginBottom: "-90px" }}>
                  <HeadingHtV1
                    fontSize="35px"
                    textAlign="center"
                    ml="10px"
                    mr="10px"
                    fontWeight="bold"
                  >
                    {TheWayWeAreEntertainingNow.mainTitleOne}
                  </HeadingHtV1>
                  <HeadingHtV1
                    fontSize="35px"
                    textAlign="center"
                    ml="10px"
                    mr="10px"
                    mt="6px"
                  >
                    {TheWayWeAreEntertainingNow.mainTitleTwo}
                  </HeadingHtV1>

                  <HeadingHtV1
                    fontFamily="medium"
                    style={{
                      textAlign: "center",
                      fontSize: "15px",
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
                </div>
                <Image
                  className="thewayweare"
                  style={{
                    alignItems: "center",
                    marginTop: "135px",
                    zIndex: "10",
                    height: "75%"
                  }}
                  src={TheWayWeAreEntertainingNow.image2}
                />
              </div>
            </div>
          </Link>
        </div>
        {/* Mid banner */}

        {/* {!isLoggedIn ? (
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
        ) : null} */}

        {/* </Link> */}

        {/* shop our new arrivals in furniture */}
        {/* <div>
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
        </div> */}
        <ShopOurNewArrivals
          shopOurNewArrivalFurniture={shopOurNewArrivalFurniture}
        />

        {/* wfh Favourites are back */}
        <div>
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
              fontSize="35px"
            >
              {wfhAreBack.mainTitle}
            </HeadingHtV1>
            <div
              style={{
                fontSize: "18px",
                color: "gray",
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
                margin: "10px 250px 40px 250px",
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
            <div>
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
                <Link
                  onClick={() => {
                    sessionStorage.setItem(
                      "HtscrollPosition",
                      window.pageYOffset
                    );
                  }}
                  to={wfhAreBack.data[0].url_key}
                  style={{
                    alignItems: "center",
                    margin: "0 2.5%",
                    zIndex: "10"
                  }}
                >
                  <Image src={wfhAreBack.data[0].image1} />
                  <div
                    style={{
                      background: "#000",
                      padding: "15px 10px",
                      width: "43%",
                      margin: "-48px 30% 0px",
                      position: "relative",
                      opacity: "0.8",
                      textAlign: "center",
                      fontSize: "15px",
                      color: "white"
                    }}
                  >
                    SHOP NOW
                    <img
                      style={{
                        display: "inline",
                        marginLeft: "-3px",
                        height: "10px",
                        width: "40px"
                      }}
                      src={ShopNowarrowForward}
                      alt="Arrow"
                    />
                  </div>
                </Link>
                <Link
                  onClick={() => {
                    sessionStorage.setItem(
                      "HtscrollPosition",
                      window.pageYOffset
                    );
                  }}
                  to={wfhAreBack.data[1].url_key}
                  style={{
                    alignItems: "center",
                    margin: "0 2.5%",
                    zIndex: "10"
                  }}
                >
                  <Image src={wfhAreBack.data[1].image2} />
                  <div
                    style={{
                      background: "#000",
                      padding: "15px 10px",
                      width: "43%",
                      margin: "-48px 30% 0px",
                      position: "relative",
                      opacity: "0.8",
                      textAlign: "center",
                      fontSize: "15px",
                      color: "white"
                    }}
                  >
                    SHOP NOW
                    <img
                      style={{
                        display: "inline",
                        marginLeft: "-3px",
                        height: "10px",
                        width: "40px"
                      }}
                      src={ShopNowarrowForward}
                      alt="Arrow"
                    />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* Trends we love */}
        <div>
          <HeadingHtV1
            mt="70px"
            mb="20px"
            fontSize="35px"
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
            to={trendsWeLove1.data[0].url_key}
          >
            <Image
              mt="10px"
              src={trendsWeLove1.data[0].image1}
              style={{
                width: "75%",

                alignItems: "center",
                marginLeft: "12.5%",
                marginRight: "12.5%"
              }}
            />
          </Link>
          <Link
            onClick={() => {
              sessionStorage.setItem("HtscrollPosition", window.pageYOffset);
            }}
            to={trendsWeLove1.data[1].url_key}
          >
            <Image
              mt="60px"
              src={trendsWeLove1.data[1].image2}
              style={{
                width: "75%",

                alignItems: "center",
                marginLeft: "12.5%",
                marginRight: "12.5%"
              }}
            />
          </Link>
          <Link
            onClick={() => {
              sessionStorage.setItem("HtscrollPosition", window.pageYOffset);
            }}
            to={trendsWeLove1.data[2].url_key}
          >
            <Image
              mt="60px"
              src={trendsWeLove1.data[2].image3}
              style={{
                width: "75%",

                alignItems: "center",
                marginLeft: "12.5%",
                marginRight: "12.5%"
              }}
            />
          </Link>
          <Link
            onClick={() => {
              sessionStorage.setItem("HtscrollPosition", window.pageYOffset);
            }}
            to={trendsWeLove1.data[3].url_key}
          >
            <Image
              mt="60px"
              src={trendsWeLove1.data[3].image4}
              style={{
                width: "75%",

                alignItems: "center",
                marginLeft: "12.5%",
                marginRight: "12.5%"
              }}
            />
          </Link>
        </div>
        {/* for your master suite */}

        <div>
          <HeadingHtV1
            mb="20px"
            mt="80px"
            fontSize="35px"
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
                fontSize: "15px",
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
            fontSize="35px"
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
                fontSize: "15px",
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
              fontSize: "20px",
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
              fontSize="35px"
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

        <div style={{ position: "relative", marginTop: "10%", marginBottom: "10%" }}>
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
                marginBottom: "20px",
                fontSize: "35px"
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
              className="customise"
              target="_blank0"
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
              className="customise"
              onClick={() => {
                sessionStorage.setItem("HtscrollPosition", window.pageYOffset);
              }}
              to={customiseYourHome.url_key2}
              target="_blank1"
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
        {/* Easy finance - static images */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            padding: "20px 30px",
            marginTop: "80px",
            backgroundColor: "#F5EEEE"
          }}
        >
          <HeadingHtV1
            pb="0px"
            pt="10px"
            ta="center"
            mb="10px"
            fontSize="35px"
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
          <BankOfferes easyFinance={easyFinance} />
        </div>
        {/* shop the room */}

        {/* <div>
          <HeadingHtV1
            mb="20px"
            mt="150px"
            fontSize="35px"
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
                fontSize: "15px",
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
        </div> */}


      </div>
    );
  }
}

export default HomeContainer;
