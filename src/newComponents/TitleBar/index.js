import React from 'react';
import PropTypes from 'prop-types';
import Heading from 'hometown-components-dev/lib/HeadingHtV1';
import Container from 'hometown-components-dev/lib/ContainerHtV1';
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Section from 'hometown-components-dev/lib/SectionHtV1';
import Row from 'hometown-components-dev/lib/RowHtV1';
import { Link } from 'react-router-dom';

const styles = require('newComponents/Listing/BreadCrumb.scss');

const TitleBar = ({ title, productCount }) => (
  <Section mb="0.625rem" p="1.25rem 0.5rem" bg="bg">
    <Container type="container" pr="0" pl="0">
      <Row display="block" mr="0" ml="0" mb="0">
        <Box col="9">
          <ul itemScope itemType="http://schema.org/BreadcrumbList" className={styles.breadCrumbList}>
            <li itemProp="itemListElement" itemType="http://schema.org/ListItem" itemScope>
              <Link itemProp="item" to="/">
                <Box itemProp="name">Home</Box>
                <meta itemProp="position" content="1" />
              </Link>
            </li>
            <li itemProp="itemListElement" itemType="http://schema.org/ListItem" itemScope>
              <Link itemProp="item" to="/" onClick={e => e.preventDefault()}>
                <Box itemProp="name">{title}</Box>
                <meta itemProp="position" content="2" />
              </Link>
            </li>
          </ul>
        </Box>
      </Row>
      <Row display="block" mr="0" ml="0" mb="0">
        <Heading fontSize="1.5rem" color="text" mt="0" mb="0" pb="2px" fontFamily="regular">
          {title} {productCount && `(${productCount})`}
        </Heading>
      </Row>
    </Container>
  </Section>
);

TitleBar.defaultProps = {
  title: '',
  productCount: ''
};

TitleBar.propTypes = {
  title: PropTypes.string,
  productCount: PropTypes.string
};

export default TitleBar;
