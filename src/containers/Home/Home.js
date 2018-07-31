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
import HashTags from 'components/Home/HashTags';
import StoresCarousel from 'components/Stores';
import Footer from 'components/Footer';
import SeoContent from 'components/SeoContent';
import { getCities } from '../../selectors/homepage';

@connect(({
  homepage: {
    categories, banners, products, hashtags, offerstrip
  }, stores
}) => ({
  banners: banners.data,
  homepageCategories: categories.data,
  homepageProducts: products.data,
  cities: getCities(stores),
  hashtags: hashtags.data,
  offerstrip: offerstrip.data && offerstrip.data.items
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
      homepageCategories, homepageProducts, banners, cities, hashtags, offerstrip
    } = this.props;
    const { showRibbon } = this.state;
    return (
      <Section p="0" mb="0">
        <Helmet title="Home" />
        <div className="wrapper">
          {offerstrip &&
            offerstrip.text && (
            <OfferRibbon
              title={offerstrip.text.description}
              showRibbon={showRibbon}
              onClick={this.handleRibbon}
              url={offerstrip.text.url_key}
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
          <HashTags data={hashtags} />
          {homepageProducts.map((products, index) => (
            <ProductCarousel
              key={String(index)}
              title={products.title}
              subTitle={products.sub_title}
              data={products.values}
            />
          ))}
          <StoresCarousel cities={cities} />
        </div>
        <SeoContent />
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
  hashtags: [],
  offerstrip: {}
};

Home.propTypes = {
  homepageCategories: PropTypes.array,
  homepageProducts: PropTypes.array,
  banners: PropTypes.array,
  cities: PropTypes.array,
  hashtags: PropTypes.array,
  offerstrip: PropTypes.object
};
