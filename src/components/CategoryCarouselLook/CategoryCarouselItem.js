import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import Img from "hometown-components-dev/lib/Img";

// import "./CategoryCarousel.css";

class CategoryItem extends React.Component {
  render() {
    const { src, title, url } = this.props;
    return (
      <div style={{ width: "30%" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            // width: "90%",
            margin: "auto"
          }}
        >
          <div
            style={{
              display: "flex",

              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "flex-start"
            }}
          >
            <Link
              to={url}
              onClick={() => {
                sessionStorage.setItem("HtscrollPosition", window.pageYOffset);
              }}
            >
              <Img
                src={src}
                m={5}
                height="auto"
                width="93%"
                style={{ zIndex: 10 }}
              />
              <h3
                style={{
                  fontSize: "20px",
                  width: "90%",
                  margin: " 20px 15px 0 5px",
                  wordSpacing: "3px",
                  letterSpacing: "0.8px",
                  lineHeight: "25px",
                  color: "#383838",
                  fontFamily: "light"
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
