import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LazyLoad from 'react-lazyload';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import cookie from 'js-cookie';
import { getCities, getOfferStripData, getMiddleBannerData } from 'selectors/homepage';
import Select from 'react-select';

/* ====== Components ====== */
import Body from 'hometown-components-dev/lib/BodyHtV1';
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Button from 'hometown-components-dev/lib/ButtonHtV1';
import Card from 'hometown-components-dev/lib/CardHtV1';
import Container from 'hometown-components-dev/lib/ContainerHtV1';
import Col from 'hometown-components-dev/lib/ColHtV1';
import Heading from 'hometown-components-dev/lib/HeadingHtV1';
import Image from 'hometown-components-dev/lib/ImageHtV1';
import Row from 'hometown-components-dev/lib/RowHtV1';
import Section from 'hometown-components-dev/lib/SectionHtV1';
import Text from 'hometown-components-dev/lib/TextHtV1';
import Wrapper from 'hometown-components-dev/lib/WrapperHtV1';

/* ====== Page Components ====== */
import CategoryCarousel from 'components/CategoryCarousel';
import OfferBanner from 'components/Home/OfferBanner';
import Carousel from 'components/Carousel';
import Footer from 'components/Footer';
import Header from 'components/Header';
import GridView from 'components/Home/GridView';
import MainSlider from 'components/MainSlider';
import Title from 'components/Title';
import Usp from 'components/Home/Usp';

const sliderImage = require('../../static/slider.png');
const bannerImage = require('../../static/banner.png');
const designBuildLogo = require('../../static/designBuildLogo.png');

// const OFFER_ID = 5;

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
 categories, banners, products, hashtags, offers, recentlyviewed, instafeeds
},
    stores,
    userLogin
  }) => ({
    instafeeds: instafeeds.data,
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
    openSignup: false,
    selectedCity: '',
    citySelectError: false,
    cityErrorMessage: 'Please select your nearest city'
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
  mapHandler = e => {
    e.preventDefault();
    const { selectedCity } = this.state;
    if (selectedCity) {
      this.props.history.push({
        pathname: '/store-locator',
        state: { city: selectedCity }
      });
    } else {
      this.setState({
        citySelectError: true
      });
    }
  };
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
    const {
 instafeeds, banners, middleBanner, homepageCategories, cities
} = this.props;
    const citiesList = cities.map(item => ({ value: item, label: item }));
    const { citySelectError, cityErrorMessage } = this.state;
    return (
      /* eslint-disable max-len */
      <Wrapper>
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
        <Body>
          {/* Header */}
          <Header />

          {/* Main Slider */}
          <MainSlider data={banners} />

          {/* USPs */}
          <Usp />

          {/* Category Carousel */}
          {homepageCategories.map((category, index) => {
            if (category.view && category.view === 'list') {
              return (
                <Section>
                  <Container>
                    <GridView data={category.values || []} />
                  </Container>
                </Section>
              );
            }
            return (
              <Section variant="section.primary" key={String(index)}>
                <Container>
                  <LazyLoad height={200} offset={100}>
                    <CategoryCarousel
                      categoryName={category.title}
                      subTitle={category.sub_title}
                      data={category.values}
                    />
                  </LazyLoad>
                </Container>
              </Section>
            );
          })}

          {/* Offer Banner */}
          <LazyLoad>
            <OfferBanner image={middleBanner.image_url} url={middleBanner.url_key} target={middleBanner.target || ''} />
          </LazyLoad>

          {/* LET US DESIGN FOR YOU */}
          <Section>
            <Container>
              <Row justifyContent="center">
                <Title title="LET US DESIGN FOR YOU" />
              </Row>
              <Row>
                <Col variant="colBasis" flexDirection="column">
                  <a href="https://beta.hometown.in/design-build/" target="_blank0">
                    <Box mb={20} sx={{ position: 'relative' }}>
                      <Image src={sliderImage} />
                      <Image src={designBuildLogo} variant="image.logoHomeTown" />
                    </Box>
                    <Heading variant="heading.regular" textAlign="center">
                      Design and Build
                    </Heading>
                  </a>
                </Col>
                <Col variant="colBasis" flexDirection="column">
                  <a href="https://beta.hometown.in/modular-kitchens/" target="_blank1">
                    <Box mb={20} sx={{ position: 'relative' }}>
                      <Image src={bannerImage} />
                      <Image
                        src="https://www.hometown.in/design-build/static/mkLogo.ae5caa06.png"
                        variant="image.logoHomeTown"
                      />
                    </Box>
                    <Heading variant="heading.regular" textAlign="center">
                      Modular Kitchen
                    </Heading>
                  </a>
                </Col>
              </Row>
            </Container>
          </Section>

          {/* Store Locator */}
          <Section>
            <Container>
              <Card
                sx={{
                  backgroundImage: 'url(https://static.hometown.in/media/cms/hometownnew/compressed/furniture.jpg)',
                  backgroundSize: 'cover',
                  position: 'relative'
                }}
              >
                <Box
                  height="100%"
                  width={1}
                  bg="rgba(0,0,0,0.5)"
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0
                  }}
                />
                <Row height={380} variant="row.contentCenter" sx={{ position: 'relative' }} flexDirection="column">
                  <Box textAlign="center" mb={30}>
                    <Heading variant="heading.large" color="white" mb={10}>
                      FIND A STORE NEAR YOU
                    </Heading>
                    <Text variant="regular" color={citySelectError ? 'red' : 'white'}>
                      {citySelectError ? cityErrorMessage : ''}
                    </Text>
                  </Box>
                  <Row>
                    <Select
                      placeholder="Select City"
                      defaultValue={null}
                      options={citiesList}
                      styles={customDropdownStyles}
                      onChange={({ value }) => {
                        this.setState({
                          selectedCity: value,
                          citySelectError: false
                        });
                      }}
                    />
                    <Button onClick={this.mapHandler} width={275} ml={30} variant="primary.large">
                      LOCATE A STORE
                    </Button>
                  </Row>
                </Row>
              </Card>
            </Container>
          </Section>

          {/* Share and Inspire */}
          {instafeeds && !!instafeeds.length && (
            <Section variant="section.primary">
              <Container>
                <LazyLoad height={200} offset={100}>
                  <Carousel title="SHARE AND INSPIRE" data={instafeeds} />
                </LazyLoad>
                <Row justifyContent="center" mt={40}>
                  <Button
                    type="button"
                    height={56}
                    px={40}
                    fontSize={20}
                    sx={{
                      textTransform: 'inherit'
                    }}
                  >
                    <a
                      style={{ color: '#fff' }}
                      target="_blank"
                      href="https://www.instagram.com/hometownindia/"
                      rel="noreferrer noopener"
                    >
                      @HomeTownIndia
                    </a>
                  </Button>
                </Row>
              </Container>
            </Section>
          )}

          {/* Footer */}
          <Footer />
        </Body>
      </Wrapper>
    );
  }
}

Home.defaultProps = {
  isLoggedIn: false,
  banners: [],
  instafeeds: [],
  homepageCategories: [],
  cities: [],
  middleBanner: {}
};

Home.propTypes = {
  isLoggedIn: PropTypes.bool,
  banners: PropTypes.array,
  instafeeds: PropTypes.array,
  homepageCategories: PropTypes.array,
  cities: PropTypes.array,
  history: PropTypes.object.isRequired,
  middleBanner: PropTypes.object
};
