import React, { Component } from 'react';
import Div from 'hometown-components-dev/lib/BoxHtV1';
import Heading from 'hometown-components-dev/lib/HeadingHtV1';
import Text from 'hometown-components-dev/lib/TextHtV1';
import { Link } from 'react-router-dom';

const arrowForward = require('../../../static/newHomepage/newForwardArrow.svg');
const star = require('../../../static/categories/star.svg');
const styles = require('./Slider.scss');

class ShopbyCatItem extends Component {
  getDetails = (component, data) => {
    switch (component) {
      case 3:
        return (
          <Div className={`${styles.sliderItem}`}>
            <div className={styles.link}>
              <div style={{ height: '155px' }}>
                <img
                  src={data.imgSrc}
                  alt={data.title}
                  className={styles.curosalImg}
                  style={{ height: '100%', width: 'auto', margin: 'auto' }}
                />
              </div>

              <Div className={styles.content3}>
                <Text style={{ fontSize: '16px', fontWeight: '600' }}>{data.title}</Text>
                <p className={styles.contnet3_description}>{data.description}</p>
              </Div>
            </div>
          </Div>
        );
      case 4:
        return (
          <Div
            className={`${styles.sliderItem}`}
            style={{
              paddingRight: '0px',
              // pointerEvents: ['/modular-wardrobe'].includes(data.url_key) ? 'none' : ''
            }}
          >
            <Link
              className={styles.link}
              to={data.url_key}
              onClick={() => {
                sessionStorage.setItem('scrollPosition', window.pageYOffset);
              }}
            >
              <div style={{ height: '200px' }}>
                <img
                  src={data.imgSrc}
                  alt={data.title}
                  className={styles.curosalImg}
                  style={{ height: '100%', width: 'auto', margin: 'auto' }}
                />
              </div>
              <Div className={styles.content4}>
                <Div className={styles.name}>{data.title}</Div>
                <div style={{ display: 'table-cell' }}>
                  <p className={styles.content4_description}>{data.description}</p>
                </div>
                <Heading ta="center" fontSize="13px" fontFamily="regular" color="black" mt="10px">
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
        );
      case 7:
        return (
          <Div className={`${styles.sliderItem}`} style={{ padding: '15px', background: 'white' }}>
            {/* <Link className={styles.link} to={data.url_key}> */}
            <div className={styles.link}>
              <div style={{ height: '180px' }}>
                <img
                  src={data.imgSrc}
                  alt={data.title}
                  className={styles.curosalImg}
                  style={{ height: '100%', width: 'auto', margin: 'auto' }}
                />
              </div>
              <Div className={styles.content7}>
                <Div className={styles.name}>{data.title}</Div>
                <div style={{ display: 'table-cell' }}>
                  <p className={styles.content7_description}>{data.description}</p>
                </div>
              </Div>
            </div>
            {/* </Link> */}
          </Div>
        );
      case 8:
        return (
          <Div
            className={`${styles.sliderItem}`}
            style={{ padding: '15px', background: 'white', paddingBottom: '0px', paddingTop: '5px' }}
          >
            {/* <Link className={styles.link} to={data.url_key}> */}
            <div className={styles.link}>
              <div style={{ height: '235px' }}>
                <img
                  src={data.imgSrc}
                  alt={data.title}
                  className={styles.curosalImg}
                  style={{ height: '100%', width: 'auto', margin: 'auto' }}
                />
              </div>
              <Div className={styles.content8}>
                <Div style={{ display: 'flex', width: '100%' }}>
                  <Div style={{ paddingRight: '10px' }}>
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
              <Div style={{ background: '#F5F5F5', padding: '20px', textAlign: 'center', marginTop: '5px' }}>
                <Div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                  {[...Array(data.review).keys()].map(item => (
                    <img src={star} alt="starr" style={{ margin: '5px 3px' }} key={item} />
                  ))}
                </Div>
                <Div style={{ marginTop: '5px' }}>
                  {data.review}/<span style={{ fontSize: '12px' }}>5</span>
                </Div>
                <Text style={{ color: '#888888', textAlign: 'center', display: 'table-cell' }}>
                  <span className={styles.content8_desc_2}>{data.reviewDescription}</span>
                </Text>
                <Div
                  style={{ textAlign: 'center', fontWeight: '500', fontSize: '14px', color: 'black', marginTop: '5px' }}
                >
                  - {data.customerName}
                </Div>
              </Div>
            </div>
            {/* </Link> */}
          </Div>
        );
      case 11:
        return (
          <Div className={`${styles.finacesliderItem}`}>
            <Div style={{ backgroundColor: 'white', padding: '20px', textAlign: 'left' }}>
              {/* <Link className={styles.link} to={data.url_key}> */}
              <div className={styles.link}>
                <img src={data.imgSrc} alt={data.title} style={{ marginTop: '15px' }} />
                <Div style={{ marginTop: '20px' }}>
                  <Text style={{ fontWeight: 600, color: '#575757', lineHeight: 1.3, margin: '0px' }}>
                    {data.title}
                  </Text>
                  <div
                    style={{ lineHeight: 1.3, color: '#575757', margin: '0px', maxHeight: '37px', overflow: 'hidden' }}
                  >
                    {data.description}
                  </div>
                </Div>
              </div>
              {/* </Link> */}
            </Div>
          </Div>
        );
      case 13:
        return (
          <Div className={`${styles.sliderItem}`}>
            {/* <Link className={styles.link} to={data.url_key}> */}
            <div className={styles.link}>
              <div style={{ height: '105px' }}>
                <img src={data.imgSrc} alt={data.title} style={{ height: '100%', width: 'auto', margin: 'auto' }} />
              </div>
              <Div style={{ fontSize: '14px', fontWeight: 500, textAlign: 'left', marginTop: '10px' }}>
                {data.title}
              </Div>
            </div>
            {/* </Link> */}
          </Div>
        );
      default:
        return (
          <Div className={`${styles.sliderItem}`}>
            <Link
              className={styles.link}
              to={data.url_key}
              onClick={() => {
                sessionStorage.setItem('scrollPosition', window.pageYOffset);
              }}
            >
              {/* <div
              className={styles.link}
              onClick={() => {
                history.push(data.url_key);
              }}
            > */}
              <div style={{ height: '145px' }}>
                <img
                  src={data.imgSrc}
                  alt={data.title}
                  className={styles.curosalImg}
                  style={{ height: '100%', width: 'auto', margin: 'auto' }}
                />
              </div>
              <Div className={styles.content}>{data.title}</Div>
              {/* </div> */}
            </Link>
          </Div>
        );
    }
  };

  componentDidMount() {
    this.handleScrollPosition();
  }

  handleScrollPosition = () => {
    const scrollPosition = sessionStorage.getItem('scrollPosition');
    if (scrollPosition) {
      window.scrollTo(0, parseInt(scrollPosition));
      setTimeout(function() {
        sessionStorage.removeItem('scrollPosition');
      }, 2000);
    }
  };

  render() {
    const { component, data } = this.props;
    return <div>{this.getDetails(component, data)}</div>;
  }
}

export default ShopbyCatItem;
