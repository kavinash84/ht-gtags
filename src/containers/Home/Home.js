import React, { Component } from "react";
import PropTypes from "prop-types";
// import LazyLoad from "react-lazyload";
import Helmet from "react-helmet";
import { connect } from "react-redux";
import cookie from "js-cookie";
import {
  getCities,
  getOfferStripData,
  getMiddleBannerData
} from "selectors/homepage";
// import Select from "react-select";
// import { Link } from "react-router-dom";

/* ====== Components ====== */
import Body from "hometown-components-dev/lib/BodyHtV1";
// import Box from "hometown-components-dev/lib/BoxHtV1";
// import Button from "hometown-components-dev/lib/ButtonHtV1";
// import Card from "hometown-components-dev/lib/CardHtV1";
// import Container from "hometown-components-dev/lib/ContainerHtV1";
// import Col from "hometown-components-dev/lib/ColHtV1";
// import Heading from "hometown-components-dev/lib/HeadingHtV1";
// import Image from "hometown-components-dev/lib/ImageHtV1";
// import Row from "hometown-components-dev/lib/RowHtV1";
import Section from "hometown-components-dev/lib/SectionHtV1";
// import Text from "hometown-components-dev/lib/TextHtV1";
import Wrapper from "hometown-components-dev/lib/WrapperHtV1";

/* ====== Page Components ====== */
// import CategoryCarousel from "components/CategoryCarousel";
// import OfferBanner from "components/Home/OfferBanner";
import Footer from "components/Footer";
import Header from "components/Header";
// import GridView from "components/Home/GridView";
import MainSlider from "components/MainSlider";
// import Title from "components/Title";
import HomeContainer from "../../components/Home/index";
// import Usp from "components/Home/Usp";
import UnbxdRecentlyViewed from "components/UnbxdRecentlyViewed/UnbxdRecentlyViewed";
// import ShopByCategories from "../../components/ShopByCategories";

// const sliderImage = require("../../../static/DnB.jpeg");
// const bannerImage = require("../../../static/modularKitchen.jpeg");
// const designBuildLogo = require('../../static/designBuildLogo.png');
import StoresCarousel from "components/Stores";

// const OFFER_ID = 5;

const customDropdownStyles = {
  container: provided => ({
    ...provided,
    width: 275
  }),
  control: provided => ({
    ...provided,
    height: 48,
    borderRadius: 0,
    border: "none",
    backgroundColor: "rgba(255,255,255, 0.8)"
  }),
  placeholder: provided => ({
    ...provided,
    color: "#4a4949"
  }),
  indicatorsContainer: provided => ({
    ...provided,
    path: {
      fill: "#4a4949"
    }
  })
};

@connect(
  ({
    homepage: {
      categories,
      banners,
      products,
      hashtags,
      offers,
      recentlyviewed,
      instafeeds,
      homepagecmsdata,
      dealoftheday,
      bestsellers
    },
    stores,
    userLogin
  }) => ({
    instafeeds: instafeeds.data,
    banners: banners.data,
    homepageCategories: categories.data,
    homepageProducts: products.data,
    cities: getCities(stores),
    hashtags: hashtags.data,
    offerStrip: getOfferStripData(offers),
    middleBanner: getMiddleBannerData(offers),
    recentlyviewed: recentlyviewed.data,
    isLoggedIn: userLogin.isLoggedIn,
    homepagecmsdata: homepagecmsdata.data.items.text,
    dealoftheday: dealoftheday.data,
    bestsellers: bestsellers.data
  })
)
export default class Home extends Component {
  state = {
    showRibbon: true,
    openSignup: false,
    selectedCity: "",
    citySelectError: false,
    cityErrorMessage: "Please select your nearest city"
  };
  componentDidMount() {
    const { isLoggedIn } = this.props;
    if (!isLoggedIn && !(cookie.get("PROMO_SIGNUP") === "AVOID")) {
      this.signupmodalreference = setTimeout(() => this.handleModal(), 45000);
    }
  }
  componentWillReceiveProps(nextProps) {
    if (
      nextProps.isLoggedIn &&
      nextProps.isLoggedIn !== this.props.isLoggedIn
    ) {
      this.setState({
        openSignup: !this.state.openSignup
      });
    }
  }
  componentWillUnmount() {
    if (this.signupmodalreference) {
      clearTimeout(this.signupmodalreference);
    }
  }
  // mapHandler = e => {
  //   e.preventDefault();
  //   const { selectedCity } = this.state;
  //   if (selectedCity) {
  //     this.props.history.push({
  //       pathname: "/store-locator",
  //       state: { city: selectedCity }
  //     });
  //   } else {
  //     this.setState({
  //       citySelectError: true
  //     });
  //   }
  // };
  // handleModal = () => {
  //   this.setState({ openSignup: !this.state.openSignup }, () => {
  //     if (!this.state.openSignup) {
  //       cookie.set("PROMO_SIGNUP", "AVOID", { expires: 2 });
  //     }
  //   });
  // };
  // handleRibbon = () => {
  //   this.setState({
  //     showRibbon: !this.state.showRibbon
  //   });
  // };

