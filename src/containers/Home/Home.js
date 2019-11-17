import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LazyLoad from 'react-lazyload';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import cookie from 'js-cookie';
import { getCities, getOfferStripData, getMiddleBannerData } from 'selectors/homepage';
/* ====== Components ====== */
import BodyHtV1 from 'hometown-components/lib/BodyHtV1';
import ColHtV1 from 'hometown-components/lib/ColHtV1';
import RowHtV1 from 'hometown-components/lib/RowHtV1';
import WrapperHtV1 from 'hometown-components/lib/WrapperHtV1';
import ImageHtV1 from 'hometown-components/lib/ImageHtV1';
import TextHtV1 from 'hometown-components/lib/TextHtV1';
import BoxHtV1 from 'hometown-components/lib/BoxHtV1';
import SectionHtV1 from 'hometown-components/lib/SectionHtV1';
import MainSlider from 'newComponents/MainSlider';
import CategoryCarousel from 'newComponents/CategoryCarousel';
import Header from 'newComponents/Header';

const banner = 'https://www.hometown.in/media/cms/hometownnew/banner/hotdeals-midbanner_1.jpg';
const sliderImage = require('../../static/slider.png');
const bannerImage = require('../../static/banner.png');
const designBuildLogo = require('../../static/designBuildLogo.png');
const duracucine = require('../../static/duracucine.png');

const OFFER_ID = 5;

@connect(({
  homepage: {
    categories, banners, products, hashtags, offers, recentlyviewed
  }, stores, userLogin
}) => ({
  banners: banners.data,
  homepageCategories: categories.data,
  homepageProducts: products.data,
  cities: getCities(stores),
  hashtags: hashtags.data,
  offerStrip: getOfferStripData(offers),
  middleBanner: getMiddleBannerData(offers),
  recentlyviewed: recentlyviewed.data,
  isLoggedIn: userLogin.isLoggedIn
}))
export default class Home extends Component {
  state = {
    showRibbon: true,
    openSignup: false
  };
  componentDidMount() {
    const { isLoggedIn } = this.props;
    if (!isLoggedIn && !(cookie.get('PROMO_SIGNUP') === 'AVOID')) {
      this.signupmodalreference = setTimeout(() => this.handleModal(), 45000);
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.isLoggedIn && nextProps.isLoggedIn !== this.props.isLoggedIn) {
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
  handleModal = () => {
    this.setState({ openSignup: !this.state.openSignup }, () => {
      if (!this.state.openSignup) {
        cookie.set('PROMO_SIGNUP', 'AVOID', { expires: 2 });
      }
    });
  };
  handleRibbon = () => {
    this.setState({
      showRibbon: !this.state.showRibbon
    });
  };

  render() {
    const { banners, homepageCategories } = this.props;

    return (
      /* eslint-disable max-len */
      <WrapperHtV1>
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
        </Helmet>
        <BodyHtV1>
          <Header />
          <MainSlider data={banners} />
          {homepageCategories.map((category, index) => {
            const { id } = category;
            if (id && OFFER_ID !== id && OFFER_ID !== parseInt(id, 10)) {
              return (
                <LazyLoad height={200} offset={100} key={String(index)}>
                  <CategoryCarousel
                    categoryName={category.title}
                    subTitle={category.sub_title}
                    data={category.values}
                  />
                </LazyLoad>
              );
            }
            return '';
          })}
          <RowHtV1 m={20}>
            <ImageHtV1 src={banner} variant="image" />
          </RowHtV1>
          <TextHtV1 variant="text.catSliderTitle">LET US DESIGN FOR YOU</TextHtV1>
          <ColHtV1 justifyContent="center" m={25}>
            <SectionHtV1>
              <BoxHtV1 position="relative">
                <ImageHtV1 src={sliderImage} pr={10} />
                <ImageHtV1 src={designBuildLogo} variant="image.logoHomeTown" />
              </BoxHtV1>
              <TextHtV1 variant="text.catSliderTitle" pt={10}>
                Lorem ipsum doler sit
              </TextHtV1>
            </SectionHtV1>
            <SectionHtV1>
              <BoxHtV1 position="relative">
                <ImageHtV1 src={bannerImage} pl={10} />
                <ImageHtV1 src={duracucine} variant="image.logoHomeTown" />
              </BoxHtV1>
              <TextHtV1 variant="text.catSliderTitle">Lorem ipsum doler sit</TextHtV1>
            </SectionHtV1>
          </ColHtV1>
        </BodyHtV1>
      </WrapperHtV1>
    );
  }
}

Home.defaultProps = {
  isLoggedIn: false,
  banners: [],
  homepageCategories: []
};

Home.propTypes = {
  isLoggedIn: PropTypes.bool,
  banners: PropTypes.array,
  homepageCategories: PropTypes.array
};
