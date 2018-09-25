import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Menu from 'containers/MenuNew/index';
import MainSlider from 'components/MainSlider';
import OfferRibbon from 'components/OfferRibbon';
import CategoryCarousel from 'components/CategoryCarousel';
import ProductCarousel from 'components/ProductCarousel';
import Section from 'hometown-components/lib/Section';
import { connect } from 'react-redux';
import OfferBanner from 'components/Home/OfferBanner';
import StoresCarousel from 'components/Stores';
import Footer from 'components/Footer';
import { getCities, getOfferStripData, getMiddleBannerData } from 'selectors/homepage';

@connect(({
  homepage: {
    categories, banners, products, hashtags, offers, recentlyviewed
  }, stores
}) => ({
  banners: banners.data,
  homepageCategories: categories.data,
  homepageProducts: products.data,
  cities: getCities(stores),
  hashtags: hashtags.data,
  offerStrip: getOfferStripData(offers),
  middleBanner: getMiddleBannerData(offers),
  recentlyviewed: recentlyviewed.data
}))
export default class Home extends Component {
  state = {
    showRibbon: true
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
      offerStrip,
      middleBanner,
      recentlyviewed
    } = this.props;
    const { showRibbon } = this.state;
    return (
      <Section p="0" mb="0">
        <Helmet title="Home" />
        <div className="wrapper">
          {offerStrip && (
            <OfferRibbon
              title={offerStrip.description}
              showRibbon={showRibbon}
              onClick={this.handleRibbon}
              url={offerStrip.url_key}
            />
          )}
          <Menu />
          <MainSlider data={banners} />
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
  offerStrip: {},
  recentlyviewed: [],
  middleBanner: {}
};

Home.propTypes = {
  homepageCategories: PropTypes.array,
  homepageProducts: PropTypes.array,
  banners: PropTypes.array,
  cities: PropTypes.array,
  offerStrip: PropTypes.object,
  recentlyviewed: PropTypes.array,
  middleBanner: PropTypes.object
};
