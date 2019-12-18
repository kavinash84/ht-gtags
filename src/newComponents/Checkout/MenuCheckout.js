import React from 'react';
import PropTypes from 'prop-types';
import HeadingHtV1 from 'hometown-components-dev/lib/HeadingHtV1';
import ContainerHtV1 from 'hometown-components-dev/lib/ContainerHtV1';
import BoxHtV1 from 'hometown-components-dev/lib/BoxHtV1';
import ButtonHtV1 from 'hometown-components-dev/lib/ButtonHtV1';
import ImageHtV1 from 'hometown-components-dev/lib/ImageHtV1';
import SectionHtV1 from 'hometown-components-dev/lib/SectionHtV1';
import RowHtV1 from 'hometown-components-dev/lib/RowHtV1';

const Back = require('../../../static/arrow_back_black.svg');
const styles = require('./Checkout.scss');

const MenuCheckout = ({ page, history }) => (
  <SectionHtV1 mb="0.625rem" p="1.75rem 0.5rem 1.375rem" bg="bg" boxShadow="0 2px 8px 0 rgba(0, 0, 0, 0.17)">
    <ContainerHtV1 type="container" pr="2rem" pl="2rem">
      <RowHtV1 display="block" mr="0" ml="0" mb="1rem">
        <HeadingHtV1 fontSize="0.875rem" color="text" mt="0" mb="0" fontFamily="medium">
          <ButtonHtV1 className={styles.back} onClick={() => history.goBack()}>
            <ImageHtV1 src={Back} alt="back" />
          </ButtonHtV1>
          CHECKOUT
        </HeadingHtV1>
      </RowHtV1>
      <RowHtV1 display="block" mr="0" ml="0">
        <BoxHtV1 col="9">
          <BoxHtV1 col="3">
            <BoxHtV1 className={`${styles.headerLink} ${page === 'delivery' ? styles.active : ''}`}>
              Delivery Address
            </BoxHtV1>
          </BoxHtV1>
          <BoxHtV1 col="3">
            <BoxHtV1 className={`${styles.headerLink} ${styles.hideArrow} ${page === 'payment' ? styles.active : ''}`}>
              Payment Options
            </BoxHtV1>
          </BoxHtV1>
          {/* <Div col="3">
            <span className={`${styles.headerLink} ${styles.hideArrow} ${page === 'review' ? styles.active : ''}`}>
              Review & Order
            </span>
          </Div> */}
        </BoxHtV1>
      </RowHtV1>
    </ContainerHtV1>
  </SectionHtV1>
);

MenuCheckout.defaultProps = {
  page: 'delivery'
};

MenuCheckout.propTypes = {
  page: PropTypes.string,
  history: PropTypes.object.isRequired
};

export default MenuCheckout;
