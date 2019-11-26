import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

/* ====== Components ====== */
// import BoxHtV1 from 'hometown-components/lib/BoxHtV1';
import BodyHtV1 from 'hometown-components/lib/BodyHtV1';
import ContainerHtV1 from 'hometown-components/lib/ContainerHtV1';
// import RowHtV1 from 'hometown-components/lib/RowHtV1';
import SectionHtV1 from 'hometown-components/lib/SectionHtV1';
import WrapperHtV1 from 'hometown-components/lib/WrapperHtV1';

/* ====== Page Components ====== */
// import Menu from 'containers/MenuNew/index';
import CommonLayout from 'newComponents/Category/CommonLayout';
import Header from 'newComponents/Header';
import MainSlider from 'newComponents/MainSlider';
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
      <WrapperHtV1>
        <Helmet title={`${(seoInfo && seoInfo.page_title) || (currentCategory && currentCategory.toUpperCase())}`}>
          <meta name="keywords" content={seoInfo && seoInfo.meta_keywords} />
          <meta name="description" content={seoInfo && seoInfo.meta_description} />
        </Helmet>
        <BodyHtV1>
          {/* Header */}
          <Header />

          {/* Main Slider */}
          {category && <MainSlider data={category.main} />}

          {/* Category Carousel */}
          {category &&
            category.sections &&
            category.sections.map((cat, index) => (
              <SectionHtV1 key={String(index)}>
                <ContainerHtV1>{CommonLayout(cat.component, cat.title, cat.data, cat.grid)}</ContainerHtV1>
              </SectionHtV1>
            ))}
        </BodyHtV1>
      </WrapperHtV1>
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
