import React, { Component } from 'react';

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

export default class BestOfferBanners extends Component {
  render() {
    const banners = getBanners(this.props);
    return <div>{banners.length ? <MainSlider data={banners} /> : null}</div>;
  }
}