  render() {
    const {
      banners,

      middleBanner,
      homepageCategories,
      cities,
      homepagecmsdata,
      dealoftheday,
      bestsellers
    } = this.props;
    const citiesList = cities.map(item => ({ value: item, label: item }));
    const { citySelectError, cityErrorMessage } = this.state;
    const {
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
      shopGiftByPrice,
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
      easyFinance
    } = homepagecmsdata;

    console.log("12222998888", dealoftheday);
    return (
      /* eslint-disable max-len */
      <Wrapper>
        <Helmet title="Online Furniture Shopping, Buy Decor Items in India - HomeTown.in">
          <meta
            name="description"
            content="HomeTown - Shop online for Furniture, Home Decor, Furnishings, Kitchenware, Dining Products at best prices from HomeTown.in. Get best furniture and home decor products ☆Upto 40% Off, ☆Fast Shipping, ☆High Quality, ☆Premium, ☆Luxury furniture to beautify your ☆bedroom, ☆kitchen, ☆dining room, ☆living and ☆outdoor space ☆Original ☆0% EMI ☆Free Assembly ☆Safe Shipping."
          />
          <meta name="keywords" content="furniture, home-decor" />
          <meta name="robots" content="index, follow" />
          <script type="application/ld+json">
            {`
              {
                "@context": "http://schema.org",
                "@type": "WebSite",
                "url": "https://www.hometown.in/",
                "potentialAction": {
                  "@type": "SearchAction",
                  "target": "https://www.hometown.in/search/?q={search_term_string}",
                  "query-input": "required name=search_term_string"
                }
              }
            `}
          </script>
          <script type="application/ld+json">
            {`
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "HomeTown",
              "url": "https://www.hometown.in/",
              "logo": "https://www.hometown.in/dist/2.0.1/bab5098b6c1ea32db0ed253a12fe29e3.png",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "1800-210-0004",
                "contactType": "customer service",
                "contactOption": "TollFree",
                "areaServed": "IN",
                "availableLanguage": "Hindi"
              },
              "sameAs": [
                "https://www.facebook.com/hometown.in/",
                "https://twitter.com/HomeTown_In/",
                "https://www.instagram.com/hometownindia/",
                "https://www.youtube.com/channel/UCBZGArWnKT6MYYwOsPCNjiw",
            
              ]
            }  
          `}
          </script>
        </Helmet>
        <Body>
          {/* Header */}
          <Header />
          {/* Main Slider */}
          <MainSlider data={banners} />
          {/* USPs */}
          {/* <Usp /> */}
          <HomeContainer
            bestsellers={bestsellers}
            dealoftheday={dealoftheday}
            secondbanner={secondbanner}
            shopByCategories={shopByCategories}
            secondmainbanner={secondmainbanner}
            shopByRooms={shopByRooms}
            dealsOfthedaybannerone={dealsOfthedaybannerone}
            dealsOfthedaybannerTwo={dealsOfthedaybannerTwo}
            bestSeat={bestSeat}
            getTheLook={getTheLook}
            styleYourHome={styleYourHome}
            homePageBanners={homePageBanners}
            gifting={gifting}
            shopGiftByPrice={shopGiftByPrice}
            togetherInMoment={togetherInMoment}
            TheWayWeAreEntertainingNow={TheWayWeAreEntertainingNow}
            midbanner={midbanner}
            shopOurNewArrivalFurniture={shopOurNewArrivalFurniture}
            wfhAreBack={wfhAreBack}
            trendsWeLove1={trendsWeLove1}
            forYourMasterSuite={forYourMasterSuite}
            getTheLook2={getTheLook2}
            ourBeddingFavourites={ourBeddingFavourites}
            forBetterSleep={forBetterSleep}
            customiseYourHome={customiseYourHome}
            shopTheRoom={shopTheRoom}
            easyFinance={easyFinance}
          />

          <Section>
            <UnbxdRecentlyViewed />
          </Section>
          {/* stores */}
          <StoresCarousel cities={cities} />

          <Footer />
        </Body>
      </Wrapper>
    );
  }
}

Home.defaultProps = {
  isLoggedIn: false,
  banners: [],
  homepageCategories: [],
  cities: [],
  middleBanner: {}
};

Home.propTypes = {
  isLoggedIn: PropTypes.bool,
  banners: PropTypes.array,
  homepageCategories: PropTypes.array,
  cities: PropTypes.array,
  history: PropTypes.object.isRequired,
  middleBanner: PropTypes.object
};
