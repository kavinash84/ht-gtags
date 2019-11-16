import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import cookie from 'js-cookie';
import { getCities, getOfferStripData, getMiddleBannerData } from 'selectors/homepage';

/* ====== Components ====== */
import BodyHtV1 from 'hometown-components/lib/BodyHtV1';
// import BoxHtV1 from 'hometown-components/lib/BoxHtV1';
// import ColHtV1 from 'hometown-components/lib/ColHtV1';
// import RowHtV1 from 'hometown-components/lib/RowHtV1';
import WrapperHtV1 from 'hometown-components/lib/WrapperHtV1';

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
        <BodyHtV1>Start from heree.....</BodyHtV1>
      </WrapperHtV1>
    );
  }
}

Home.defaultProps = {
  isLoggedIn: false
};

Home.propTypes = {
  isLoggedIn: PropTypes.bool
};
