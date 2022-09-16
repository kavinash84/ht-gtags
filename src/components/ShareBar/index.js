import React from "react";
import PropTypes from "prop-types";
import BoxHtV1 from "hometown-components-dev/lib/BoxHtV1";
import ButtonHtV1 from "hometown-components-dev/lib/ButtonHtV1";
import ImageHtV1 from "hometown-components-dev/lib/ImageHtV1";

const fbIcon = require("../../../static/facebook-round.svg");
const emailIcon = require("../../../static/closed-envelope-circle.svg");
const pintIcon = require("../../../static/pinterest-round.svg");
const styles = require("./ShareBar.scss");

const ShareBar = ({ url, title, ...rest }) => (
  <BoxHtV1 className={styles.shareBar} {...rest}>
    <ul>
      <li>
        <a
          target="_blank"
          rel="noopener"
          href={`http://www.facebook.com/sharer.php?u=${url}`}
        >
          <ButtonHtV1 btnType="link" padding="5px 3px">
            <ImageHtV1 src={fbIcon} alt="Facebook" width="24px" />
          </ButtonHtV1>
        </a>
      </li>
      <li>
        <a
          target="_blank"
          rel="noopener"
          href={`http://pinterest.com/pin/create/button/?url=${url}&description=${title}`}
        >
          <ButtonHtV1 btnType="link" padding="5px 3px">
            <ImageHtV1 src={pintIcon} alt="Pinterest" width="24px" />
          </ButtonHtV1>
        </a>
      </li>
      <li>
        <a
          target="_blank"
          rel="noopener"
          href={`mailto:?subject=${title}&body=${url}`}
        >
          <ButtonHtV1 btnType="link" padding="5px 3px">
            <ImageHtV1 src={emailIcon} alt="Email" width="24px" />
          </ButtonHtV1>
        </a>
      </li>
    </ul>
  </BoxHtV1>
);

ShareBar.defaultProps = {
  title: "",
  url: ""
};

ShareBar.propTypes = {
  title: PropTypes.string,
  url: PropTypes.string
};

export default ShareBar;
