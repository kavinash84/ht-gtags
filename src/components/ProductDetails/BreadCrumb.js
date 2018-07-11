import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const styles = require('./BreadCrumb.scss');

const checkBreadCrumbs = data => {
  if (data.length) {
    if (data[0]) {
      return true;
    }
  }
  return false;
};

const BreadCrumb = ({ categoryDetails }) => {
  let link = '';
  return (
    <ul className={styles.breadCrumbList}>
      {checkBreadCrumbs(categoryDetails) &&
        categoryDetails.map(item => {
          link += `/${item.url_key}`;
          return (
            <li key={item.id}>
              <Link to={`${link}`}>{item.name}</Link>
            </li>
          );
        })}
    </ul>
  );
};

BreadCrumb.propTypes = {
  categoryDetails: PropTypes.array.isRequired
};
export default BreadCrumb;
