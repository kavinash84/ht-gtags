import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const styles = require('./BreadCrumb.scss');

const BreadCrumb = ({ breadcrumbs }) => {
  let link = '';
  return (
    <ul itemScope itemType="http://schema.org/BreadcrumbList" className={styles.breadCrumbList}>
      {breadcrumbs.map((item, index) => {
        link += `/${item.urlkey}`;
        return (
          <li key={String(index)} itemProp="itemListElement" itemType="http://schema.org/ListItem" itemScope>
            <Link itemProp="item" to={`${link}`}>
              <span itemProp="name">{item.name}</span>
              <meta itemProp="position" content={index + 1} />
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
