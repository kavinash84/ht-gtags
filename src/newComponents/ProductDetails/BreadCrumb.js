import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const styles = require('./BreadCrumb.scss');

const BreadCrumb = ({ breadcrumbs }) => {
  let link = '';
  return (
    <ul itemScope itemType="http://schema.org/BreadcrumbList" className={styles.breadCrumbPdp}>
      <li key="home" itemProp="itemListElement" itemType="http://schema.org/ListItem" itemScope>
        <Link itemProp="item" to="/">
          <span itemProp="name">Home</span>
          <meta itemProp="position" content={1} />
        </Link>
      </li>
      {breadcrumbs.map((item, index) => {
        link += `/${item.urlkey}`;
        return (
          <li key={String(index)} itemProp="itemListElement" itemType="http://schema.org/ListItem" itemScope>
            <Link itemProp="item" to={`${link}`}>
              <span itemProp="name">{item.name}</span>
              <meta itemProp="position" content={index + 2} />
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
BreadCrumb.defaultProps = {
  breadcrumbs: []
};
BreadCrumb.propTypes = {
  breadcrumbs: PropTypes.array
};
export default BreadCrumb;
