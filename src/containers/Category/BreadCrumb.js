import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const styles = require('./BreadCrumb.scss');

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

const BreadCrumb = ({ urlKey, name, handleCategoryClick }) => {
  const link = `/${urlKey}`;
  return (
    <ul itemScope itemType="http://schema.org/BreadcrumbList" className={styles.breadCrumbList}>
      <li key="home" itemProp="itemListElement" itemType="http://schema.org/ListItem" itemScope>
        <Link itemProp="item" to="/">
          <span itemProp="name">Home</span>
          <meta itemProp="position" content={1} />
        </Link>
      </li>
      <li itemProp="itemListElement" itemType="http://schema.org/ListItem" itemScope>
        <Link onClick={handleCategoryClick} itemProp="item" to={`/${formatLink(link)}`}>
          <span itemProp="name">{name}</span>
          <meta itemProp="position" content="2" />
        </Link>
      </li>
    </ul>
  );
};

BreadCrumb.propTypes = {
  handleCategoryClick: PropTypes.func.isRequired,
  urlKey: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};
export default BreadCrumb;
