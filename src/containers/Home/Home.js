import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { provideHooks } from 'redial';
import { wrapDispatch } from 'multireducer';
import Menu from 'containers/MenuNew/index';
import MainSlider from 'components/MainSlider';
import CategoryCarousel from 'components/CategoryCarousel';
import ProductCarousel from 'components/ProductCarousel';
import Section from 'hometown-components/lib/Section';
import { connect } from 'react-redux';
import HashTags from 'components/Home/HashTags';
import StoresCarousel from 'components/StoresCarousel';
import { loadTopSelling, isLoaded as isTopSellingLoaded } from 'redux/modules/homepage';
import { loadStores, isLoaded as isStoresLoaded } from 'redux/modules/stores';
import Footer from 'components/Footer';
import { getCities } from '../../selectors/homepage';

const prodSliderItem = require('../../data/RecentlyViewedProducts.js');

@connect(({ homepage: { categories, banners }, stores }) => ({
  homepageCategories: categories.data,
  banners: banners.data,
  cities: getCities(stores)
}))
@provideHooks({
  defer: ({ store: { dispatch, getState } }) => {
    if (!isTopSellingLoaded(getState(), 'topSelling')) {
      wrapDispatch(dispatch, 'topSelling')(loadTopSelling()).catch(error => console.log(error));
    }
    if (!isStoresLoaded(getState())) {
      dispatch(loadStores()).catch(error => console.log(error));
    }
  }
})
export default class Home extends Component {
  render() {
    const { homepageCategories, banners, cities } = this.props;
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
          <StoresCarousel cities={cities} />
        </div>
        <Footer />
      </Section>
    );
  }
}

Home.defaultProps = {
  homepageCategories: [],
  banners: [],
  cities: []
};

Home.propTypes = {
  homepageCategories: PropTypes.array,
  banners: PropTypes.array,
  cities: PropTypes.array
};
