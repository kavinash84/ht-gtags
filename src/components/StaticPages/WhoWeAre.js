import React from 'react';
import TitleBar from 'components/TitleBar';
import Container from 'hometown-components/lib/Container';
import Div from 'hometown-components/lib/Div';
import Row from 'hometown-components/lib/Row';
import Text from 'hometown-components/lib/Text';
import Section from 'hometown-components/lib/Section';

const styles = require('./StaticPages.scss');

const WhoWeAre = () => (
  <Section display="block" p="0" mb="0" height="auto">
    <TitleBar title="About hometown.in" />
    <Container type="container" pr="0.5rem" pl="0.5rem">
      <Div className={styles.staticPageWrapper} type="block" pt="2rem" pb="2.5rem">
        {/* eslint-disable */}
        <Row ml="0" mr="0">
          <Div>
            <Text color="regba(0,0,0,0.7)" fontSize="0.875rem" mb="1rem">
              Over the past 10 years, HomeTown has been bringing the latest designs & fashion to Indian homes. HomeTown
              offers the widest and best in class range in furniture, home furnishings & decor, modular kitchens, home
              improvement and more. Part of the Future Group, HomeTown brings an enjoyable and hassle-free homemaking
              experience to all its valuable customers with varying lifestyles and preferences.
            </Text>
            <Text color="regba(0,0,0,0.7)" fontSize="0.875rem" mb="1rem">
              We promise to facilitate our customers with a unique and personalized shopping experience. Our commitment
              to quality and timeless designs has helped us evolve over the years and it indeed fills us with pride to
              be the first choice of many.
            </Text>
            <Text color="regba(0,0,0,0.7)" fontSize="0.875rem" mb="1rem">
              With a great spread that appeals to the globe-trotting, trendy yet very much Indian homemaker, HomeTown is
              known to attract an array of lifestyle seeking customers. Being recognized as India’s biggest store in
              homemaking, renovation and decor, our products are exclusively designed while keeping durability and
              comfort at priority.The key differentiator between Home Town and others is the Design and Build offering
              of end-to-end interior decoration services, to customers who are interested in renovating & upgrading
              their homes.
            </Text>
            <Text color="regba(0,0,0,0.7)" fontSize="0.875rem" mb="1rem">
              From classy sofas to chic dining sets to kitchen essentials and artifacts, we offer everything to beautify
              your living space. Since 2006, we’ve grown to over 40 stores across 22 cities. Keeping pace with the
              tech-savvy world, we have maintained a strong web presence with prompt online services.
            </Text>
          </Div>
        </Row>
      </Div>
    </Container>
  </Section>
);

export default WhoWeAre;
