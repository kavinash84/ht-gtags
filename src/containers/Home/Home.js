import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
// import Menu from 'components/Menu';
import Menu from 'containers/MenuNew/index';
import MainSlider from 'components/MainSlider';
import Section from 'hometown-components/lib/Section';
import { connect } from 'react-redux';
import ProductSlider from 'components/ProductSlider';
import ProductCarousel from 'components/ProductCarousel';
import HashTags from 'components/Home/HashTags';

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

    return (
      <Section p="0" pb="1.5rem">
        <Helmet title="Home" />
        <div className="wrapper">
          <Menu />
          <MainSlider data={banners} />
          <ProductCarousel
            categoryName="Popular Categories"
            subTitle="Products curated from the user-product engangement"
            data={shopByOccasion}
            colSize="25"
          />
          <ProductCarousel
            categoryName="Shop by Room"
            subTitle="Products curated for every need of a room in your home"
            data={shopByRoom}
            colSize="25"
          />
          <ProductCarousel
            categoryName="Shop by Style"
            subTitle="Products curated by style because your taste represents who you are"
            data={shopByStyle}
            colSize="25"
          />
          <ProductCarousel
            categoryName="Shop by Occasion"
            subTitle="Our designers have carefully curated products for you for occasions of joy"
            data={shopByStyle}
            colSize="25"
          />
          <ProductCarousel
            categoryName="Exclusive Services by HomeTown"
            subTitle="We are not just limited to products, but we also provide amazing services"
            data={shopByStyle}
            colSize="33.33"
          />
          <HashTags />
          <ProductSlider productSliderTitle="Recommended for you" colSize={20} />
          <ProductSlider productSliderTitle="Top Selling Products" colSize={20} />
          <ProductSlider productSliderTitle="Recently Viewed Products" colSize={20} />
        </div>
      </Section>
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
