import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const styles = require('./BreadCrumb.scss');
const arrowForward = require('../../../static/categories/ht-home.svg');

const cleanTail = url => {
  if (url[url.length - 1] === '/') {
    return url.substring(0, url.length - 1);
  }
  return url;
};
const formatLink = url => {
  const paramLink = url.split('/').filter(z => z !== '');
  if (paramLink.length >= 4) {
    paramLink.splice(1, 1);
  }
  const newLink = paramLink.join('/');
  const sanitizedUrl = cleanTail(newLink);
  const newURL = sanitizedUrl.replace('catalog/', '');
  return newURL;
};

const FurnitureBreadCrumb = ({ urlKey, name }) => {
  let link = `/${urlKey}`;
  return (
    <ul itemScope itemType="http://schema.org/BreadcrumbList" className={styles.breadCrumbList}>
      <li key="home" itemProp="itemListElement" itemType="http://schema.org/ListItem" itemScope>
        <Link itemProp="item" to="/">
          <span itemProp="name">
            <img alt="Home" src={arrowForward} />
          </span>
          <meta itemProp="position" content={1} />
        </Link>
      </li>
      <li itemProp="itemListElement" itemType="http://schema.org/ListItem" itemScope>
        <Link itemProp="item" to={`/${formatLink(link)}`}>
          <span itemProp="name" style={{ color: '#F47020', marginBottom: '2px' }}>
            {name}
          </span>
          <meta itemProp="position" content={2} />
        </Link>
      </li>
    </ul>
  );
};

FurnitureBreadCrumb.propTypes = {
  handleCategoryClick: PropTypes.func.isRequired
};
export default FurnitureBreadCrumb;
