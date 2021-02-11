import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

/* ====== Components ====== */
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Body from 'hometown-components-dev/lib/BodyHtV1';
import Container from 'hometown-components-dev/lib/ContainerHtV1';
import Section from 'hometown-components-dev/lib/SectionHtV1';
import Wrapper from 'hometown-components-dev/lib/WrapperHtV1';
import SeoContent from 'hometown-components-dev/lib/SeoContent';
import Row from 'hometown-components-dev/lib/RowHtV1';
import Col from 'hometown-components-dev/lib/ColHtV1';
import Heading from 'hometown-components-dev/lib/HeadingHtV1';
import Text from 'hometown-components-dev/lib/TextHtV1';

/* ====== Page Components ====== */
import CommonLayout from 'components/Category/CommonLayout';
import UnbxdTopSellers from 'components/Category/UnbxdTopSellers';
import Header from 'components/Header';
import Footer from 'components/Footer';
import MainSlider from 'components/MainSlider';

const getFaqs = faqs => {
  const seoFaq = JSON.parse(faqs).map(faq => {
    // console.log(faq, 'QA check');
    // console.log(Object.values(faq)[0]);
    const ques = Object.values(faq)[0];
    // console.log(faq.ans);
    if (faq) {
      return {
        '@type': 'Question',
        name: ques,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.ans
        }
      };
    }
    return '';
  });
  return JSON.stringify(seoFaq);
};
// const getSubMenu = (categories, key) =>
//   categories && categories.filter(category => category.url_key === key)[0].children;

@connect(({ homepage: { menu }, category: { data } }) => ({
  menu: menu.data,
  category: data && data.items && data.items.text,
  seoInfo: data && data.seo && data.seo.items
}))
export default class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  renderOffers = offers =>
    offers.map(item => (
      <Col
        width={[1 / 2, 1 / 2, 1 / 4]}
        textAlign="center"
        sx={{
          borderRight: 'whiteMedium',
          '&:last-child': {
            borderRight: 'none'
          }
        }}
      >
        <Text variant="textLight" color="white">
          {item.offer || ''}
        </Text>
        <Heading variant="heading.medium" color="white" py={6}>
          {item.title || ''}
        </Heading>
        <Heading fontSize={16} color="white">
          {item.description || ''}
        </Heading>
      </Col>
    ));
  render() {
    const {
      category,
      seoInfo,
      // menu,
      match: {
        params: { category: currentCategory }
      }
    } = this.props;
    const { cms_json: cmsJson } = seoInfo;

    // console.log(JSON.parse(cms_json), 'cat check');
    /* eslint-disable react/no-danger */
    return (
      <Wrapper>
        <Helmet title={`${(seoInfo && seoInfo.page_title) || (currentCategory && currentCategory.toUpperCase())}`}>
          <meta name="keywords" content={seoInfo && seoInfo.meta_keywords} />
          <meta name="description" content={seoInfo && seoInfo.meta_description} />
          {cmsJson.length ? (
            <script type="application/ld+json">
              {`
              {
                "@context" : "http://schema.org",
                "@type" : "FAQPage",
                "mainEntity": ${getFaqs(cmsJson)}
              }
            `}
            </script>
          ) : (
            ''
          )}
        </Helmet>
        <Body>
          {/* Header */}
          <Header />

          {/* Offer Bar */}
          {category.offers && (
            <Box bg="heading" pt={30} pb={20}>
              <Container>
                <Row justifyContent="center">{this.renderOffers(category.offers || [])}</Row>
              </Container>
            </Box>
          )}

          {/* Main Slider */}
          {category && <MainSlider data={category.main} />}

          {/* Category Carousel */}
          {category &&
            category.sections &&
            category.sections.map((cat, index) => (
              <Section key={String(index)}>
                {cat.title !== '' && (
                  <Container>{CommonLayout(cat.component, cat.title, cat.data, cat.is_product)}</Container>
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

          {/* SEO Content */}
          {seoInfo && seoInfo.seo_text && (
            <SeoContent>
              <Container>
                <div dangerouslySetInnerHTML={{ __html: seoInfo.seo_text }} />
              </Container>
            </SeoContent>
          )}

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
