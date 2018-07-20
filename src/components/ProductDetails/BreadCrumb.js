import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const styles = require('./BreadCrumb.scss');

const BreadCrumb = ({ categoryDetails }) => {
  let link = '';
  return (
    <ul className={styles.breadCrumbList}>
      {categoryDetails.map(item => {
        if (item) {
          link += `/${item.url_key}`;
          return (
            <li key={item.id}>
              <Link to={`${link}`}>{item.name}</Link>
            </li>
          );
        }
        return <div />;
      })}
    </ul>
  );
};

BreadCrumb.propTypes = {
  categoryDetails: PropTypes.array.isRequired
};
export default BreadCrumb;
