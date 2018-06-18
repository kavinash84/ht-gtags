import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { provideHooks } from 'redial';
import { wrapDispatch } from 'multireducer';
import Menu from 'containers/MenuNew/index';
import MainSlider from 'components/MainSlider';
import Carousel from 'components/Category/Carousel';
import GridLayout from 'components/Category/GridLayout';
import Section from 'hometown-components/lib/Section';
import { connect } from 'react-redux';
import { loadTopSelling, isLoaded as isSectionLoaded } from 'redux/modules/homepage';
import { loadStores, isLoaded as isStoresLoaded } from 'redux/modules/stores';
import Footer from 'components/Footer';
import { getCities } from '../../selectors/homepage';

@connect(({ homepage: { categories, banners }, stores }) => ({
  banners: banners.data,
  homepageCategories: categories.data,
  cities: getCities(stores)
}))
@provideHooks({
  defer: ({ store: { dispatch, getState } }) => {
    if (!isSectionLoaded(getState(), 'products')) {
      wrapDispatch(dispatch, 'products')(loadTopSelling()).catch(error => console.log(error));
    }
    if (!isStoresLoaded(getState())) {
      dispatch(loadStores()).catch(error => console.log(error));
    }
  }
})
export default class Category extends Component {
  render() {
    const { homepageCategories, banners } = this.props;
    return (
      <Section p="0" mb="0">
        <Helmet title="Home" />
        <div className="wrapper">
          <Menu />
          <MainSlider data={banners} />
          <Carousel
            categoryName={homepageCategories[1].title}
            subTitle={homepageCategories[1].sub_title}
            data={homepageCategories[1].values}
            layout="square"
          />
          <Carousel
            categoryName={homepageCategories[1].title}
            subTitle={homepageCategories[1].sub_title}
            data={homepageCategories[1].values}
            layout="round"
          />
          <GridLayout
            categoryName={homepageCategories[1].title}
            subTitle={homepageCategories[1].sub_title}
            data={homepageCategories[1].values}
            layout="square"
            layoutStyle="grid"
            col={3}
          />
          <GridLayout
            categoryName={homepageCategories[1].title}
            subTitle={homepageCategories[1].sub_title}
            data={homepageCategories[1].values}
            layout="round"
            layoutStyle="grid"
            col={3}
          />
        </div>
        <Footer />
      </Section>
    );
  }
}

Category.defaultProps = {
  homepageCategories: [],
  banners: []
};

Category.propTypes = {
  homepageCategories: PropTypes.array,
  banners: PropTypes.array
};
