import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Helmet from 'react-helmet';
import Div from 'hometown-components-dev/lib/BoxHtV1';
import Section from 'hometown-components-dev/lib/SectionHtV1';
import Text from 'hometown-components-dev/lib/TextHtV1';
import Heading from 'hometown-components-dev/lib/HeadingHtV1';
import mapIcon from '../../../static/map-icon.svg';
import { BASE_IMAGE_URL } from "../../helpers/Constants";

@connect(({ designbuild }) => ({
  seoInfo:
    designbuild.exchangeOffer &&
    designbuild.exchangeOffer &&
    designbuild.exchangeOffer.items,
  validity: designbuild.exchangeOfferCoupon.validity
}))

class ThankYouEoContainer extends Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  };
    render() {
      const { seoInfo, validity } = this.props;
      if(!validity){
        return (
          <Helmet></Helmet>
        )
      }
      return (
        <section>
          <Helmet title={`${(seoInfo && seoInfo.page_title) || ''}`}>
            <meta name="keywords" content={seoInfo && seoInfo.meta_keywords} />
            <meta
              name="description"
              content={seoInfo && seoInfo.meta_description}
            />
            <script
              async
              src="https://www.googletagmanager.com/gtag/js?id=AW-832074530"
            />
            <script>
              {` window.dataLayer = window.dataLayer || [];
               function gtag(){dataLayer.push(arguments);}
               gtag('js', new Date());
               gtag('config', 'AW-832074530'); `}
            </script>
            <script>
              {' gtag(\'event\', \'conversion\', {\'send_to\': \'AW-832074530/j9-7CM6CpqQDEKLm4YwD\'}); '}
            </script>
            {/* Meta Pixel Code  */}
            <script>
              {`fbq('trackSingle', '1024172491523922', 'PageView');`}
            </script>
            <script>
              {`fbq('trackSingleCustom', '1024172491523922', 'HTElead');`}
            </script>
            <noscript>
              {`
              <img
                  alt=""
                  height="1"
                  width="1"
                  style="display:none"
                  src="https://www.facebook.com/tr?id=1024172491523922&ev=HTElead&noscript=1"
              />
            `}
            </noscript>
            {/* <!-- End Meta Pixel Code --> */}
          </Helmet>
          <noscript>
            <img alt="" src="https://ttrk.ringocount.com/pixel?adid=621c50fcfba3a36de041935b" />
          </noscript>
          {/* <LandingPageLogo /> */}
          <img
            src={`${BASE_IMAGE_URL}/media/cms/extras-desktop/Thank-revised.jpg`}
            alt="banner"
            style={{ width: '100%', height: 'auto' }}
          />
          <div
            style={{
              padding: '20px',
              color: 'rgba(51, 51, 51, 0.85)',
              paddingBottom: '50px'
            }}
          >
            <div style={{ padding: '20px' }}>
              <h2
                style={{
                  marginBottom: '25px',
                  textAlign: 'center',
                  fontSize: '28px'
                }}
              >
                THANK YOU FOR REGISTERING
              </h2>
              <h2 style={{ marginBottom: '25px', textAlign: 'center' }}>
                Your exchange voucher code has been sent on your registered email
                ID and mobile number.
              </h2>
              <p
                style={{
                  marginBottom: '25px',
                  textAlign: 'center',
                  fontSize: '20px'
                }}
              >
                Redeem your exchange code at the nearest HomeTown store or online
                on a wide range of sofas, recliners, beds, wardrobes, dining table
                sets, mattress and more
              </p>
              <h2
                style={{
                  marginBottom: '10px',
                  textAlign: 'center',
                  color: '#dc4c3a',
                  marginTop: '40px'
                }}
              >
                Your voucher is valid till {validity}
              </h2>
            </div>
            <div style={{ marginBottom: '5px' }}>
              <h2 style={{ textAlign: 'center' }}>
                <a
                  rel="noopener noreferrer"
                  target="_blank"
                  href="https://www.hometown.in/?utm_source=Landing-Page&utm_medium=Thank-You&utm_campaign=Exchange"
                  style={{
                    textDecoration: 'underline',
                    color: 'rgba(51, 51, 51, 0.85)'
                  }}
                >
                  Click here to redeem code online on hometown.in
                </a>
              </h2>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '40px'
              }}
            >
              <div>
                <a
                  rel="noopener noreferrer"
                  target="_blank"
                  onClick={() => {
                    // if (window && window.fbq) {
                    //   window.fbq("track", "StoreLocatorE&U");
                    // }
                  }}
                  href="https://www.hometown.in/store-locator"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '5px',
                    color: 'rgba(51, 51, 51, 0.85)'
                  }}
                >
                  <img src={mapIcon} alt="Store Locator" />
                  <span>Find a HomeTown store near you.</span>
                </a>
              </div>
              <div style={{ marginBottom: '5px' }}>
                <a
                  rel="noopener noreferrer"
                  target="_blank"
                  href="https://www.hometown.in/promotions"
                  style={{ color: 'rgba(51, 51, 51, 0.85)' }}
                >
                  Exchange T&C's
                </a>
              </div>
            </div>
          </div>
          <img alt="" src="https://ttrk.ringocount.com/pixel?adid=621c50fcfba3a36de041935b" />
        </section>
      );
    }
}
export default ThankYouEoContainer;
