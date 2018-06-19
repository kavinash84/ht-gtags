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
// import { wrapDispatch } from 'multireducer';
import { loadCategory, setCategory, isLoaded } from 'redux/modules/category';
import Footer from 'components/Footer';
import CommonLayout from 'components/Category/CommonLayout';

const getSubMenu = (categories, id) => categories.filter(category => Number(category.id) === id)[0].children;

@connect(({ homepage: { menu }, category }) => ({
  menu: menu.data,
  category: category.data && category.data.items.text
}))
@provideHooks({
  fetch: async ({ store: { dispatch, getState }, params }) => {
    console.log(params);
    if (!isLoaded(getState(), 131)) {
      await dispatch(loadCategory(131)).catch(error => console.log(error));
    }
    await setCategory(131);
  }
})
export default class Category extends Component {
  render() {
    const { category, menu } = this.props;
    return (
      <Section p="0" mb="0">
        <Helmet title="Home" />
        <div className="wrapper">
          <Menu />
          <MainSlider data={category.mainsection.data} />
          <Container pr="0" pl="0">
            <Row display="block" pt="2.25rem" ml="0" mr="0">
              <Div col={2}>
                <Title title="Filters" subTitle="" ta="left" />
                <CategoryFilters data={getSubMenu(menu, 131)} />
              </Div>
              <Div col={10}>
                {category.sections &&
                  category.sections.map((cat, index) => (
                    <div key={String(index)}>{CommonLayout(cat.component, cat.title, cat.data)}</div>
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
  menu: []
};

Category.propTypes = {
  category: PropTypes.array,
  menu: PropTypes.array
};
