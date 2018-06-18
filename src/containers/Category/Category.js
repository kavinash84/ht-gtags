import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { provideHooks } from 'redial';
import { wrapDispatch } from 'multireducer';
import Menu from 'containers/MenuNew/index';
import MainSlider from 'components/MainSlider';
import Carousel from 'components/Category/Carousel';
import GridLayout from 'components/Category/GridLayout';
import CategoryFilters from 'components/Category/CategoryFilters';
import ProductCarousel from 'components/ProductCarousel';
import Section from 'hometown-components/lib/Section';
import Div from 'hometown-components/lib/Div';
import Row from 'hometown-components/lib/Row';
import Title from 'components/Title';
import Container from 'hometown-components/lib/Container';
import { connect } from 'react-redux';
import { loadTopSelling, isLoaded as isSectionLoaded } from 'redux/modules/homepage';
import { loadStores, isLoaded as isStoresLoaded } from 'redux/modules/stores';
import Footer from 'components/Footer';
import { getCities } from '../../selectors/homepage';

@connect(({ homepage: { categories, banners, products }, stores }) => ({
  banners: banners.data,
  homepageCategories: categories.data,
  homepageProducts: products.data,
  cities: getCities(stores)
}))
@provideHooks({
  defer: ({ store: { dispatch, getState } }) => {
    if (!isSectionLoaded(getState(), 'products')) {
      wrapDispatch(dispatch, 'products')(loadTopSelling()).catch(error => console.log(error));
    }
    if (!isStoresLoaded(getState())) {
      dispatch(loadStores()).catch(error => console.log(error));
    }
  }
})
export default class Category extends Component {
  render() {
    const { homepageCategories, homepageProducts, banners } = this.props;
    return (
      <Section p="0" mb="0">
        <Helmet title="Home" />
        <div className="wrapper">
          <Menu />
          <MainSlider data={banners} />
          <Container pr="0" pl="0">
            <Row display="block" pt="0.625rem" ml="0" mr="0">
              <Div col={3}>
                <Title title="Filters" subTitle="" />
                <CategoryFilters data="" />
              </Div>
              <Div col={9}>
                <Carousel
                  categoryName={homepageCategories[1].title}
                  data={homepageCategories[1].values}
                  layout="square"
                />
                <Carousel
                  categoryName={homepageCategories[1].title}
                  data={homepageCategories[1].values}
                  layout="round"
                />
                <GridLayout
                  categoryName={homepageCategories[1].title}
                  data={homepageCategories[1].values}
                  layout="square"
                  layoutStyle="grid"
                  col={3}
                />
                <GridLayout
                  categoryName={homepageCategories[1].title}
                  data={homepageCategories[1].values}
                  layout="round"
                  layoutStyle="grid"
                  col={3}
                />
                {homepageProducts.map((products, index) => (
                  <ProductCarousel key={String(index)} title={products.title} data={products.values} />
                ))}
              </Div>
            </Row>
          </Container>
        </div>
        <Footer />
      </Section>
    );
  }
}

Category.defaultProps = {
  homepageCategories: [],
  homepageProducts: [],
  banners: []
};

Category.propTypes = {
  homepageCategories: PropTypes.array,
  homepageProducts: PropTypes.array,
  banners: PropTypes.array
};
