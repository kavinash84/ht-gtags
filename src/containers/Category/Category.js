import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

/* ====== Components ====== */
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Body from 'hometown-components-dev/lib/BodyHtV1';
import Container from 'hometown-components-dev/lib/ContainerHtV1';
import Col from 'hometown-components-dev/lib/ColHtV1';
import Heading from 'hometown-components-dev/lib/HeadingHtV1';
import Row from 'hometown-components-dev/lib/RowHtV1';
import Text from 'hometown-components-dev/lib/TextHtV1';
import Section from 'hometown-components-dev/lib/SectionHtV1';
import Wrapper from 'hometown-components-dev/lib/WrapperHtV1';

/* ====== Page Components ====== */
import CommonLayout from 'newComponents/Category/CommonLayout';
import Header from 'newComponents/Header';
import Footer from 'newComponents/Footer';
import MainSlider from 'newComponents/MainSlider';
import GridView from 'newComponents/Home/GridView';
// import CategoryFilters from 'components/Category/CategoryFilters';
// import Title from 'components/Title';
// import Footer from 'components/Footer';
// import SeoContent from 'components/SeoContent';

// const getSubMenu = (categories, key) =>
//   categories && categories.filter(category => category.url_key === key)[0].children;

@connect(({ homepage: { menu }, category: { data } }) => ({
  menu: menu.data,
  category: data && data.items && data.items.text,
  seoInfo: data && data.seo && data.seo.items
}))
export default class Category extends Component {
  render() {
    const {
      category,
      seoInfo,
      // menu,
      match: {
        params: { category: currentCategory }
      }
    } = this.props;

    /* eslint-disable react/no-danger */
    return (
      <Wrapper>
        <Helmet title={`${(seoInfo && seoInfo.page_title) || (currentCategory && currentCategory.toUpperCase())}`}>
          <meta name="keywords" content={seoInfo && seoInfo.meta_keywords} />
          <meta name="description" content={seoInfo && seoInfo.meta_description} />
        </Helmet>
        <Body>
          {/* Header */}
          <Header />

          {/* Offer Bar */}
          <Box bg="heading" pt={30} pb={20}>
            <Container>
              <Row justifyContent="center">
                <Col
                  variant="col-4"
                  textAlign="center"
                  sx={{
                    borderRight: 'whiteMedium'
                  }}
                >
                  <Text variant="textLight" color="white">
                    Limited time offer
                  </Text>
                  <Heading variant="heading.medium" color="white" py={6}>
                    Up to 35% off
                  </Heading>
                  <Heading fontSize={16} color="white">
                    Coupon Code: SUPER35
                  </Heading>
                </Col>
                <Col variant="col-4" textAlign="center">
                  <Text variant="textLight" color="white">
                    Limited time offer
                  </Text>
                  <Heading variant="heading.medium" color="white" py={6}>
                    Up to 35% off
                  </Heading>
                  <Heading fontSize={16} color="white">
                    Coupon Code: SUPER35
                  </Heading>
                </Col>
              </Row>
            </Container>
          </Box>

          {/* Main Slider */}
          {category && <MainSlider data={category.main} />}

          {/* Grid View */}
          <Section>
            <Container>
              <GridView />
            </Container>
          </Section>

          {/* Category Carousel */}
          {category &&
            category.sections &&
            category.sections.map((cat, index) => (
              <Section key={String(index)}>
                <Container>{CommonLayout(cat.component, cat.title, cat.data, cat.grid)}</Container>
              </Section>
            ))}

          {/* Footer */}
          <Footer />
        </Body>
      </Wrapper>
    );
  }
}

Category.defaultProps = {
  category: [],
  // menu: [],
  seoInfo: {
    seo_text: ''
  }
};

Category.propTypes = {
  category: PropTypes.array,
  // menu: PropTypes.array,
  match: PropTypes.shape({
    params: PropTypes.object.isRequired
  }).isRequired,
  seoInfo: PropTypes.object
};
