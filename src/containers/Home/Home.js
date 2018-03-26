import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import MainSlider from 'components/HomeSlider';
import ShopByOccasion from 'components/ShopByOccasion';
import ShopByRoom from 'components/ShopByRoom';
import ShopByStyle from 'components/ShopByStyle';
import RecommendedForYou from 'components/RecommendedForYou';
import TopSellingProducts from 'components/TopSellingProducts';
import RecentlyViewedProducts from 'components/RecentlyViewedProducts';

@connect(state => ({
  online: state.online
}))
export default class Home extends Component {
  render() {
    const styles = require('./Home.scss');

    return (
      <div className={styles.home}>
        <Helmet title="Home" />
        <div className="wrapper">
          <MainSlider />
          <ShopByOccasion />
          <ShopByRoom />
          <ShopByStyle />
          <RecommendedForYou />
          <TopSellingProducts />
          <RecentlyViewedProducts />
        </div>
      </div>
    );
  }
}
