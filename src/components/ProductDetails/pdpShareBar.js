import React from "react";
import PropTypes from "prop-types";
import Div from "hometown-components-dev/lib/BoxHtV1";
import Button from "hometown-components-dev/lib/ButtonHtV1";
import Img from "hometown-components-dev/lib/ImageHtV1";

const fbIcon = require("../../../static/facebook-round.svg");
const emailIcon = require("../../../static/closed-envelope-circle.svg");
const pintIcon = require("../../../static/pinterest-round.svg");
const wappIcon = require("../../../static/whatsapp.svg");
const styles = require("./pdpShareBar.scss");

const ShareBar = ({ url, title, ...rest }) => (
  <Div className={styles.shareBar} {...rest}>
    <ul>
      <li>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`whatsapp://send?text=${url}`}
        >
          <Button
            btnType="link"
            p="5px 3px"
            className={styles.button}
            mr="1rem"
          >
            <Img src={wappIcon} alt="Whatsapp" width="auto" height="100%" backgroundColor="#ffffff" />
          </Button>
        </a>
      </li>
      <li>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`http://www.facebook.com/sharer.php?u=${url}`}
        >
          <Button
            btnType="link"
            p="5px 3px"
            className={styles.button}
            mr="1rem"
          >
            <Img src={fbIcon} alt="Facebook" width="auto" height="100%" backgroundColor="#ffffff" />
          </Button>
        </a>
      </li>
      <li>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`http://pinterest.com/pin/create/button/?url=${url}&description=${title}`}
        >
          <Button
            btnType="link"
            p="5px 3px"
            className={styles.button}
            mr="1rem"
          >
            <Img src={pintIcon} alt="Pinterest" width="auto" height="100%" backgroundColor="#ffffff" />
          </Button>
        </a>
      </li>
      <li>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`mailto:?subject=${title}&body=${url}`}
        >
          <Button btnType="link" p="5px 3px" className={styles.button}>
            <Img src={emailIcon} alt="Email" width="auto" height="100%" backgroundColor="#ffffff" />
          </Button>
        </a>
      </li>
    </ul>
  </Div>
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
