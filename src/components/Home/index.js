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

import LazyLoad from "react-lazyload";
import { Shimmer, BackgroundMasker } from "hometown-components-dev/lib/Shimmer";

const arrowForward = require("../../../static/new-home/newForwardArrow.svg");
const ShopNowarrowForward = require("../../../static/new-home/shopnowarrow.svg");

const PlaceHolderShimmer = () => (
  <Div mb="1rem">
    <Shimmer height="168px">
      <BackgroundMasker width="20%" height="25px" left="0" />
      <BackgroundMasker width="20%" height="25px" right="0" />
      <BackgroundMasker width="100%" height="10px" left="0" top="25px" />
      <BackgroundMasker width="15px" height="153px" left="0" top="35px" />
      <BackgroundMasker
        width="15px"
        height="153px"
        left="calc(15px + 153px)"
        top="35px"
      />
      <BackgroundMasker
        width="15px"
        height="153px"
        left="calc(15px + 153px + 15px + 153px)"
        top="35px"
      />
    </Shimmer>
  </Div>
);

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
        <LazyLoad placeholder={<PlaceHolderShimmer />} height={150}>
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
                data-src={secondbanner.image}
                src={`${secondbanner.image}?blur=30`}
                alt="secondbanner"
                style={{
                  zIndex: "10px"
                }}
              />
            </div>
          </Link>
        </LazyLoad>

        {/* shop by categories */}
        <LazyLoad placeholder={<PlaceHolderShimmer />} height={150}>
          <ShopByCategories shopByCategories={shopByCategories} />
        </LazyLoad>

        {/* mid banner */}
        <LazyLoad placeholder={<PlaceHolderShimmer />} height={150}>
          <div style={{ marginBottom: "40px" }}>
            <MainSliderTwo secondmainbanner={secondmainbanner} />
          </div>
        </LazyLoad>

        {/* shop by room */}
        <LazyLoad placeholder={<PlaceHolderShimmer />} height={150}>
          <div>
            <ShopByRooms shopByRooms={shopByRooms} />
          </div>
        </LazyLoad>

        {/* Deals of the day */}
        <LazyLoad placeholder={<PlaceHolderShimmer />} height={150}>
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
        </LazyLoad>

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
        <LazyLoad placeholder={<PlaceHolderShimmer />} height={150}>
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
                data-src={bestSeat.image}
                src={`${bestSeat.image}?blur=30`}
                style={{
                  width: "92%",
                  alignItems: "center",
                  marginLeft: "4%",
                  marginRight: "4%"
                }}
              />
            </Link>
          </div>
        </LazyLoad>

        {/* get the look one */}
        <LazyLoad placeholder={<PlaceHolderShimmer />} height={150}>
          <div>
            {getTheLook.data.length ? (
              <CategoryCarouselLook getTheLook={getTheLook} />
            ) : null}
          </div>
        </LazyLoad>

        {/* style your home */}
        <LazyLoad placeholder={<PlaceHolderShimmer />} height={150}>
          <StyleYourHome styleYourHome={styleYourHome} />
        </LazyLoad>

        {/* Shop homeware */}
        <LazyLoad placeholder={<PlaceHolderShimmer />} height={150}>
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
                    data-src={val.image}
                    src={`${val.image}?blur=30`}
                    alt="IndoorFountain"
                  />
                </Link>
              </div>
            ))}
          </div>
        </LazyLoad>

        {/* Gift for every reason */}
        <LazyLoad placeholder={<PlaceHolderShimmer />} height={150}>
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
                  sessionStorage.setItem(
                    "HtscrollPosition",
                    window.pageYOffset
                  );
                }}
                to={gifting.url_key_gift1}
                style={{
                  width: "45%",
                  alignItems: "center",

                  zIndex: "10"
                }}
              >
                <Image data-src={gifting.image1} src={`${gifting.image1}?blur=30`} />
              </Link>
              <Link
                onClick={() => {
                  sessionStorage.setItem(
                    "HtscrollPosition",
                    window.pageYOffset
                  );
                }}
                to={gifting.url_key_gift2}
                style={{
                  width: "45%",
                  alignItems: "center",

                  zIndex: "10"
                }}
              >
                <Image data-src={gifting.image2} src={`${gifting.image2}?blur=30`} />
              </Link>
            </div>
          </div>
        </LazyLoad>

        {/* shop gifts by price */}
        {/* <div>
          <ShopGiftByPrice />
        </div> */}

        {/* Together In the moment */}
        <LazyLoad placeholder={<PlaceHolderShimmer />} height={150}>
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
                data-src={togetherInMoment.image}
                src={`${togetherInMoment.image}?blur=30`}
                style={{
                  width: "90%",
                  alignItems: "center",
                  marginLeft: "5%",
                  marginRight: "5%"
                }}
              />
            </Link>
          </div>
        </LazyLoad>

        {/* The way we're Entertaining now */}
        <LazyLoad placeholder={<PlaceHolderShimmer />} height={150}>
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
                    data-src={TheWayWeAreEntertainingNow.image1}
                    src={`${TheWayWeAreEntertainingNow.image1}?blur=30`}
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
                    data-src={TheWayWeAreEntertainingNow.image2}
                    src={`${TheWayWeAreEntertainingNow.image2}?blur=30`}
                  />
                </div>
              </div>
            </Link>
          </div>
        </LazyLoad>

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

        <LazyLoad placeholder={<PlaceHolderShimmer />} height={150}>
          <ShopOurNewArrivals
            shopOurNewArrivalFurniture={shopOurNewArrivalFurniture}
          />
        </LazyLoad>

        {/* wfh Favourites are back */}
        <LazyLoad placeholder={<PlaceHolderShimmer />} height={150}>
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
        </LazyLoad>

        {/* Trends we love */}
        <LazyLoad placeholder={<PlaceHolderShimmer />} height={150}>
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
                data-src={trendsWeLove1.data[0].image1}
                src={`${trendsWeLove1.data[0].image1}?blur=30`}
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
                data-src={trendsWeLove1.data[1].image2}
                src={`${trendsWeLove1.data[1].image2}?blur=30`}
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
                data-src={trendsWeLove1.data[2].image3}
                src={`${trendsWeLove1.data[2].image3}?blur=30`}
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
                data-src={trendsWeLove1.data[3].image4}
                src={`${trendsWeLove1.data[3].image4}?blur=30`}
                style={{
                  width: "75%",

                  alignItems: "center",
                  marginLeft: "12.5%",
                  marginRight: "12.5%"
                }}
              />
            </Link>
          </div>
        </LazyLoad>

        {/* for your master suite */}
        <LazyLoad placeholder={<PlaceHolderShimmer />} height={150}>
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
                data-src={forYourMasterSuite.image}
                src={`${forYourMasterSuite.image}?blur=30`}
                style={{
                  width: "90%",
                  alignItems: "center",
                  marginLeft: "5%",
                  marginRight: "5%"
                }}
              />
            </Link>
          </div>
        </LazyLoad>

        {/* get the look two */}
        <LazyLoad placeholder={<PlaceHolderShimmer />} height={150}>
          <div>
            {getTheLook2.id === "2" || getTheLook2.id === 2 ? (
              <CategoryCarouselLook getTheLook={getTheLook2} />
            ) : null}
          </div>
        </LazyLoad>

        {/* our bedding favourites */}
        <LazyLoad placeholder={<PlaceHolderShimmer />} height={150}>
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
                data-src={ourBeddingFavourites.image}
                src={`${ourBeddingFavourites.image}?blur=30`}
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
        </LazyLoad>

        {/* For a better sleep */}
        <LazyLoad placeholder={<PlaceHolderShimmer />} height={150}>
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
              data-src={forBetterSleep.image}
              src={`${forBetterSleep.image}?blur=30`}
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
                      data-src={forBetterSleep.data[0].image}
                      src={`${forBetterSleep.data[0].image}?blur=30`}
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
                      data-src={forBetterSleep.data[1].image}
                      src={`${forBetterSleep.data[1].image}?blur=30`}
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
                      data-src={forBetterSleep.data[2].image}
                      src={`${forBetterSleep.data[2].image}?blur=30`}
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
                      data-src={forBetterSleep.data[3].image}
                      src={`${forBetterSleep.data[3].image}?blur=30`}
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
        </LazyLoad>

        {/* shop our bestsellers */}
        <LazyLoad placeholder={<PlaceHolderShimmer />} height={150}>
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
        </LazyLoad>

        {/* D&B and MK */}
        <LazyLoad placeholder={<PlaceHolderShimmer />} height={150}>
          <div
            style={{
              position: "relative",
              marginTop: "10%",
              marginBottom: "10%"
            }}
          >
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
                  sessionStorage.setItem(
                    "HtscrollPosition",
                    window.pageYOffset
                  );
                }}
                to={customiseYourHome.url_key1}
                className="customise"
                target="_blank0"
              >
                <Image
                  mt="30px"
                  data-src={customiseYourHome.image1}
                  src={`${customiseYourHome.image1}?blur=30`}
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
                  sessionStorage.setItem(
                    "HtscrollPosition",
                    window.pageYOffset
                  );
                }}
                to={customiseYourHome.url_key2}
                target="_blank1"
              >
                <Image
                  mt="30px"
                  data-src={customiseYourHome.image2}
                  src={`${customiseYourHome.image2}?blur=30`}
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
        </LazyLoad>

        {/* Easy finance - static images */}
        <LazyLoad placeholder={<PlaceHolderShimmer />} height={150}>
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
        </LazyLoad>

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
