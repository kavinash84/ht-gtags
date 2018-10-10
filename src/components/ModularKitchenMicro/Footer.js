import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'hometown-components/lib/Container';
import Section from 'hometown-components/lib/Section';
import Row from 'hometown-components/lib/Row';
import Div from 'hometown-components/lib/Div';
import Text from 'hometown-components/lib/Text';
import Heading from 'hometown-components/lib/Heading';

const styles = require('./ModularKitchen.scss');

const Footer = () => (
  <Section p="20px 0" mb="0" bg="textExtraDark">
    <Container type="container" pr="0.5rem" pl="0.5rem">
      <Row ml="0" mr="0">
        <Div col="5">
          <Heading color="textExtraLight">About HomeTown</Heading>
          <Text color="rgba(255, 255, 255, 0.5)">
            Over the past 10 years, HomeTown has been bringing the latest designs & fashion to Indian homes. HomeTown
            offers the widest and best in class range in furniture, home furnishings & decor, modular kitchens, home
            improvement and more. Part of the Future Group, HomeTown brings an enjoyable and hassle-free homemaking
            experience to all its valuable customers with varying lifestyles and preferences.
          </Text>
        </Div>
        <Div col="5" ta="right">
          <ul className={styles.menuMk}>
            <li>
              <Link to="/modular-kitchens-micro">Home</Link>
            </li>
            <li>
              <Link to="/plan-your-kitchen">Plan Your Kitchen</Link>
            </li>
            <li>
              <Link to="/store-locator">Store Locator</Link>
            </li>
          </ul>
        </Div>
      </Row>
    </Container>
  </Section>
);

export default Footer;
