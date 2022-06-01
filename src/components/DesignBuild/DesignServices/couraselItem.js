import React from "react";
import { Link } from "react-router-dom";
import Box from "hometown-components-dev/lib/BoxHtV1";
import Div from "hometown-components-dev/lib/BoxHtV1";
import Text from "hometown-components-dev/lib/TextHtV1";
import Heading from 'hometown-components-dev/lib/HeadingHtV1';

const styles = require('../Slider.scss');
const arrowForward = require('../../../../static/newHomepage/newForwardArrow.svg');

class DBItem extends React.Component {

  componentDidMount() {
    this.handleScrollPosition();
  }

  handleScrollPosition = () => {
    const scrollPosition = sessionStorage.getItem("DesignBuildscrollPosition");
    if (scrollPosition) {
      window.scrollTo(0, parseInt(scrollPosition));
      setTimeout(function() {
        sessionStorage.removeItem("DesignBuildscrollPosition");
      }, 800);
    }
  }

  render() { 
    const {data} = this.props;
    return (
<Box variant="section.catSliderItem">
      <Div
            className={`${styles.sliderItem}`}
            style={{
              // paddingRight: '0px',
              backgroundColor:'#F5F5F5',
              padding: '20px 0px',
              height: '400px'
              // pointerEvents: ['/modular-wardrobe'].includes(data.url_key) ? 'none' : ''
            }}
          >
            <Link
              className={styles.link}
              to={data.url_key}
              onClick={() => {
              sessionStorage.setItem("DesignBuildscrollPosition", window.pageYOffset);
            }}
            >
              <div style={{ height: '220px' }}>
                <img
                  data-src={data.imgSrc}
                  alt={data.title}
                  className={styles.curosalImg}
                  style={{ height: '100%', width: '90%', margin: 'auto'}}
                />
              </div>
              <Div className={styles.content4} style={{paddingLeft:'5%'}}>
                <Div style={{fontSize: '18px', textAlign: 'left'}} className={styles.name}>{data.title}</Div>
                <div style={{ display: 'table-cell' }}>
                  <p className={styles.content4_description}>{data.description}</p>
                </div>
                <Heading style={{textAlign:'left',  fontWeight: '600', fontSize:'12px'}} fontSize="12px" fontFamily="regular" color="black" mt="20px">
                  KNOW MORE
                  <img
                    style={{
                      display: 'inline',
                      marginLeft: '-8px',
                      height: '10px',
                      width: '40px'
                    }}
                    src={arrowForward}
                    alt="Arrow"
                  />
                </Heading>
              </Div>
            </Link>
          </Div>
    </Box>
    );
  }
}
 
export default DBItem;