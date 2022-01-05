import React, { Component } from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { connect } from "react-redux";

/* ====== Components ====== */
import Box from "hometown-components-dev/lib/BoxHtV1";
import Body from "hometown-components-dev/lib/BodyHtV1";
import Container from "hometown-components-dev/lib/ContainerHtV1";
import Section from "hometown-components-dev/lib/SectionHtV1";
import Wrapper from "hometown-components-dev/lib/WrapperHtV1";
import SeoContent from "hometown-components-dev/lib/SeoContent";
import Row from "hometown-components-dev/lib/RowHtV1";
import Col from "hometown-components-dev/lib/ColHtV1";
import Heading from "hometown-components-dev/lib/HeadingHtV1";
import Text from "hometown-components-dev/lib/TextHtV1";

/* ====== Selectors ====== */
import { getText } from "selectors/homepage";

/* ====== Page Components ====== */
import CommonLayout from "components/Category/CommonLayout";
import UnbxdTopSellers from "components/Category/UnbxdTopSellers";
import Header from "components/Header";
import Footer from "components/Footer";
import MainSlider from "components/MainSlider";
import TitleBar from "components/Listing/TitleBar";
import BreadCrumb from "./BreadCrumb";
import FurnitureContainer from "../../components/FurnitureCategories/FurnitureContainer";
import HomewareContainer from "../../components/HomewareCat/HomewareContainer";
import HomeFurnishingContainer from "../../components/HomewareCat/HomeFurnishingContainer";
import TablewareKitchenware from "../../components/HomewareCat/TablewareKitchenware";
const styles = require("./Category.scss");
// import "./Category.scss";

const getFaqs = faqs => {
  const seoFaq = JSON.parse(faqs).map(faq => {
    // console.log(faq, 'QA check');
    // console.log(Object.values(faq)[0]);
    const ques = Object.values(faq)[0];
    // console.log(faq.ans);
    if (faq) {
      return {
        "@type": "Question",
        name: ques,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.ans
        }
      };
    }
    return "";
  });
  return JSON.stringify(seoFaq);
};
const getSubMenu = (categories, key) =>
  categories &&
  categories.filter(category => category.url_key === key)[0].children;

