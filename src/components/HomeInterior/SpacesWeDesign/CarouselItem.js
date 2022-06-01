import React from "react";
import { Link } from "react-router-dom";
import Box from "hometown-components-dev/lib/BoxHtV1";
import Div from "hometown-components-dev/lib/BoxHtV1";
import Text from "hometown-components-dev/lib/TextHtV1";
import Heading from 'hometown-components-dev/lib/HeadingHtV1';

const styles = require('../Slider.scss');
// const arrowForward = require('../../../static/newHomepage/newForwardArrow.svg');

const DBItem = ({ component, data }) => {
  return (
    <Box variant="section.catSliderItem">
      <Div
            className={`${styles.sliderItem} ${styles.sliderItemtwo} ${styles.shadow}`}
            style={{
              // paddingRight: '0px',
              backgroundColor:'white',
              padding: '20px 0px',
              height: '320px',
              margin: '10px 8px'
              // pointerEvents: ['/modular-wardrobe'].includes(data.url_key) ? 'none' : ''
            }}
          >
            {/* <Link
              className={styles.link}
              to={data.url_key}
              onClick={() => {
                sessionStorage.setItem('scrollPosition', window.pageYOffset);
              }}
            > */}
              <div style={{ height: '150px' }}>
                <img
                  data-src={data.imgSrc}
                  alt={data.title}
                  className={styles.curosalImg}
                  style={{ height: '100%', width: '90%', margin: 'auto'}}
                />
              </div>
              <Div className={styles.content4}>
                <Div style={{fontSize: '16px', textAlign: 'center',fontWeight: '600',margin:'10px 0'}} >{data.title}</Div>
                <div style={{ display: 'table-cell' }}>
                  <p style={{color:'#999999', textAlign: 'center', fontSize:'13px', lineHeight:'20px',margin:'10px 0', padding:'0 10px'}}>{data.description}</p>
                </div>
                {/* <Heading style={{textAlign:'left'}} fontSize="14px" fontFamily="regular" color="black" mt="20px">
                  KNOW MORE */}
                  {/* <img
                    style={{
                      display: 'inline',
                      marginLeft: '-8px',
                      height: '10px',
                      width: '40px'
                    }}
                    src={}
                    alt="Arrow"
                  /> */}
                {/* </Heading> */}
              </Div>
            {/* </Link> */}
          </Div>
    </Box>
  );
};

export default DBItem;
