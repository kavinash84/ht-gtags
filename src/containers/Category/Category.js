import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { provideHooks } from 'redial';
import Menu from 'containers/MenuNew/index';
import MainSlider from 'components/MainSlider';
import CategoryFilters from 'components/Category/CategoryFilters';
import Section from 'hometown-components/lib/Section';
import Div from 'hometown-components/lib/Div';
import Row from 'hometown-components/lib/Row';
import Title from 'components/Title';
import Container from 'hometown-components/lib/Container';
import { connect } from 'react-redux';
import { loadCategory, setCategory, isLoaded } from 'redux/modules/category';
import Footer from 'components/Footer';
import CommonLayout from 'components/Category/CommonLayout';

const getSubMenu = (categories, id) => categories.filter(category => Number(category.id) === id)[0].children;

@provideHooks({
  fetch: async ({ store: { dispatch, getState }, params }) => {
    const { category } = params;
    if (!isLoaded(getState(), category)) {
      await dispatch(loadCategory(category)).catch(error => console.log(error));
    }
    await dispatch(setCategory(category));
  }
})
@connect(({ homepage: { menu, banners }, category }) => ({
  banners: banners.data,
  menu: menu.data,
  category: category.data && category.data.items.text
}))
export default class Category extends Component {
  render() {
    const { category, menu, banners } = this.props;
    return (
      <Section p="0" mb="0">
        <Helmet title="Home" />
        <div className="wrapper">
          <Menu />
          <MainSlider data={banners} />
          <Container pr="0" pl="0">
            <Row display="block" pt="2.25rem" ml="0" mr="0">
              <Div col={2}>
                <Title title="Filters" subTitle="" ta="left" />
                <CategoryFilters data={getSubMenu(menu, 131)} />
              </Div>
              <Div col={10} pl="2rem">
                {category.sections &&
                  category.sections.map((cat, index) => (
                    <div key={String(index)}>{CommonLayout(cat.component, cat.title, cat.data, cat.grid)}</div>
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
  category: [],
  menu: [],
  banners: []
};

Category.propTypes = {
  category: PropTypes.array,
  menu: PropTypes.array,
  banners: PropTypes.array
};
