import React, { Component } from "react";
import Helmet from "react-helmet";
import { connect } from "react-redux";
import landingMainSlider from "../../../static/success-banner.jpg";
import mapIcon from "../../../static/map-icon.svg";
import LandingPageLogo from "./LandingPageLogo";

@connect(({ designbuild }) => ({
  seoInfo:
    designbuild.exchangeOffer &&
    designbuild.exchangeOffer &&
    designbuild.exchangeOffer.items
}))
class SuccessPage extends Component {
  componentDidMount() {
    // if (window && window.dataLayer) {
    //   window.dataLayer.push({
    //     action: 'Page View',
    //     category: 'Exchange Offers',
    //     label: 'Track'
    //   });
    // }
    // if (window && window.fbq) {
    //   window.fbq("track", "SubscribeE&U");
    // }
  }
  render() {
    const { seoInfo } = this.props;
    return (
      <section>
        <Helmet title={`${(seoInfo && seoInfo.page_title) || ""}`}>
          <meta name="keywords" content={seoInfo && seoInfo.meta_keywords} />
          <meta
            name="description"
            content={seoInfo && seoInfo.meta_description}
          />
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=AW-832074530"
          ></script>
          <script>
            {` window.dataLayer = window.dataLayer || [];
               function gtag(){dataLayer.push(arguments);}
               gtag('js', new Date());

               gtag('config', 'AW-832074530'); `}
          </script>
          <script>
            {` gtag('event', 'conversion', {'send_to': 'AW-832074530/j9-7CM6CpqQDEKLm4YwD'}); `}
          </script>
          <script type="text/javascript">
            {`
             !function(f,b,e,v,n,t,s)
             {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
             n.callMethod.apply(n,arguments):n.queue.push(arguments)};
             if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
             n.queue=[];t=b.createElement(e);t.async=!0;
             t.src=v;s=b.getElementsByTagName(e)[0];
             s.parentNode.insertBefore(t,s)}(window, document,'script',
             'https://connect.facebook.net/en_US/fbevents.js');
             fbq('init', '1024172491523922');
             fbq('track', 'Lead'); 
            `}
          </script>
        </Helmet>
        <noscript>
          <img
            height="1"
            width="1"
            style="display:none"
            src="https://www.facebook.com/tr?id=171725297723956&ev=PageView&noscript=1"
          />
        </noscript>
        <LandingPageLogo />
        <img
          src={landingMainSlider}
          alt="banner"
          style={{ width: "100%", height: "auto" }}
        />
        <div
          style={{
            background: "hsl(0,0%,80%)",
            padding: "20px",
            color: "rgba(51, 51, 51, 0.85)",
            paddingBottom: "50px"
          }}
        >
          <div style={{ padding: "20px" }}>
            <h2
              style={{
                marginBottom: "25px",
                textAlign: "center",
                fontSize: "28px"
              }}
            >
              THANK YOU FOR REGISTERING IN OUR EXCHANGE PROGRAM.
            </h2>
            <h2 style={{ marginBottom: "25px", textAlign: "center" }}>
              Your voucher code has been sent on your registered email ID and
              mobile number
            </h2>
            <p
              style={{
                marginBottom: "25px",
                textAlign: "center",
                fontSize: "20px"
              }}
            >
              Visit the nearest HomeTown store and use your exchange voucher
              code to redeem your EXCHANGE VOUCHER against our new collection of
              furniture, mattress, homeware, decor, furnishings and much more…
            </p>
            <h2
              style={{
                marginBottom: "10px",
                textAlign: "center",
                color: "#dc4c3a"
              }}
            >
              Your voucher is valid till 31st Mar'22
            </h2>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ marginBottom: "5px" }}>
              <p>
                To know more give a missed call - <b>022-41621001</b>
              </p>
            </div>
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
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "5px",
                  color: "rgba(51, 51, 51, 0.85)"
                }}
              >
                <img src={mapIcon} alt="Store Locator" />
                <span>Store Locator</span>
              </a>
            </div>
            <div style={{ marginBottom: "5px" }}>
              <a
                rel="noopener noreferrer"
                target="_blank"
                href="https://www.hometown.in/promotions"
                style={{ color: "rgba(51, 51, 51, 0.85)" }}
              >
                Exchange T&C's
              </a>
            </div>
          </div>
        </div>
        <img src="https://ttrk.ringocount.com/pixel?adid=621c50fcfba3a36de041935b" />
      </section>
    );
  }
}

export default SuccessPage;