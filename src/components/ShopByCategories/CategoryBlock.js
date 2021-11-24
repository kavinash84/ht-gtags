import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

/* ====== Components ====== */
// import BoxHtV1 from "hometown-components-dev/lib/Div";
// import Flex from 'hometown-components/lib/Flex';
import TextHtV1 from "hometown-components-dev/lib/TextHtV1";
import Img from "hometown-components-dev/lib/Img";

class CategoryBlock extends React.Component {
  render() {
    const { src, title, to, index } = this.props;
    return (
      <div key={index} style={{ width: "14%", margin: "25px 5px 5px 5px" }}>
        <Link
          to={to}
          onClick={() => {
            sessionStorage.setItem(
              "ShopByCatscrollPosition",
              window.pageYOffset
            );
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center"
            }}
            height={96}
            width={1}
            py={0}
          >
            <Img
              border="none"
              src={src}
              alt={title}
              m={5}
              height="auto"
              width="90%"
              style={{ zIndex: 10 }}
            />
            <div
              mt="-58px"
              style={{
                backgroundColor: "#F2F2F2",
                position: "relative",
                top: "-115px",
                padding: "28% 48%",
                borderRadius: "5px"
              }}
            />
            <TextHtV1 fontSize="18px" color="label" mt="-95px" mb="70px">
              {title}
            </TextHtV1>
          </div>
        </Link>
      </div>
    );
  }
  componentDidMount() {
    this.handleScrollPosition();
  }

  handleScrollPosition = () => {
    const scrollPosition = sessionStorage.getItem("ShopByCatscrollPosition");
    if (scrollPosition) {
      window.scrollTo(0, parseInt(scrollPosition));
      setTimeout(function() {
        sessionStorage.removeItem("ShopByCatscrollPosition");
      }, 2000);
    }
  };
}
CategoryBlock.propTypes = {
  src: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired
};
export default CategoryBlock;
