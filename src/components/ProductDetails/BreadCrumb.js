import React from 'react';
import { Link } from 'react-router-dom';
import Section from 'hometown-components/lib/Section';
import Container from 'hometown-components/lib/Container';
import Row from 'hometown-components/lib/Row';
import Div from 'hometown-components/lib/Div';

const styles = require('./BreadCrumb.scss');

const BreadCrumb = () => (
  <Section p="0" pt="1.25rem" mb="0">
    <Container type="container" pr="0" pl="0">
      <Row display="block" mt="0.625rem" mb="0.625rem" mr="0">
        <Div>
          <ul className={styles.breadCrumbList}>
            <li>
              <Link to="/">Home > </Link>
            </li>
            <li>
              <Link to="/">Furniture</Link>
            </li>
          </ul>
        </Div>
      </Row>
    </Container>
  </Section>
);

export default BreadCrumb;
