import React, { Component } from 'react';
import PropTypes from 'prop-types';

import MainSlider from 'components/MainSlider';

const getBanners = ({
  bannerData: { bannerImageDetails, bannerImagePath },
  history: {
    location: { pathname }
  }
}) => {
  let banners = [];
  if (bannerImagePath && bannerImagePath.length) {
    const showBestOffers = bannerImagePath.some(arr => arr === pathname);
    if (showBestOffers) banners = bannerImageDetails[0][pathname].images;
  }
  return banners;
};

class BestOfferBanners extends Component {
  render() {
    const { onImageClick } = this.props;
    const banners = getBanners(this.props);
    return <div>{banners.length ? <MainSlider data={banners} onImageClick={onImageClick} /> : null}</div>;
  }
}

BestOfferBanners.propTypes = {
  onImageClick: PropTypes.func.isRequired
};

export default BestOfferBanners;
