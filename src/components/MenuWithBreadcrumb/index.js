import React from 'react';
import PropTypes from 'prop-types';
import Container from 'hometown-components-dev/lib/Container';
import Div from 'hometown-components-dev/lib/Div';
import Heading from 'hometown-components-dev/lib/Heading';
import Row from 'hometown-components-dev/lib/Row';
import Section from 'hometown-components-dev/lib/Section';
// import Button from 'hometown-components-dev/lib/Buttons';
import { Label } from 'hometown-components-dev/lib/Label';
// import Img from 'hometown-components-dev/lib/Img';
import { Link } from 'react-router-dom';

// const view360Icon = require('../../../static/360-icon.svg');
const styles = require('./MenuWithBreadcrumb.scss');

const MenuWithBreadcrumb = ({ storeName }) => (
  <Section mb="0.625rem" p="1.25rem 0.5rem" bg="bg">
    <Container type="container" pr="0" pl="0">
      <Row display="block" mr="0" ml="0">
        <Div col="10">
          <Row display="block" mr="0" ml="0" mb="0.3125rem">
            <Div col="10">
              <Link to="/" className={`${styles.headerLink}`}>
                Home
              </Link>
              <Label className={`${styles.headerLink} ${styles.hideArrow}`}>{storeName}</Label>
            </Div>
          </Row>
          <Row display="block" mr="0" ml="0" mb="0">
            <Heading fontSize="1.25rem" color="text" mt="0" mb="0" fontFamily="light">
              {storeName}
            </Heading>
          </Row>
        </Div>
        {/* <Div col="2" mt="0.625rem" ta="right">
          <Button btnType="link" color="#FFF" className={styles.view360Btn}>
            <Img src={view360Icon} alt="View in 360" float="left" mr="0.625rem" />
            View in 360
          </Button>
        </Div> */}
      </Row>
    </Container>
  </Section>
);

MenuWithBreadcrumb.defaultProps = {
  storeName: ''
};

MenuWithBreadcrumb.propTypes = {
  storeName: PropTypes.string
};

export default MenuWithBreadcrumb;
