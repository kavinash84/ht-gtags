import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const styles = require("./BreadCrumb.scss");
const homelogo = require('../../../static/categories/ht-home.svg');

const cleanTail = url => {
  if (url[url.length - 1] === "/") {
    return url.substring(0, url.length - 1);
  }
  return url;
};
const formatLink = url => {
  const paramLink = url.split("/").filter(z => z !== "");
  if (paramLink.length >= 4) {
    paramLink.splice(1, 1);
  }
  const newLink = paramLink.join("/");
  const sanitizedUrl = cleanTail(newLink);
  const newURL = sanitizedUrl.replace("catalog/", "");
  return newURL;
};

const BreadCrumb = ({ urlKey, name, handleCategoryClick }) => {
  const link = `/${urlKey}`;
  return (
    <div className={styles.breadCrumb_container}>
      <div className={styles.homeList}>
        <Link to="/">
          <span><img alt="Home" src={homelogo} /></span>
        </Link>
      </div>
      <ul
        itemScope
        itemType="http://schema.org/BreadcrumbList"
        className={styles.breadCrumbList}
      >
        {/* <li key="home" itemProp="itemListElement" itemType="http://schema.org/ListItem" itemScope>
        <Link itemProp="item" to="/">
          <span itemProp="name">Home</span>
          <meta itemProp="position" content={1} />
        </Link>
      </li> */}
        <li
          itemProp="itemListElement"
          itemType="http://schema.org/ListItem"
          itemScope
        >
          <Link
            onClick={handleCategoryClick}
            itemProp="item"
            to={`/${formatLink(link)}`}
          >
            <span itemProp="name">{name}</span>
            <meta itemProp="position" content="1" />
          </Link>
        </li>
      </ul>
    </div>
  );
};

BreadCrumb.propTypes = {
  handleCategoryClick: PropTypes.func.isRequired,
  urlKey: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};
export default BreadCrumb;
