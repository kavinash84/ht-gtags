import React from 'react';
import PropTypes from 'prop-types';
import HeadingHtV1 from 'hometown-components-dev/lib/HeadingHtV1';
import ContainerHtV1 from 'hometown-components-dev/lib/ContainerHtV1';
import BoxHtV1 from 'hometown-components-dev/lib/BoxHtV1';
import SectionHtV1 from 'hometown-components-dev/lib/SectionHtV1';
import RowHtV1 from 'hometown-components-dev/lib/RowHtV1';
import { Link } from 'react-router-dom';

const styles = require('components/Listing/BreadCrumb.scss');

const TitleBar = ({ title, productCount }) => (
  <SectionHtV1 mb="0.625rem" p="1.25rem 0.5rem" bg="bg">
    <ContainerHtV1 type="container" pr="0" pl="0">
      <RowHtV1 display="block" mr="0" ml="0" mb="0">
        <BoxHtV1 col="9">
          <ul itemScope itemType="http://schema.org/BreadcrumbList" className={styles.breadCrumbList}>
            <li itemProp="itemListElement" itemType="http://schema.org/ListItem" itemScope>
              <Link itemProp="item" to="/">
                <BoxHtV1 itemProp="name">Home</BoxHtV1>
                <meta itemProp="position" content="1" />
              </Link>
            </li>
            <li itemProp="itemListElement" itemType="http://schema.org/ListItem" itemScope>
              <Link itemProp="item" to="/" onClick={e => e.preventDefault()}>
                <BoxHtV1 itemProp="name">{title}</BoxHtV1>
                <meta itemProp="position" content="2" />
              </Link>
            </li>
          </ul>
        </BoxHtV1>
      </RowHtV1>
      <RowHtV1 display="block" mr="0" ml="0" mb="0">
        <HeadingHtV1 fontSize="1.5rem" color="text" mt="0" mb="0" pb="2px" fontFamily="regular">
          {title} {productCount && `(${productCount})`}
        </HeadingHtV1>
      </RowHtV1>
    </ContainerHtV1>
  </SectionHtV1>
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
