import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
/**
 * Components
 */
import Ul from 'hometown-components-dev/lib/UlHtV1';
import Li from 'hometown-components-dev/lib/LiHtV1';
import Text from 'hometown-components-dev/lib/TextHtV1';

const styles = require('./BreadCrumb.scss');

const BreadCrumb = ({ breadcrumbs }) => {
  let link = '';
  return (
    <Ul itemScope itemType="http://schema.org/BreadcrumbList" className={styles.breadCrumbPdp}>
      <Li key="home" itemProp="itemListElement" itemType="http://schema.org/ListItem" itemScope>
        <Link itemProp="item" to="/">
          <Text variant="primary" itemProp="name">
            Home
          </Text>
          <meta itemProp="position" content={1} />
        </Link>
      </Li>
      {breadcrumbs.map((item, index) => {
        link += `/${item.urlkey}`;
        return (
          <Li key={String(index)} itemProp="itemListElement" itemType="http://schema.org/ListItem" itemScope>
            <Link itemProp="item" to={`${link}`}>
              <Text itemProp="name">{breadcrumbs.length - 1 !== index ? item.name : <strong>{item.name}</strong>}</Text>
              <meta itemProp="position" content={index + 2} />
            </Link>
          </Li>
        );
      })}
    </Ul>
  );
};
BreadCrumb.defaultProps = {
  breadcrumbs: []
};
BreadCrumb.propTypes = {
  breadcrumbs: PropTypes.array
};
export default BreadCrumb;
