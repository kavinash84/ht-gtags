import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LazyLoad from 'react-lazyload';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import cookie from 'js-cookie';
import { getCities, getOfferStripData, getMiddleBannerData } from 'selectors/homepage';
import Select from 'react-select';

/* ====== Components ====== */
import AbsoluteHtV1 from 'hometown-components/lib/AbsoluteHtV1';
import BodyHtV1 from 'hometown-components/lib/BodyHtV1';
import BoxHtV1 from 'hometown-components/lib/BoxHtV1';
import ButtonHtV1 from 'hometown-components/lib/ButtonHtV1';
import CardHtV1 from 'hometown-components/lib/CardHtV1';
import ContainerHtV1 from 'hometown-components/lib/ContainerHtV1';
import ColHtV1 from 'hometown-components/lib/ColHtV1';
import HeadingHtV1 from 'hometown-components/lib/HeadingHtV1';
import ImageHtV1 from 'hometown-components/lib/ImageHtV1';
import RowHtV1 from 'hometown-components/lib/RowHtV1';
import SectionHtV1 from 'hometown-components/lib/SectionHtV1';
import TextHtV1 from 'hometown-components/lib/TextHtV1';
import WrapperHtV1 from 'hometown-components/lib/WrapperHtV1';

/* ====== Page Components ====== */
import CategoryCarousel from 'newComponents/CategoryCarousel';
import Header from 'newComponents/Header';
import MainSlider from 'newComponents/MainSlider';
import GridView from 'newComponents/Home/GridView';
import Usp from 'newComponents/Home/Usp';

const banner = 'https://www.hometown.in/media/cms/hometownnew/banner/hotdeals-midbanner_1.jpg';
const sliderImage = require('../../static/slider.png');
const bannerImage = require('../../static/banner.png');
const designBuildLogo = require('../../static/designBuildLogo.png');

const OFFER_ID = 5;

const storeLocatorOptions = [
  { value: 'Mumbai', label: 'Mumbai' },
  { value: 'Ahmedabad', label: 'Ahmedabad' },
  { value: 'Vadodara', label: 'Vadodara' }
];

const customDropdownStyles = {
  container: provided => ({
    ...provided,
    width: 275
  }),
  control: provided => ({
    ...provided,
    height: 48,
    borderRadius: 0,
    border: 'none',
    backgroundColor: 'rgba(255,255,255, 0.8)'
  }),
  placeholder: provided => ({
    ...provided,
    color: '#4a4949'
  }),
  indicatorsContainer: provided => ({
    ...provided,
    path: {
      fill: '#4a4949'
    }
  })
};

@connect(({
  homepage: {
    categories, banners, products, hashtags, offers, recentlyviewed
  }, stores, userLogin
}) => ({
  banners: banners.data,
  homepageCategories: categories.data,
  homepageProducts: products.data,
  cities: getCities(stores),
  hashtags: hashtags.data,
  offerStrip: getOfferStripData(offers),
  middleBanner: getMiddleBannerData(offers),
  recentlyviewed: recentlyviewed.data,
  isLoggedIn: userLogin.isLoggedIn
}))
export default class Home extends Component {
  state = {
    showRibbon: true,
    openSignup: false
  };
  componentDidMount() {
    const { isLoggedIn } = this.props;
    if (!isLoggedIn && !(cookie.get('PROMO_SIGNUP') === 'AVOID')) {
      this.signupmodalreference = setTimeout(() => this.handleModal(), 45000);
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.isLoggedIn && nextProps.isLoggedIn !== this.props.isLoggedIn) {
      this.setState({
        openSignup: !this.state.openSignup
      });
    }
  }
  componentWillUnmount() {
    if (this.signupmodalreference) {
      clearTimeout(this.signupmodalreference);
    }
  }
  handleModal = () => {
    this.setState({ openSignup: !this.state.openSignup }, () => {
      if (!this.state.openSignup) {
        cookie.set('PROMO_SIGNUP', 'AVOID', { expires: 2 });
      }
    });
  };
  handleRibbon = () => {
    this.setState({
      showRibbon: !this.state.showRibbon
    });
  };

