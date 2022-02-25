import React, { Component } from "react";
import Helmet from "react-helmet";
import landingMainSlider from "../../../static/success-banner.jpg";
import mapIcon from "../../../static/map-icon.svg";
import LandingPageLogo from "./LandingPageLogo";

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
    return (
      <section>
        <Helmet title={`Exchange-offeres`}>
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
        </Helmet>
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
      </section>
    );
  }
}

export default SuccessPage;
