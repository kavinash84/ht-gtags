import React from "react";
import { Link } from "react-router-dom";

const styles = require("./breadcrumb.scss");
const arrowForward = require("../../../static/categories/ht-home.svg");

const PackageBreadCrumb = ({ isPacakge }) => {
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
          <Link to={`/packages`}>
            <span style={{ color: "#F47020", marginBottom: "2px" }}>
              Packages
            </span>
          </Link>
        </li>
        {isPacakge ? (
          <li>
            <span style={{ color: "#F47020", marginBottom: "2px" }}>
              Package
            </span>
          </li>
        ) : null}
      </ul>
    </div>
  );
};

export default PackageBreadCrumb;
