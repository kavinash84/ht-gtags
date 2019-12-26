import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ContainerHtV1 from 'hometown-components-dev/lib/ContainerHtV1';
import BoxHtV1 from 'hometown-components-dev/lib/BoxHtV1';
import HeadingHtV1 from 'hometown-components-dev/lib/HeadingHtV1';
import RowHtV1 from 'hometown-components-dev/lib/RowHtV1';
import SectionHtV1 from 'hometown-components-dev/lib/SectionHtV1';
// import { MY_ORDER_URL, MY_PROFILE_URL, MY_WISHLIST_URL, MY_ADDRESS_URL, MY_CASES_URL } from 'helpers/Constants';
import { MY_ORDER_URL, MY_PROFILE_URL, MY_ADDRESS_URL, MY_CASES_URL } from 'helpers/Constants';

const styles = require('./MyMenu.scss');

const MyOrder = ({ page }) => (
  <SectionHtV1 mb="0.625rem" p="1.375rem 0.5rem" bg="bg" mt={0}>
    <ContainerHtV1 type="container" pr="0.5rem" pl="0.5rem">
      <RowHtV1 display="block" mr="0" ml="0" mb="0.625rem">
        <HeadingHtV1 fontSize="1.25rem" color="text" mt="0" mb="0" pb="2px" fontFamily="regular">
          My Account
        </HeadingHtV1>
      </RowHtV1>
      <RowHtV1 display="block" mr="0" ml="0">
        <BoxHtV1 col="10" display="flex" width="62%" justifyContent="space-between">
          <BoxHtV1 col="2">
            <Link to={MY_ORDER_URL} className={`${styles.headerLink} ${page === 'order' ? styles.active : ''}`}>
              My Orders
            </Link>
          </BoxHtV1>
          {/* <BoxHtV1 col="2">
            <Link to={MY_WISHLIST_URL} className={`${styles.headerLink} ${page === 'wishlist' ? styles.active : ''}`}>
              My Wishlist
            </Link>
          </BoxHtV1> */}
          <BoxHtV1 col="2">
            <Link to={MY_PROFILE_URL} className={`${styles.headerLink} ${page === 'profile' ? styles.active : ''}`}>
              My Profile
            </Link>
          </BoxHtV1>
          <BoxHtV1 col="2">
            <Link to={MY_ADDRESS_URL} className={`${styles.headerLink} ${page === 'address' ? styles.active : ''}`}>
              My Address
            </Link>
          </BoxHtV1>
          <BoxHtV1 col="2">
            <Link to={MY_CASES_URL} className={`${styles.headerLink} ${page === 'cases' ? styles.active : ''}`}>
              My Cases
            </Link>
          </BoxHtV1>
          {/*  <Div col="2">
            <Link href="#myPoints" className={`${styles.headerLink} ${page === 'points' ? styles.active : ''}`}>
              My Points
            </Link>
          </Div> */}
        </BoxHtV1>
      </RowHtV1>
    </ContainerHtV1>
  </SectionHtV1>
);

MyOrder.defaultProps = {
  page: 'order'
};

MyOrder.propTypes = {
  page: PropTypes.string
};

export default MyOrder;
