import React from "react";
import { Link } from "react-router-dom";

const styles = require("./breadcrumb.scss");
const arrowForward = require("../../../static/categories/ht-home.svg");

const GiftingBreadCrumb = ({ isPacakge }) => {
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
          <Link to={`/gifting`}>
            <span style={{ color: "#F47020", marginBottom: "2px" }}>
              Gifting Ideas
            </span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default GiftingBreadCrumb;
