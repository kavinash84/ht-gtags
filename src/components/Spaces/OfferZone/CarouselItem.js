import React from "react";
import { Link } from "react-router-dom";
import Box from "hometown-components-dev/lib/BoxHtV1";
import Div from "hometown-components-dev/lib/BoxHtV1";
// import Text from "hometown-components-dev/lib/TextHtV1";
import Heading from "hometown-components-dev/lib/HeadingHtV1";

const styles = require("../Slider.scss");

class DBItem extends React.Component {
  componentDidMount() {
    this.handleScrollPosition();
  }

  handleScrollPosition = () => {
    const scrollPosition = sessionStorage.getItem("SpacesScrollPosition");
    if (scrollPosition) {
      window.scrollTo(0, parseInt(scrollPosition));
      setTimeout(function() {
        sessionStorage.removeItem("SpacesScrollPosition");
      }, 800);
    }
  };
  render() {
    const { component, data } = this.props;
    return (
      <div>
        {data.url_key ? (
          <Box variant="section.catSliderItem" style={{ padding: "20px 20px" }}>
            <Div
              className={`${styles.sliderItem} ${styles.sliderItemtwo}`}
              style={{
                // paddingRight: '0px',
                backgroundColor: "#ffffff",
                padding: "0px 0px 0px",

                marginTop: "auto"

                // pointerEvents: ['/modular-wardrobe'].includes(data.url_key) ? 'none' : ''
              }}
            >
              <Link
                to={data.url_key}
                onClick={() => {
                  sessionStorage.setItem(
                    "SpacesScrollPosition",
                    window.pageYOffset
                  );
                }}
              >
                <div>
                  <img
                    src={data.imgSrc}
                    alt="offers"
                    style={{
                      height: "auto",
                      width: "100%",
                      margin: "auto",
                      objectFit: "contain"
                    }}
                  />
                </div>
              </Link>
            </Div>
          </Box>
        ) : (
          <Box variant="section.catSliderItem" style={{ padding: "20px 20px" }}>
            <Div
              className={`${styles.sliderItem} ${styles.sliderItemtwo}`}
              style={{
                // paddingRight: '0px',
                backgroundColor: "#ffffff",
                padding: "0px 0px 0px",
                marginTop: "auto"

                // pointerEvents: ['/modular-wardrobe'].includes(data.url_key) ? 'none' : ''
              }}
            >
              <div>
                <Link
                  to={data.url_key}
                  onClick={() => {
                    sessionStorage.setItem(
                      "SpacesScrollPosition",
                      window.pageYOffset
                    );
                  }}
                >
                  <div>
                    <img
                      src={data.image}
                      alt={data.title}
                      style={{
                        height: "auto",
                        width: "100%",
                        margin: "auto",
                        objectFit: "contain"
                      }}
                    />
                  </div>
                  <Div></Div>
                </Link>
              </div>
            </Div>
          </Box>
        )}
      </div>
    );
  }
}

export default DBItem;
