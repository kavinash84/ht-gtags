import React from 'react';
import PropTypes from 'prop-types';
import Container from 'hometown-components/lib/Container';
import Div from 'hometown-components/lib/Div';
import Heading from 'hometown-components/lib/Heading';
import Row from 'hometown-components/lib/Row';
import Section from 'hometown-components/lib/Section';
import Button from 'hometown-components/lib/Buttons';
import { Label } from 'hometown-components/lib/Label';
import Img from 'hometown-components/lib/Img';
import { Link } from 'react-router-dom';

const view360Icon = require('../../../static/360-icon.svg');
const styles = require('./MenuWithBreadcrumb.scss');

const MenuWithBreadcrumb = ({ storeName }) => (
  <Section mb="0.625rem" p="1.375rem 0.5rem 0.75rem" bg="oldMont" boxShadow="0 2px 8px 0 rgba(0, 0, 0, 0.17)">
    <Container type="container" pr="0.5rem" pl="0.5rem">
      <Row display="block" mr="0" ml="0">
        <Div col="10">
          <Row display="block" mr="0" ml="0" mb="1rem">
            <Div col="10">
              <Link to="/" className={`${styles.headerLink}`}>
                Home
              </Link>
              <Label className={`${styles.headerLink} ${styles.hideArrow}`}>{storeName}</Label>
            </Div>
          </Row>
          <Row display="block" mr="0" ml="0" mb="0.5rem">
            <Heading fontSize="1.5rem" color="white" mt="0" mb="0" fontFamily="thin">
              {storeName}
            </Heading>
          </Row>
        </Div>
        <Div col="2" mt="0.625rem" ta="right">
          <Button btnType="link" color="#FFF" className={styles.view360Btn}>
            <Img src={view360Icon} alt="View in 360" float="left" mr="0.625rem" />
            View in 360
          </Button>
        </Div>
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
