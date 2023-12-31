import React from "react";
import { Link } from "react-router-dom";
import Box from "hometown-components-dev/lib/BoxHtV1";
import Div from "hometown-components-dev/lib/BoxHtV1";
import Text from "hometown-components-dev/lib/TextHtV1";

const styles = require('../Slider.scss');
const star = require('../../../../static/newHomepage/Polygon.svg');

const DBItem = ({ component, data }) => {
  return (
    <Box variant="section.catSliderItem">
          <Div
            className={`${styles.sliderItem}`}
            style={{ padding: '15px', background: 'white', paddingBottom: '0px', paddingTop: '5px' }}
          >
            {/* <Link className={styles.link} to={data.url_key}> */}
            <div className={styles.link}>
              <div style={{ height: '235px' }}>
                <img
                  data-src={data.imgSrc}
                  src={`${data.imgSrc}?blur=30`}
                  alt={data.title}
                  className={styles.curosalImg}
                  style={{ height: '100%', width: '100%', margin: 'auto' }}
                />
              </div>
              <Div className={styles.content8}>
                <Div style={{ display: 'flex', width: '100%' }}>
                  <Div style={{ paddingRight: '10px', width:'60%' }}>
                    <Div className={styles.name}>{data.title}</Div>
                    <Text style={{ color: '#888888', display: 'table-cell' }}>
                      <span className={styles.content8_desc_1}>{data.description}</span>
                    </Text>
                  </Div>
                  <Div style={{ width: '40%', marginTop: '-30px', display: 'flex' }}>
                    <div className={styles.profileImg} style={{ backgroundImage: `url(${data.profileImg})` }}></div>
                  </Div>
                </Div>
              </Div>
              <Div style={{ background: '#F5F5F5', padding: '20px', textAlign: 'center', marginTop: '0px' }}>
                <Div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                  {[...Array(data.review).keys()].map(item => (
                    <img src={star} alt="starr" style={{ margin: '0px 3px 5px', width:'20px', height:'20px' }} key={item} />
                  ))}
                </Div>
                <Div style={{ marginTop: '5px' }}>
                  {data.review}/<span style={{ fontSize: '12px' }}>5</span>
                </Div>
                <Text style={{ color: '#888888', textAlign: 'center', display: 'table-cell' , marginTop: '10px'}}>
                  <span className={styles.content8_desc_2}>{data.reviewDescription}</span>
                </Text>
                <Div
                  style={{ textAlign: 'center', fontWeight: '500', fontSize: '14px', color: 'black', marginTop: '10px' }}
                >
                  - {data.customerName}
                </Div>
              </Div>
            </div>
            {/* </Link> */}
          </Div>
    </Box>
  );
};

export default DBItem;
