import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
// import Menu from 'containers/MenuNew/index';
import Menu from 'containers/MenuNew/index';
import MainSlider from 'components/MainSlider';
import CategoryCarousel from 'components/CategoryCarousel';
import ProductCarousel from 'components/ProductCarousel';
import Section from 'hometown-components/lib/Section';
import { connect } from 'react-redux';
import HashTags from 'components/Home/HashTags';
import Stores from 'components/Home/Stores';
import Footer from 'components/Footer';

const prodSliderItem = require('../../data/RecentlyViewedProducts.js');
const storesItems = require('../../data/stores.js');

@connect(({ homepage }) => ({
  homepageCategories: homepage.categories.data,
  banners: homepage.banners.data
}))
export default class Home extends Component {
  render() {
    const { homepageCategories, banners } = this.props;

    return (
      <Section p="0" mb="0">
        <Helmet title="Home" />
        <div className="wrapper">
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
          <HashTags />
          <ProductCarousel data={prodSliderItem} title="Recommended for you" />
          <Stores
            categoryName="Visit Our Stores"
            subTitle="Explore all products in a store near you, explore them here, there, anywhere"
            data={storesItems}
          />
        </div>
        <Footer />
      </Section>
    );
  }
}

Home.defaultProps = {
  homepageCategories: [],
  banners: []
};

Home.propTypes = {
  homepageCategories: PropTypes.array,
  banners: PropTypes.array
};
