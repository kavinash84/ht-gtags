import React from "react";
import { Link } from "react-router-dom";

const styles = require("../../containers/Category/BreadCrumb.scss");
const arrowForward = require("../../../static/categories/ht-home.svg");

const WarrantyBreadcrumb = () => {
  return (
    <div
      className={styles.breadCrumb_container}
      style={{ background: "#FFF8F4", padding: "12px 7%" }}
    >
      <div className={styles.homeList}>
        <Link to="/">
          <span>
            <img alt="Home" src={arrowForward} />
          </span>
        </Link>
      </div>
      <ul className={styles.breadCrumbList}>
        <li>
          <span style={{ color: "#F47020", marginBottom: "2px" }}>
            Warranty
          </span>
        </li>
      </ul>
    </div>
  );
};

export default WarrantyBreadcrumb;
