import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import Img from "hometown-components-dev/lib/Img";

// import "./CategoryCarousel.css";

class CategoryItem extends React.Component {
  render() {
    const { src, title, url } = this.props;
    return (
      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <div
            style={{
              width: "410px",
              display: "flex",
              height: "360px",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "flex-start"
            }}
          >
            <Link
              to={url}
              onClick={() => {
                sessionStorage.setItem("GetThelookscroll", window.pageYOffset);
              }}
            >
              <Img
                src={src}
                m={5}
                height="auto"
                width="90%"
                style={{ zIndex: 10 }}
              />
              <h3
                style={{
                  fontSize: "16px",
                  fontWeight: "300",
                  margin: " 20px 15px 0 5px",
                  wordSpacing: "2px",
                  letterSpacing: "0.6px",
                  lineHeight: "18px",
                  color: "black"
                }}
                className="get-the-look-titleOne"
              >
                {title}
              </h3>
            </Link>
          </div>
        </div>
      </div>
    );
  }
  // componentDidMount() {
  //   this.handleScrollPosition();
  // }
  // handleScrollPosition = () => {
  //   const scrollPosition = sessionStorage.getItem("GetThelookscroll");
  //   if (scrollPosition) {
  //     window.scrollTo(0, parseInt(scrollPosition));
  //     setTimeout(function() {
  //       sessionStorage.removeItem("GetThelookscroll");
  //     }, 2000);
  //   }
  // };
}
CategoryItem.propTypes = {
  src: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
};
export default CategoryItem;
