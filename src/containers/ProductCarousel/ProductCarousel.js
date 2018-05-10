import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ProductCarousel from 'components/ProductCarousel';

@connect(state => ({
  shopByOccasion: state.shopByOccasion.data,
  banners: state.banners.data
}))
export default class Home extends Component {
  render() {
    const { shopByOccasion } = this.props;

    return <ProductCarousel categoryName="Shop by Occasion" data={shopByOccasion} />;
  }
}

Home.defaultProps = {
  shopByOccasion: []
};

Home.propTypes = {
  shopByOccasion: PropTypes.array
};
