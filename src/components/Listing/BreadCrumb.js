import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const styles = require('./BreadCrumb.scss');

const BreadCrumb = ({ categoryDetails }) => {
  let link = '';
  return (
    <ul itemScope itemType="http://schema.org/BreadcrumbList" className={styles.breadCrumbList}>
      {categoryDetails.map((item, index) => {
        if (item) {
          link += `/${item.url_key}`;
          return (
            <li itemProp="itemListElement" itemType="http://schema.org/ListItem" itemScope key={item.id}>
              <Link itemProp="item" to={`${link}`}>
                <span itemProp="name">{item.name}</span>
                <meta itemProp="position" content={index + 1} />
              </Link>
              <br />
            </li>
          );
        }
        return null;
      })}
    </ul>
  );
};

BreadCrumb.propTypes = {
  categoryDetails: PropTypes.array.isRequired
};
export default BreadCrumb;