  render() {
    const { banners, homepageCategories } = this.props;

    return (
      /* eslint-disable max-len */
      <WrapperHtV1>
        <Helmet title="Online Furniture Shopping, Buy Decor Items in India - HomeTown.in">
          <meta
            name="description"
            content="HomeTown - Shop online for Furniture, Home Decor, Furnishings, Kitchenware, Dining Products at best prices from HomeTown.in. Get best furniture and home decor products ☆Upto 40% Off, ☆Fast Shipping, ☆High Quality, ☆Premium, ☆Luxury furniture to beautify your ☆bedroom, ☆kitchen, ☆dining room, ☆living and ☆outdoor space ☆Original ☆0% EMI ☆Free Assembly ☆Safe Shipping."
          />
          <meta name="keywords" content="furniture, home-decor" />
          <meta name="robots" content="index, follow" />
          <script type="application/ld+json">
            {`
              {
                "@context": "http://schema.org",
                "@type": "WebSite",
                "url": "https://www.hometown.in/",
                "potentialAction": {
                  "@type": "SearchAction",
                  "target": "https://www.hometown.in/search/?q={search_term_string}",
                  "query-input": "required name=search_term_string"
                }
              }
            `}
          </script>
        </Helmet>
        <BodyHtV1>
          {/* Header */}
          <Header />

          {/* Main Slider */}
          <MainSlider data={banners} />

          {/* USPs */}
          <Usp />

          {/* Grid View */}
          <SectionHtV1>
            <ContainerHtV1>
              <GridView />
            </ContainerHtV1>
          </SectionHtV1>

          {/* Category Carousel */}
          <SectionHtV1>
            <ContainerHtV1>
              {homepageCategories.map((category, index) => {
                const { id } = category;
                if (id && OFFER_ID !== id && OFFER_ID !== parseInt(id, 10)) {
                  return (
                    <LazyLoad height={200} offset={100} key={String(index)}>
                      <CategoryCarousel
                        categoryName={category.title}
                        subTitle={category.sub_title}
                        data={category.values}
                      />
                    </LazyLoad>
                  );
                }
                return '';
              })}
            </ContainerHtV1>
          </SectionHtV1>

          {/* Offer Banner */}
          <SectionHtV1>
            <ContainerHtV1>
              <RowHtV1>
                <ColHtV1>
                  <ImageHtV1 src={banner} variant="image" />
                </ColHtV1>
              </RowHtV1>
            </ContainerHtV1>
          </SectionHtV1>

          {/* LET US DESIGN FOR YOU */}
          <SectionHtV1>
            <ContainerHtV1>
              <RowHtV1 mb={24}>
                <ColHtV1 justifyContent="center">
                  <TextHtV1 variant="text.catSliderTitle">LET US DESIGN FOR YOU</TextHtV1>
                </ColHtV1>
              </RowHtV1>
              <RowHtV1>
                <ColHtV1 flexDirection="column">
                  <BoxHtV1 position="relative" mb={20}>
                    <ImageHtV1 src={sliderImage} />
                    <ImageHtV1 src={designBuildLogo} variant="image.logoHomeTown" />
                  </BoxHtV1>
                  <HeadingHtV1 variant="heading" textAlign="center">
                    Design and Build
                  </HeadingHtV1>
                </ColHtV1>
                <ColHtV1 flexDirection="column">
                  <BoxHtV1 position="relative" mb={20}>
                    <ImageHtV1 src={bannerImage} />
                    <ImageHtV1
                      src="https://www.hometown.in/design-build/static/mkLogo.ae5caa06.png"
                      variant="image.logoHomeTown"
                    />
                  </BoxHtV1>
                  <HeadingHtV1 variant="heading" textAlign="center">
                    Modular Kitchen
                  </HeadingHtV1>
                </ColHtV1>
              </RowHtV1>
            </ContainerHtV1>
          </SectionHtV1>

          {/* Store Locator */}
          <SectionHtV1>
            <ContainerHtV1>
              <CardHtV1
                sx={{
                  backgroundImage: 'url(https://static.hometown.in/media/cms/hometownnew/compressed/furniture.jpg)',
                  backgroundSize: 'cover',
                  position: 'relative'
                }}
              >
                <AbsoluteHtV1 height="100%" width={1} bg="rgba(0,0,0,0.5)" top={0} left={0} right={0} bottom={0} />
                <RowHtV1 height={380} variant="row.contentCenter" sx={{ position: 'relative' }} flexDirection="column">
                  <BoxHtV1 textAlign="center" mb={30}>
                    <HeadingHtV1 variant="largeHeading" color="white" mb={10}>
                      FIND A STORE NEAR YOU
                    </HeadingHtV1>
                    <TextHtV1 variant="regular" color="white">
                      lorem ipsum doler sit lorem ipsum doler sit
                    </TextHtV1>
                  </BoxHtV1>
                  <RowHtV1>
                    <Select
                      placeholder="Select your city"
                      defaultValue={null}
                      options={storeLocatorOptions}
                      styles={customDropdownStyles}
                    />
                    <ButtonHtV1 width={275} ml={30} variant="primary.large">
                      LOCATE A STORE
                    </ButtonHtV1>
                  </RowHtV1>
                </RowHtV1>
              </CardHtV1>
            </ContainerHtV1>
          </SectionHtV1>
        </BodyHtV1>
      </WrapperHtV1>
    );
  }
}

Home.defaultProps = {
  isLoggedIn: false,
  banners: [],
  homepageCategories: []
};

Home.propTypes = {
  isLoggedIn: PropTypes.bool,
  banners: PropTypes.array,
  homepageCategories: PropTypes.array
};
