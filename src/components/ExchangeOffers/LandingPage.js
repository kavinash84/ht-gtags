import React, { Component } from "react";
import { connect } from "react-redux";
import Helmet from "react-helmet";
import SeoContent from "hometown-components-dev/lib/SeoContent";
import Container from "hometown-components-dev/lib/ContainerHtV1";
import Form from "./FormComp";
import LeadSuccess from "./SuccessPage";
import LandingPageLogo from "./LandingPageLogo";
import { BASE_IMAGE_URL } from "helpers/Constants";

@connect(({ designbuild }) => ({
  seoInfo:
    designbuild.exchangeOffer &&
    designbuild.exchangeOffer &&
    designbuild.exchangeOffer.items
}))
class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      UI: "Landing",
      email: "",
      mobile: ""
    };
  }

  getUI = () => {
    const { UI } = this.state;
    const { history, seoInfo } = this.props;
    if (UI === "Success") {
      return <LeadSuccess {...this.state} />;
    }
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

        </Helmet>
        <LandingPageLogo />
        <div>
          <img
            src={`${BASE_IMAGE_URL}/media/cms/banner/exchange-offer/header_banner.png`}
            alt="Banner"
            style={{ width: "100%", height: "auto" }}
          />
        </div>
        <div>
          <div style={{ padding: "40px" }}>
            <h2 style={{ color: "#dc4c3a", textAlign: "center" }}>
              REGISTER TO GET FREE EXCHANGE VOUCHERS
            </h2>
          </div>
          <div
            style={{
              padding: "10px 50px",
              display: "flex",
              color: "rgba(51, 51, 51, 0.85)"
            }}
          >
            <div
              style={{ marginBottom: "15px", width: "45%", paddingTop: "15px" }}
            >
              <h3 style={{ marginBottom: "15px", marginLeft: '30px' }}>
                Let old pay for the new in 3 Easy Steps!
              </h3>
              <ul
                style={{
                  padding: "10px 30px 20px",
                  fontSize: "18px",
                  lineHeight: 1.4
                }}
              >
                <li style={{ marginBottom: "5%" }}>
                  <p>
                    Upload a picture of any old sofas, recliners, beds, wardrobes, dining sets, mattress and more.
                  </p>
                </li>
                <li style={{ marginBottom: "5%" }}>
                  <p>Submit your details and get a FREE EXCHANGE VOUCHER.</p>
                </li>
                <li>
                  <p>
                    Visit the nearest HomeTown store or shop online at hometown.in to redeem your exchange voucher code on a wide range of furniture, mattress and much more...
                  </p>
                </li>
              </ul>
              {/* <h4
                className="mt-3 mt-sm-5 mb-5 mb-sm-0"
                style={{
                  color: '#dc1c52',
                  fontWeight: 700,
                  fontSize: '24px',
                  lineHeight: '34px'
                }}
              >
                Exchange opens 14th February 2020 onwards.
              </h4> */}
            </div>
            <div style={{ padding: "0px 10px", width: "55%" }}>
              <Form switchUI={this.switchUI} history={history} />
            </div>
          </div>
        </div>
        <div style={{ borderTop: "1px solid #595959", marginTop: '30px' }}>
          {/* <div className="col-12 mb-2">
            <h2 className="valueTitle">VALUE FOR YOUR OLD PRODUCTS</h2>
          </div> */}
          <div style={{ marginTop: "15px" }}>
            <img
              src={`${BASE_IMAGE_URL}/media/cms/banner/exchange-offer/footer-banner-4.png`}
              alt="BottomBanner"
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        </div>
        {/* SEO Content */}
        {seoInfo && seoInfo.seo_text && (
          <SeoContent>
            <Container>
              <div>
                <div dangerouslySetInnerHTML={{ __html: seoInfo.seo_text }} />
              </div>
            </Container>
          </SeoContent>
        )}
      </section>
    );
  };
  switchUI = ({ email, mobile }) => {
    this.setState({
      UI: "Success",
      email,
      mobile
    });
  };
  render() {
    const UI = this.getUI();
    return UI;
  }
}

export default LandingPage;
