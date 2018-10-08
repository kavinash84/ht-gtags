import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Menu from 'containers/MenuNew/index';
import MainSlider from 'components/MainSlider';
import CategoryFilters from 'components/Category/CategoryFilters';
import Section from 'hometown-components/lib/Section';
import Div from 'hometown-components/lib/Div';
import Row from 'hometown-components/lib/Row';
import Title from 'components/Title';
import Container from 'hometown-components/lib/Container';
import { connect } from 'react-redux';
import Footer from 'components/Footer';
import SeoContent from 'components/SeoContent';
import CommonLayout from 'components/Category/CommonLayout';

const getSubMenu = (categories, key) =>
  categories && categories.filter(category => category.url_key === key)[0].children;

@connect(({ homepage: { menu }, category: { data } }) => ({
  menu: menu.data,
  category: data && data.items.text,
  seoInfo: data && data.seo && data.seo.items
}))
export default class Category extends Component {
  render() {
    const {
      category, seoInfo, menu, match: { params: { category: currentCategory } }
    } = this.props;
    /* eslint-disable react/no-danger */
    return (
      <Section p="0" mb="0">
        <Helmet title={`${(seoInfo && seoInfo.page_title) || (currentCategory && currentCategory.toUpperCase())}`} />
        <div className="wrapper">
          <Menu />
          <MainSlider data={category.main} />
          <Container pr="0" pl="0">
            <Row display="block" pt="2.25rem" ml="0" mr="0">
              <Div col={2}>
                <Title title="Categories" subTitle="" ta="left" titleColor="#424242" />
                <CategoryFilters data={getSubMenu(menu, currentCategory)} />
              </Div>
              <Div col={10} pl="3rem">
                {category.sections &&
                  category.sections.map((cat, index) => (
                    <div key={String(index)}>{CommonLayout(cat.component, cat.title, cat.data, cat.grid)}</div>
                  ))}
              </Div>
            </Row>
          </Container>
        </div>
        {seoInfo &&
          seoInfo.seo_text && (
          <SeoContent>
            <div dangerouslySetInnerHTML={{ __html: seoInfo.seo_text }} />
          </SeoContent>
        )}
        <Footer />
      </Section>
    );
  }
}

Category.defaultProps = {
  category: [],
  menu: [],
  seoInfo: {
    seo_text: ''
  }
};

Category.propTypes = {
  category: PropTypes.array,
  menu: PropTypes.array,
  match: PropTypes.shape({
    params: PropTypes.object.isRequired
  }).isRequired,
  seoInfo: PropTypes.object
};
