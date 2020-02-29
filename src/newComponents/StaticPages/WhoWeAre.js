import React from 'react';
import Container from 'hometown-components-dev/lib/ContainerHtV1';
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Row from 'hometown-components-dev/lib/RowHtV1';
import Text from 'hometown-components-dev/lib/TextHtV1';
import Heading from 'hometown-components-dev/lib/HeadingHtV1';

const styles = require('./StaticPages.scss');

const TextRegular = props => <Text lineHeight={1.5} color="rgba(0,0,0,0.7)" mb="1rem" {...props} />;

const WhoWeAre = () => (
  <Container pt={[40, 40, 40, 60]}>
    <Box className={styles.staticPageWrapper}>
      <Row ml="0" mr="0">
        <Box>
          <Heading mb="1em">Who We Are</Heading>
          <TextRegular>
            Over the past 10 years, HomeTown has been bringing the latest designs & fashion to Indian homes. HomeTown
            offers the widest and best in class range in furniture, home furnishings & decor, modular kitchens, home
            improvement and more. Part of the Future Group, HomeTown brings an enjoyable and hassle-free homemaking
            experience to all its valuable customers with varying lifestyles and preferences.
          </TextRegular>
          <TextRegular>
            We promise to facilitate our customers with a unique and personalized shopping experience. Our commitment to
            quality and timeless designs has helped us evolve over the years and it indeed fills us with pride to be the
            first choice of many.
          </TextRegular>
          <TextRegular>
            With a great spread that appeals to the globe-trotting, trendy yet very much Indian homemaker, HomeTown is
            known to attract an array of lifestyle seeking customers. Being recognized as India’s biggest store in
            homemaking, renovation and decor, our products are exclusively designed while keeping durability and comfort
            at priority.The key differentiator between Home Town and others is the Design and Build offering of
            end-to-end interior decoration services, to customers who are interested in renovating & upgrading their
            homes.
          </TextRegular>
          <TextRegular>
            From classy sofas to chic dining sets to kitchen essentials and artifacts, we offer everything to beautify
            your living space. Since 2006, we’ve grown to over 40 stores across 22 cities. Keeping pace with the
            tech-savvy world, we have maintained a strong web presence with prompt online services.
          </TextRegular>
        </Box>
      </Row>
    </Box>
  </Container>
);

export default WhoWeAre;
