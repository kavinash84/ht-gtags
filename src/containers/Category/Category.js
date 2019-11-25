import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
// import Menu from 'containers/MenuNew/index';
import Header from 'newComponents/Header';
import MainSlider from 'newComponents/MainSlider';
// import CategoryFilters from 'components/Category/CategoryFilters';
import SectionHtV1 from 'hometown-components/lib/SectionHtV1';
import BoxHtV1 from 'hometown-components/lib/BoxHtV1';
import RowHtV1 from 'hometown-components/lib/RowHtV1';
// import Title from 'components/Title';
import ContainerHtV1 from 'hometown-components/lib/ContainerHtV1';
import { connect } from 'react-redux';
// import Footer from 'components/Footer';
// import SeoContent from 'components/SeoContent';
import CommonLayout from 'newComponents/Category/CommonLayout';

// const getSubMenu = (categories, key) =>
//   categories && categories.filter(category => category.url_key === key)[0].children;

@connect(({ homepage: { banners }, category: { data } }) => ({
  // menu: menu.data,
  banners: banners.data,
  category: data && data.items && data.items.text,
  seoInfo: data && data.seo && data.seo.items
}))
export default class Category extends Component {
  render() {
    const {
      category,
      seoInfo,
      banners,
      match: {
        params: { category: currentCategory }
      }
    } = this.props;

    /* eslint-disable react/no-danger */
    return (
      <SectionHtV1>
        <Helmet title={`${(seoInfo && seoInfo.page_title) || (currentCategory && currentCategory.toUpperCase())}`}>
          <meta name="keywords" content={seoInfo && seoInfo.meta_keywords} />
          <meta name="description" content={seoInfo && seoInfo.meta_description} />
        </Helmet>
        <BoxHtV1>
          <Header />
          {banners && <MainSlider data={banners} />}
          <ContainerHtV1 pr="0" pl="0">
            <RowHtV1 display="block" pt="2.25rem" ml="0" mr="0">
              {/* <BoxHtV1 col={2}> */}
              {/* <Title title="Categories" subTitle="" ta="left" titleColor="#424242" /> */}
              {/* <CategoryFilters data={getSubMenu(menu, currentCategory)} /> */}
              {/* </BoxHtV1> */}
              <BoxHtV1 pl="3rem">
                {category &&
                  category.HtV1s &&
                  category.sections.map((cat, index) => (
                    <BoxHtV1 key={String(index)}>{CommonLayout(cat.component, cat.title, cat.data, cat.grid)}</BoxHtV1>
                  ))}
              </BoxHtV1>
            </RowHtV1>
          </ContainerHtV1>
        </BoxHtV1>
        {/* {seoInfo &&
          seoInfo.seo_text && (
          <SeoContent>
            <BoxHtV1 dangerouslySetInnerHTML={{ __html: seoInfo.seo_text }} />
          </SeoContent>
        )} */}
        {/* <Footer /> */}
      </SectionHtV1>
    );
  }
}

Category.defaultProps = {
  category: [],
  banners: [],
  seoInfo: {
    seo_text: ''
  }
};

Category.propTypes = {
  category: PropTypes.array,
  banners: PropTypes.array,
  match: PropTypes.shape({
    params: PropTypes.object.isRequired
  }).isRequired,
  seoInfo: PropTypes.object
};
