import React from "react";
import { Link } from "react-router-dom";

const styles = require("./breadcrumb.scss");
const arrowForward = require("../../../static/categories/ht-home.svg");

const PackageBreadCrumb = ({ blogsTitle }) => {
  return (
    <div className={styles.breadcrumbListContainer}>
      <div className={styles.homeListmain}>
        <Link to="/">
          <span>
            <img alt="Home" src={arrowForward} />
          </span>
        </Link>
      </div>
      <ul className={styles.breadCrumbListMain}>
        <li>
          <Link to={`/blog`}>
            <span style={{ color: "#F47020", marginBottom: "2px" }}>Blogs</span>
          </Link>
        </li>
        {blogsTitle ? (
          <li>
            <span style={{ color: "#F47020", marginBottom: "2px" }}>
              {blogsTitle}
            </span>
          </li>
        ) : null}
      </ul>
    </div>
  );
};

export default PackageBreadCrumb;
