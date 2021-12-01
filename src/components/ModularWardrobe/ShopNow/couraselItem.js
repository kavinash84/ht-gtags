import React from "react";
import { Link } from "react-router-dom";
import Box from "hometown-components-dev/lib/BoxHtV1";
import Div from "hometown-components-dev/lib/BoxHtV1";
import Text from "hometown-components-dev/lib/TextHtV1";

const styles = require('../Slider.scss');
class DBItem extends React.Component {
  componentDidMount() {
    this.handleScrollPosition();
  }

  handleScrollPosition = () => {
    const scrollPosition = sessionStorage.getItem("WardrobescrollPosition");
    if (scrollPosition) {
      window.scrollTo(0, parseInt(scrollPosition));
      setTimeout(function() {
        sessionStorage.removeItem("WardrobescrollPosition");
      }, 800);
    }
  }
  render() { 
    const {data} = this.props;
    return (
      <Box variant="section.catSliderItem">
      <Div className={`${styles.sliderItem}`}>
        <div className={styles.link}>
        <Link to={data.url_key}
        onClick={() => {
              sessionStorage.setItem("WardrobescrollPosition", window.pageYOffset);
            }}>
          <div style={{ height: "250px" }}>
            <img
              src={data.imgSrc}
              alt={data.title}
              className={styles.curosalImg}
              style={{ height: "100%", width: "100%", margin: "0 10px"}}
            />
          </div>
         </Link>
          <Div className={styles.content3}>
            <Text style={{ fontSize: "18px", fontWeight: "600", textAlign:'left' }}>
              {data.title}
            </Text>
            <p className={styles.contnet3_description}>{data.description}</p>
          </Div>
        </div>
      </Div>
    </Box>
    );
  }
}
 
export default DBItem ;