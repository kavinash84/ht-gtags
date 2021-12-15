import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
/**
 * Components
 */
import Ul from "hometown-components-dev/lib/UlHtV1";
import Li from "hometown-components-dev/lib/LiHtV1";
import Text from "hometown-components-dev/lib/TextHtV1";

const styles = require("./BreadCrumb.scss");

const BreadCrumb = ({ breadcrumbs }) => {
  let link = "";
  return (
    <div className={styles.breadCrumb_container}>
      <div className={styles.homeList}>
        <Link to="/">
          <span>Home</span>
        </Link>
      </div>
      <Ul
        itemScope
        itemType="http://schema.org/BreadcrumbList"
        className={styles.breadCrumbPdp}
      >
        {breadcrumbs.map((item, index) => {
          link += `/${item.urlkey}`;
          return (
            <Li
              key={String(index)}
              itemProp="itemListElement"
              itemType="http://schema.org/ListItem"
              itemScope
            >
              <Link itemProp="item" to={`${link}`}>
                <Text itemProp="name">
                  {breadcrumbs.length - 1 !== index ? (
                    item.name
                  ) : (
                    <strong>{item.name}</strong>
                  )}
                </Text>
                <meta itemProp="position" content={index + 1} />
              </Link>
            </Li>
          );
        })}
      </Ul>
    </div>
  );
};
BreadCrumb.defaultProps = {
  breadcrumbs: []
};
BreadCrumb.propTypes = {
  breadcrumbs: PropTypes.array
};
export default BreadCrumb;