@connect(({ homepage: { menu }, category, category: { data }, pincode }) => ({
  menu: menu.data,
  pincode: pincode.selectedPincode,
  category: data && data.items && data.items.text,
  categoryText: getText(category),
  seoInfo: data && data.seo && data.seo.items
}))
export default class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleCategoryClick(event) {
    event.preventDefault();
    const { selectedPincode } = this.props;
    window.HTCATEGORY.navigateToCategory({
      pathname: event.currentTarget.pathname,
      search: event.currentTarget.search,
      pincode: selectedPincode
    });
  }

  renderOffers = offers =>
    offers.map(item => (
      <Col
        width={[1 / 2, 1 / 2, 1 / 4]}
        textAlign="center"
        sx={{
          borderRight: "whiteMedium",
          "&:last-child": {
            borderRight: "none"
          }
        }}
      >
        {item.link ? (
          <a href={item.link}>
            <Text variant="textLight" color="white">
              {item.offer || ""}
            </Text>
            <Heading variant="heading.medium" color="white" py={6}>
              {item.title || ""}
            </Heading>
            <Heading fontSize={16} color="white">
              {item.description || ""}
            </Heading>
          </a>
        ) : (
          <div>
            <Text variant="textLight" color="white">
              {item.offer || ""}
            </Text>
            <Heading variant="heading.medium" color="white" py={6}>
              {item.title || ""}
            </Heading>
            <Heading fontSize={16} color="white">
              {item.description || ""}
            </Heading>
          </div>
        )}
      </Col>
    ));
  render() {
    const {
      category,
      seoInfo,
      categoryText: { title: pageTitle },
      match: {
        params: { category: currentCategory }
      }
    } = this.props;
    // const { cms_json: cmsJson } = seoInfo;

    /* eslint-disable react/no-danger */
    return (
      <Wrapper>
        <Helmet
          title={`${(seoInfo && seoInfo.page_title) ||
            (currentCategory && currentCategory.toUpperCase())}`}
        >
          <meta name="keywords" content={seoInfo && seoInfo.meta_keywords} />
          <meta
            name="description"
            content={seoInfo && seoInfo.meta_description}
          />
          {/* {cmsJson && cmsJson.length ? (
            <script type="application/ldjson">
              {`
              {
                "@context" : "http://schema.org",
                "@type" : "FAQPage",
                "mainEntity": ${getFaqs(cmsJson)}
              }
            `}
            </script>
          ) : (
            ""
          )} */}
        </Helmet>
        <Body>
          {/* Header */}
          <Header />

          <div>
            {" "}
            {currentCategory === "furniture" ? (
              <div>
                <TitleBar title="Home Furnishings">
                  <BreadCrumb
                    urlKey={currentCategory}
                    name={pageTitle}
                    handleCategoryClick={this.handleCategoryClick}
                  />
                </TitleBar>
                <FurnitureContainer />
                <div>
                  {seoInfo && seoInfo.seo_text && (
                    <SeoContent>
                      <Container>
                        <div className={styles.seoContent}>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: seoInfo.seo_text
                            }}
                          />
                        </div>
                      </Container>
                    </SeoContent>
                  )}
                </div>
              </div>
            ) : // : currentCategory === "home-decor" ? (
            //   <div>
            //     <TitleBar title="Home Decor">
            //       <BreadCrumb
            //         urlKey={currentCategory}
            //         name={pageTitle}
            //         handleCategoryClick={this.handleCategoryClick}
            //       />
            //     </TitleBar>
            //     <HomewareContainer />
            //     <div>
            //       {seoInfo && seoInfo.seo_text && (
            //         <SeoContent>
            //           <Container>
            //             <div className={styles.seoContent}>
            //               <div
            //                 dangerouslySetInnerHTML={{
            //                   __html: seoInfo.seo_text
            //                 }}
            //               />
            //             </div>
            //           </Container>
            //         </SeoContent>
            //       )}
            //     </div>
            //   </div>
            // ) : currentCategory === "home-furnishings" ? (
            //   <div>
            //     <TitleBar title="Home Furnishing">
            //       <BreadCrumb
            //         urlKey={currentCategory}
            //         name={pageTitle}
            //         handleCategoryClick={this.handleCategoryClick}
            //       />
            //     </TitleBar>
            //     <HomeFurnishingContainer />
            //     <div>
            //       {seoInfo && seoInfo.seo_text && (
            //         <SeoContent>
            //           <Container>
            //             <div className={styles.seoContent}>
            //               <div
            //                 dangerouslySetInnerHTML={{
            //                   __html: seoInfo.seo_text
            //                 }}
            //               />
            //             </div>
            //           </Container>
            //         </SeoContent>
            //       )}
            //     </div>
            //   </div>
            // )
            currentCategory === "tableware-kitchenware" ? (
              <TablewareKitchenware />
            ) : (
              <div>
                {/* Offer Bar */}
                {category.offers && (
                  <Box bg="heading" pt={30} pb={20}>
                    <Container>
                      <Row justifyContent="center">
                        {this.renderOffers(category.offers || [])}
                      </Row>
                    </Container>
                  </Box>
                )}

                {/* Main Slider */}
                {category && <MainSlider data={category.main} />}

                {/* Breadcrumb */}
                <TitleBar title="Home Furnishings">
                  <BreadCrumb
                    urlKey={currentCategory}
                    name={pageTitle}
                    handleCategoryClick={this.handleCategoryClick}
                  />
                </TitleBar>

                {/* Category Carousel */}
                {category &&
                  category.sections &&
                  category.sections.map((cat, index) => (
                    <Section key={String(index)}>
                      {cat.title !== "" && (
                        <Container>
                          {CommonLayout(
                            cat.component,
                            cat.title,
                            cat.data,
                            cat.is_product
                          )}
                        </Container>
                      )}
                    </Section>
                  ))}
                {category && (
                  <Box display="inline-block" width="100%">
                    <Container>
                      <UnbxdTopSellers category={category.title} />
                    </Container>
                  </Box>
                )}
              </div>
            )}
            {/* SEO Content */}
            {/* {seoInfo && seoInfo.seo_text && (
              <SeoContent>
                <Container>
                  <div className={styles.seoContent}>
                    <div
                      dangerouslySetInnerHTML={{ __html: seoInfo.seo_text }}
                    />
                  </div>
                </Container>
              </SeoContent>
            )} */}
          </div>
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
    seo_text: ""
  },
  selectedPincode: "",
  categoryText: { title: "" }
};

Category.propTypes = {
  category: PropTypes.array,
  // menu: PropTypes.array,
  match: PropTypes.shape({
    params: PropTypes.object.isRequired
  }).isRequired,
  seoInfo: PropTypes.object,
  selectedPincode: PropTypes.string,
  categoryText: PropTypes.object
};
