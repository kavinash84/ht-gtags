import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const styles = require("./BreadCrumb.scss");

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

const BreadCrumb = ({ categoryDetails, handleCategoryClick }) => {
  let link = "";
  return (
    <div className={styles.breadCrumb_container}>
      <div className={styles.homeList}>
        <Link to="/">
          <span>Home</span>
        </Link>
      </div>
      <ul
        itemScope
        itemType="http://schema.org/BreadcrumbList"
        className={styles.breadCrumbList}
      >
        {categoryDetails
          .filter(details => Object.keys(details).length > 0)
          .map((item, index) => {
            if (item) {
              link = `/${item.url_key}`;
              return (
                <li
                  key={item.id}
                  itemProp="itemListElement"
                  itemType="http://schema.org/ListItem"
                  itemScope
                >
                  <Link
                    onClick={handleCategoryClick}
                    itemProp="item"
                    to={`/${formatLink(link)}`}
                  >
                    <span itemProp="name">{item.name}</span>
                    <meta itemProp="position" content={index + 1} />
                  </Link>
                </li>
              );
            }
            return null;
          })}
      </ul>
    </div>
  );
};

BreadCrumb.propTypes = {
  categoryDetails: PropTypes.array.isRequired,
  handleCategoryClick: PropTypes.func.isRequired
};
export default BreadCrumb;
