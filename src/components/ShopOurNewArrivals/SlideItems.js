import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Image from "hometown-components-dev/lib/ImageHtV1";

class SlideItems extends React.Component {
  render() {
    const { src, url } = this.props;

    return (
      <div>
        <Link
          onClick={() => {
            sessionStorage.setItem("HtscrollPosition", window.pageYOffset);
          }}
          to={url}
        >
          <Image
            mt="15px"
            src={src}
            style={{
              width: "90%",
              alignItems: "center",
              marginLeft: "5%",
              marginRight: "5%"
            }}
          />
        </Link>
      </div>
    );
  }
}
SlideItems.propTypes = {
  src: PropTypes.string.isRequired,

  url: PropTypes.string.isRequired
};
export default SlideItems;
