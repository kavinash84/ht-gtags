import React from 'react';
import { Link } from 'react-router-dom';
import Empty from 'hometown-components/lib/Empty';
import Img from 'hometown-components/lib/Img';
import Section from 'hometown-components/lib/Section';
import Heading from 'hometown-components/lib/Heading';
import Container from 'hometown-components/lib/Container';
import Row from 'hometown-components/lib/Row';
import Div from 'hometown-components/lib/Div';
import Menu from 'containers/MenuNew/index';
import Footer from 'components/Footer';

const SearchEmptyIcon = require('../../../static/404.png');
const styles = require('./NotFound.scss');

export default function NotFound() {
  return (
    <div className="wrapper">
      <Menu />
      <Section display="flex" p="0.625rem" pt="1.25rem" mb="0">
        <Empty
          title="Sorry no results found"
          subTitle="Please check the Spelling or by a different search"
          btnName="Go Back Home"
          url="/"
          bg="#fafafa"
        >
          <Img src={SearchEmptyIcon} width="initial" m="auto" alt="Sorry no results found" />
        </Empty>
      </Section>
      <Section display="flex" p="0.625rem" pt="1.25rem" mb="0">
        <Container pr="0" pl="0">
          <Row m="0">
            <Div col={2}>
              <Heading fontSize="1rem" mt="1rem" fontFamily="medium">
                Furniture
              </Heading>
              <ul className={styles.catList}>
                <li>
                  <Link to="/furniture/living-room/">Living Room Furniture</Link>
                </li>
                <li>
                  <Link to="/furniture/dining-room/">Dining & Kitchen Furniture</Link>
                </li>
                <li>
                  <Link to="/furniture/bar/">Bar Furniture</Link>
                </li>
                <li>
                  <Link to="/">Bedroom Furniture</Link>
                </li>
                <li>
                  <Link to="/">Mattresses </Link>
                </li>
                <li>
                  <Link to="/">Kids Furniture</Link>
                </li>
                <li>
                  <Link to="/">Study & Office Furniture</Link>
                </li>
                <li>
                  <Link to="/">Accent Furniture</Link>
                </li>
                <li>
                  <Link to="/">Shoe Racks </Link>
                </li>
                <li>
                  <Link to="/">Book Shelves</Link>
                </li>
                <li>
                  <Link to="/">Outdoor Furniture</Link>
                </li>
              </ul>
            </Div>
            <Div col={2}>
              <Heading fontSize="1rem" mt="1rem" fontFamily="medium">
                Home Furnishing
              </Heading>
              <ul className={styles.catList}>
                <li>
                  <Link to="/homefurnishings/bedding">Bedding</Link>
                </li>
                <li>
                  <Link to="/homefurnishings/pillows-inserts">Pillows</Link>
                </li>
                <li>
                  <Link to="/">Protectors</Link>
                </li>
                <li>
                  <Link to="/">Covers & Inserts</Link>
                </li>
                <li>
                  <Link to="/">Curtains</Link>
                </li>
                <li>
                  <Link to="/">Mats & Rugs</Link>
                </li>
                <li>
                  <Link to="/">Bath Linen</Link>
                </li>
                <li>
                  <Link to="/">Bath Accessories</Link>
                </li>
              </ul>
            </Div>
            <Div col={2}>
              <Heading fontSize="1rem" mt="1rem" fontFamily="medium">
                Home Decor
              </Heading>
              <ul className={styles.catList}>
                <li>
                  <Link to="/">Idols & Figurines</Link>
                </li>
                <li>
                  <Link to="/">Fountains</Link>
                </li>
                <li>
                  <Link to="/">Clocks</Link>
                </li>
                <li>
                  <Link to="/">Candles & Fragrances</Link>
                </li>
                <li>
                  <Link to="/">Lamps & Lighting</Link>
                </li>
                <li>
                  <Link to="/">Wall Décor</Link>
                </li>
                <li>
                  <Link to="/">Vases & Flowers</Link>
                </li>
                <li>
                  <Link to="/">Pots & Planters</Link>
                </li>
              </ul>
            </Div>
            <Div col={2}>
              <Heading fontSize="1rem" mt="1rem" fontFamily="medium">
                Tableware
              </Heading>
              <ul className={styles.catList}>
                <li>
                  <Link to="/">Glassware</Link>
                </li>
                <li>
                  <Link to="/">Trays & Platters</Link>
                </li>
                <li>
                  <Link to="/">Coffee & Tea</Link>
                </li>
                <li>
                  <Link to="/">Cutlery</Link>
                </li>
                <li>
                  <Link to="/">Crockery</Link>
                </li>
                <li>
                  <Link to="/">Serveware</Link>
                </li>
                <li>
                  <Link to="/">Table Essentials</Link>
                </li>
              </ul>
            </Div>
            <Div col={2}>
              <Heading fontSize="1rem" mt="1rem" fontFamily="medium">
                Kitchenware
              </Heading>
              <ul className={styles.catList}>
                <li>
                  <Link to="/">Food Storage</Link>
                </li>
                <li>
                  <Link to="/">Thermoware</Link>
                </li>
                <li>
                  <Link to="/">Organizers</Link>
                </li>
                <li>
                  <Link to="/">Cookware & Tools</Link>
                </li>
                <li>
                  <Link to="/">Kitchen Linen</Link>
                </li>
                <li>
                  <Link to="/">Kitchen Appliances</Link>
                </li>
                <li>
                  <Link to="/">Kitchen Essentials</Link>
                </li>
                <li>
                  <Link to="/">Bakeware</Link>
                </li>
                <li>
                  <Link to="/">Cleaning</Link>
                </li>
                <li>
                  <Link to="/">Ladders</Link>
                </li>
              </ul>
            </Div>
            <Div col={2}>
              <Heading fontSize="1rem" mt="1rem" fontFamily="medium">
                Bath
              </Heading>
              <ul className={styles.catList}>
                <li>
                  <Link to="/">Shower Room</Link>
                </li>
                <li>
                  <Link to="/">Shower Multifunctions</Link>
                </li>
                <li>
                  <Link to="/">Bath Tubs</Link>
                </li>
                <li>
                  <Link to="/">Bath Vanity</Link>
                </li>
                <li>
                  <Link to="/">Bath Cabinets</Link>
                </li>
                <li>
                  <Link to="/">Bath Accessories</Link>
                </li>
                <li>
                  <Link to="/">Shower Curtains</Link>
                </li>
                <li>
                  <Link to="/">Bath Linen</Link>
                </li>
                <li>
                  <Link to="/">Laundry</Link>
                </li>
              </ul>
            </Div>
          </Row>
        </Container>
      </Section>
      <Footer />
    </div>
  );
}
