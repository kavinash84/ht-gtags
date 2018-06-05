import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { provideHooks } from 'redial';
import { wrapDispatch } from 'multireducer';
import Menu from 'containers/MenuNew/index';
import MainSlider from 'components/MainSlider';
import CategoryCarousel from 'components/CategoryCarousel';
import Section from 'hometown-components/lib/Section';
import { connect } from 'react-redux';
import ProductSlider from 'components/ProductSlider';
import HashTags from 'components/Home/HashTags';
import Stores from 'components/Home/Stores';
import { loadTopSelling, loadStores, isLoaded as isSectionLoaded } from 'redux/modules/homepage';
import Footer from 'components/Footer';
import { getCities } from '../../selectors/homepage';

const storesItems = require('../../data/stores.js');

@connect(({ homepage: { categories, banners, stores } }) => ({
  homepageCategories: categories.data,
  banners: banners.data,
  stores: getCities(stores)
}))
@provideHooks({
  defer: ({ store: { dispatch, getState } }) => {
    if (!isSectionLoaded(getState(), 'topSelling')) {
      wrapDispatch(dispatch, 'topSelling')(loadTopSelling()).catch(error => console.log(error));
    }
    if (!isSectionLoaded(getState(), 'stores')) {
      wrapDispatch(dispatch, 'stores')(loadStores()).catch(error => console.log(error));
    }
  }
})
export default class Home extends Component {
  render() {
    const { homepageCategories, banners, stores } = this.props;
    console.log(stores);
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
          <ProductSlider productSliderTitle="Recommended for you" colSize={20} />
          <ProductSlider productSliderTitle="Top Selling Products" colSize={20} />
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
  banners: [],
  stores: []
};

Home.propTypes = {
  homepageCategories: PropTypes.array,
  banners: PropTypes.array,
  stores: PropTypes.array
};
