import React, { Component } from 'react';
import Helmet from 'react-helmet';
import Menu from 'components/Menu';
import MainSlider from 'components/HomeSlider';
import CategorySlider from 'components/CategorySlider';

import RecommendedForYou from 'components/RecommendedForYou';
import TopSellingProducts from 'components/TopSellingProducts';
import RecentlyViewedProducts from 'components/RecentlyViewedProducts';

export default class Home extends Component {
  render() {
    const styles = require('./Home.scss');

    return (
      <div className={styles.home}>
        <Helmet title="Home" />
        <div className="wrapper">
          <Menu />
          <MainSlider />
          <CategorySlider categoryName="Shop by Occasion" />
          <CategorySlider categoryName="Shop by Room" />
          <CategorySlider categoryName="Shop by Style" />
          <RecommendedForYou />
          <TopSellingProducts />
          <RecentlyViewedProducts />
        </div>
      </div>
    );
  }
}
