import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Menu from 'containers/MenuNew/index';
import MainSlider from 'components/MainSlider';
// import OfferRibbon from 'components/OfferRibbon';
// import ReloadNotification from 'components/ReloadNotification';
import CategoryCarousel from 'components/CategoryCarousel';
import ProductCarousel from 'components/ProductCarousel';
import Section from 'hometown-components/lib/Section';
import { connect } from 'react-redux';
import OfferBanner from 'components/Home/OfferBanner';
import Usp from 'components/Home/Usp';
import StoresCarousel from 'components/Stores';
import Footer from 'components/Footer';
import SignupModal from 'containers/Signup/SignupForm';
import ResponsiveModal from 'components/Modal';
import cookie from 'js-cookie';

import { getCities, getOfferStripData, getMiddleBannerData } from 'selectors/homepage';

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
    const {
      homepageCategories,
      homepageProducts,
      banners,
      cities,
      // offerStrip,
      middleBanner,
      recentlyviewed
    } = this.props;
    // const { showRibbon } = this.state;
    return (
      /* eslint-disable max-len */
      <Section p="0" mb="0">
        <Helmet title="Online Furniture Shopping, Buy Decor Items in India - HomeTown.in">
          <meta
            name="description"
            content="HomeTown - Shop online for Furniture, Home Decor, Furnishings, Kitchenware, Dining Products at best prices from HomeTown.in. Get best furniture and home decor products ☆Upto 40% Off, ☆Fast Shipping, ☆High Quality, ☆Premium, ☆Luxury furniture to beautify your ☆bedroom, ☆kitchen, ☆dining room, ☆living and ☆outdoor space ☆Original ☆0% EMI ☆Free Assembly ☆Safe Shipping."
          />
          <meta name="keywords" content="furniture, home-decor" />
          <meta name="robots" content="index, follow" />
        </Helmet>
        <div className="wrapper">
          {/* {offerStrip &&
            offerStrip.description !== '' && (
            <OfferRibbon
              title={offerStrip.description}
              showRibbon={showRibbon}
              onClick={this.handleRibbon}
              url={offerStrip.url_key}
            />
          )} */}
          {/* <ReloadNotification title="A new version available." showRibbon onClick={this.handleRibbon} /> */}

          <Menu />
          <MainSlider data={banners} />
          <Usp />
          {homepageCategories.map((category, index) => (
            <CategoryCarousel
              key={String(index)}
              categoryName={category.title}
              subTitle={category.sub_title}
              data={category.values}
            />
          ))}
          <OfferBanner image={middleBanner.image_url} url={middleBanner.url_key} />
          {homepageProducts.map((products, index) => (
            <ProductCarousel
              key={String(index)}
              title={products.title}
              subTitle={products.sub_title}
              data={products.values}
              pt="1.5rem"
              height="281px"
            />
          ))}
          {recentlyviewed.length > 0 && (
            <ProductCarousel
              title="Recently Viewed"
              data={recentlyviewed}
              length={recentlyviewed.length}
              pt="1.5rem"
              height="281px"
            />
          )}
          <StoresCarousel cities={cities} />
        </div>
        <ResponsiveModal
          classNames={{ modal: 'signupModal' }}
          onCloseModal={this.handleModal}
          open={this.state.openSignup}
        >
          <SignupModal />
        </ResponsiveModal>
        <Footer />
      </Section>
    );
  }
}

Home.defaultProps = {
  homepageCategories: [],
  homepageProducts: [],
  banners: [],
  cities: [],
  // offerStrip: {},
  recentlyviewed: [],
  middleBanner: {},
  isLoggedIn: false
};

Home.propTypes = {
  homepageCategories: PropTypes.array,
  homepageProducts: PropTypes.array,
  banners: PropTypes.array,
  cities: PropTypes.array,
  // offerStrip: PropTypes.object,
  recentlyviewed: PropTypes.array,
  middleBanner: PropTypes.object,
  isLoggedIn: PropTypes.bool
};
