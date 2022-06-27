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
        <Helmet title="Online Furniture Stores: Buy Home Decor, Furnishing, Tableware & Kitchenware Online at HomeTown">
          <meta
            name="description"
            content="Buy premium quality home furniture at HomeTown, India's largest online furniture store. Give your house a makeover with variety of home decor, furnishing & kitchenware items. Shop now!"
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
            {`{
              "@context": "http://schema.org",
              "@type": "Organization",
              "name": "HomeTown",
              "image": "https://cdn.shopify.com/s/files/1/1231/6442/files/CW_logo-03_1_240x.png?v=1624623636",
              "@id": "support@cottonworld.net",
              "url": "https://www.hometown.in/",
              "telephone": "1800-210-0004",
              "address": {
              "@type": "PostalAddress",
              "streetAddress": "Praxis Home Retail Limited (“PHRL”), (f/k/a Praxis Home Retail Private Limited), iThink Techno Campus,Jolly Board Tower D, Ground Floor",
              "addressLocality": "Kanjurmarg (East), Mumbai",
              "postalCode": "400042",
              "addressCountry": "IN"
              },
              "sameAs": [
              "https://twitter.com/HomeTownLive",
              "https://www.facebook.com/hometown",
              "https://www.instagram.com/hometownlive/",
              "https://in.pinterest.com/hometownblog/"
              ]
            }`}
          </script>
          <script type="application/ld+json">
            {`{
      "@context":"http://schema.org",
      "@type":"ItemList",
      "itemListElement":[
                                 {
         "@type": "SiteNavigationElement",
          "position": 1,
          "name": "Online Exclusive",
          "description": "Get Best Furniture Deals online on items for Sale at Upto 60% Off. Choose from a wide range of best deal furniture and best furniture deals online on wide range of products on HomeTown in India at the best prices ✔Fast Shipping, ✔High Quality ✔0% EMI ✔Free Assembly",
          "url":"https://www.hometown.in/hot-deals"
        },
{
         "@type": "SiteNavigationElement",
          "position": 2,
          "name": "Home Packages",
          "description": "Get Best Deals on Customized Home Furniture Packages Online. Select from ⭐Full Home ⭐Living and Dining Room ⭐Bedroom Furniture Packages Basis Your Need & Budget At Best Prices From HomeTown.",
          "url":"https://www.hometown.in/packages"
        },
{
         "@type": "SiteNavigationElement",
          "position": 3,
          "name": "Furniture",
          "description": "Furniture: Buy Wooden Furniture Online at upto 60% OFF. Explore wide range of furniture designs for ⭐Latest Bedroom Furniture ⭐Living Room Furniture & more at HomeTown ✔Free Installation ✔Easy EMI ✔Free Shipping",
          "url":"https://www.hometown.in/furniture"
        },
       {
          "@type": "SiteNavigationElement",
          "position": 4,
          "name": "Home Decor",
          "description": "Home Decor: Buy Home Decoration items & Accessories Online in India. Choose from a wide range of ✯Paintings ✯Photo Frames ✯Clocks ✯Indoor Plants ✯Wall Hangings ✯Lamps & more at HomeTown. ✔Exclusive Designs ✔Easy Finance ✔Free Assembly",
          "url":"https://www.hometown.in/home-decor"
        },
       {
          "@type": "SiteNavigationElement",
          "position": 5,
          "name": "Home Furnishing",
          "description": "Furnishings: Grab the Best Deal on Home Furnishing Items Online @ Upto 50% OFF. Shop from a wide range of ⭐Curtains ⭐Mats ⭐Blankets ⭐Pillows ⭐Bathroom Accessories from HomeTown ✔Free Shipping ✔Easy EMI",
          "url":"https://www.hometown.in/home-furnishings"
        },
            {
          "@type": "SiteNavigationElement",
          "position": 6,
          "name": "Tableware & Kitchenware",
          "description": "Kitchen Items: Buy Tableware and Kitchenware products online @ upto 50% OFF. Choose from ⭐Dinner Sets ⭐Crockery ⭐Induction Cooktops ⭐Kitchen Appliances & more online at best prices from HomeTown. ✔Easy Returns ✔Easy EMI",
          "url":"https://www.hometown.in/tableware-kitchenware"
        },
            {
          "@type": "SiteNavigationElement",
          "position": 7,
          "name": "Modular Kitchen",
          "description": "HomeTown provides personalised modular kitchen design services for small modular kitchen, L Shaped, U Shaped & more. Shop from a wide range of latest modular kitchen design at best price.",
          "url":"https://www.hometown.in/modular-kitchens"
        }
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
