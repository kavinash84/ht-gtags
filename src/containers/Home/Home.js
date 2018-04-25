import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Menu from 'components/Menu';
import MainSlider from 'components/MainSlider';
import CategorySlider from 'components/CategorySlider';
import { connect } from 'react-redux';
import ProductSlider from 'components/ProductSlider';

@connect(state => ({
  shopByOccasion: state.shopByOccasion.data,
  shopByStyle: state.shopByStyle.data,
  shopByRoom: state.shopByRoom.data,
  banners: state.banners.data
}))
export default class Home extends Component {
  render() {
    const {
      shopByOccasion, shopByRoom, shopByStyle, banners
    } = this.props;
    const styles = require('./Home.scss');

    return (
      <div className={styles.home}>
        <Helmet title="Home" />
        <div className="wrapper">
          <Menu />
          <MainSlider data={banners} />
          <CategorySlider categoryName="Shop by Occasion" data={shopByOccasion} />
          <CategorySlider categoryName="Shop by Room" data={shopByRoom} />
          <CategorySlider categoryName="Shop by Style" data={shopByStyle} />
          <ProductSlider productSliderTitle="Recommended for you" />
          <ProductSlider productSliderTitle="Top Selling Products" />
          <ProductSlider productSliderTitle="Recently Viewed Products" />
        </div>
      </div>
    );
  }
}

Home.defaultProps = {
  shopByRoom: [],
  shopByStyle: [],
  shopByOccasion: [],
  banners: []
};

Home.propTypes = {
  shopByRoom: PropTypes.array,
  shopByStyle: PropTypes.array,
  shopByOccasion: PropTypes.array,
  banners: PropTypes.array
};
