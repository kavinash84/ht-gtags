import React, { Component } from "react";
import { connect } from "react-redux";
import ResponsiveModal from "components/Modal";
import Section from "hometown-components-dev/lib/SectionHtV1";
import Container from "hometown-components-dev/lib/ContainerHtV1";
import { PINCODE } from "helpers/Constants";
import Helmet from "react-helmet";
import SeoContent from "hometown-components-dev/lib/SeoContent";
import SlickSlider from "../SlickSlider";

import DeliveryAddress from "./deliveryAddress";
import PackagePincode from "./packagePincode";
import PackageBreadCrumb from "./packageBreadcrumb";

const BreadCrumpstyles = require("./breadcrumb.scss");
const styles = require("./index.scss");

const arrowForward = require("../../../static/onelacPackage/onelacTopBanner.png");
const PackageBanner = require("../../../static/onelacPackage/onelacTopBanner.png");

const nextArrow = require("../../../static/new-home/roundedArrowRight.svg");
const previousArrow = require("../../../static/new-home/roundedArrowLeft.svg");

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <React.Fragment>
      <img
        className={className}
        src={nextArrow}
        onClick={onClick}
        style={{ ...style, width: "15px" }}
      />
    </React.Fragment>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <React.Fragment>
      <img
        className={className}
        src={previousArrow}
        onClick={onClick}
        style={{ ...style, width: "15px" }}
      />
    </React.Fragment>
  );
}

const settings = {
  dots: false,
  infinite: false,
  autoplay: false,
  slidesToShow: 3,
  slidesToScroll: 3
};

@connect(({ userLogin, lackpackages, pincode }) => ({
  packages_data: lackpackages.packages_data,
  selectedPincode: pincode.selectedPincode,
  seoInfo: lackpackages && lackpackages.seo && lackpackages.seo.items
}))
export default class OneLacPackage extends Component {
  state = {
    activeTab: 0,
    openModal: false,
    slected: ""
  };

  handleTab = i => {
    this.setState({ activeTab: i });
  };

  handleModal = () => {
    this.setState({
      openModal: !this.state.openModal
    });
  };

  handleBannerClick = (verify, id) => {
    const { selectedPincode } = this.props;
    if (selectedPincode === PINCODE && verify) {
      this.handleModal();
      this.setState({ slected: id });
    } else {
      const { history } = this.props;
      if (id) {
        history.push(`/package-catalog/${id}`);
      } else {
        history.push(`/package-catalog/${this.state.slected}`);
      }
    }
  };

  componentDidMount() {
    const { packages_data } = this.props;
    let found = "";
    if (packages_data && packages_data.tabs) {
      {
        packages_data.tabs.map((item, i) => {
          if (item.package.length && !Number.isInteger(found)) {
            found = i;
          }
        });
      }
    }
    if (Number.isInteger(found)) {
      this.setState({ activeTab: found });
    }
  }

  render() {
    const { activeTab } = this.state;
    const { packages_data, seoInfo } = this.props;
    return (
      <div className="wrapper">
        <Helmet title={`${(seoInfo && seoInfo.page_title) || ""}`}>
          <meta name="keywords" content={seoInfo && seoInfo.meta_keywords} />
          <meta
            name="description"
            content={seoInfo && seoInfo.meta_description}
          />
        </Helmet>
        <div className={styles.selectyourPackContainer}>
          <div className={BreadCrumpstyles.BreadCrumb_wrapper2}>
            <PackageBreadCrumb isPacakge={false} />
          </div>
          <Section mb="0px" p="0px" pr="0px" pl="0px" mt="0px">
            <Container
              type="container"
              pr="0px"
              pl="0px"
              style={{ maxWidth: "2000px" }}
            >
              <DeliveryAddress />
            </Container>
          </Section>
          <img
            src={packages_data.banner}
            alt="Banner"
            style={{ width: "100%", height: "450px" }}
          />
          <div
            style={{
              textAlign: "center",
              color: "#666666",
              fontSize: "24px",
              lineHeight: "38px",
              padding: "40px 100px"
            }}
          >
            {packages_data.description}
          </div>
          <div
            style={{
              textAlign: "center",
              fontWeight: 600,
              fontSize: "30px",
              marginTop: "50px",
              color: "black"
            }}
          >
            Select Your Packages
          </div>
          <div
            style={{
              width: "30px",
              borderTop: "2px solid #222222",
              margin: "auto",
              marginBottom: "40px",
              marginTop: "20px"
            }}
          ></div>
          <div
            style={{
              display: "flex",
              marginLeft: "9%",
              marginRight: "9%",
              fontSize: "20px"
            }}
          >
            {packages_data.tabs.map((item, i) => {
              if (Array.isArray(item.package) && item.package.length) {
                return (
                  <div
                    className={
                      activeTab === i
                        ? styles.activeTabContainer
                        : styles.tabContainer
                    }
                    style={{ marginLeft: "30px", cursor: "pointer" }}
                  >
                    <div
                      className={
                        activeTab === i ? styles.activeTab : styles.tab
                      }
                      onClick={() => this.handleTab(i)}
                    >
                      {item.title}
                    </div>
                  </div>
                );
              }
            })}
          </div>
          <div
            className="carousel-one"
            style={{ background: "#FFF8F4", width: "100%", padding: "30px" }}
          >
            <div style={{ width: "80%", marginLeft: "10%" }}>
              <SlickSlider
                settings={{
                  ...settings,
                  nextArrow: <SampleNextArrow />,
                  prevArrow: <SamplePrevArrow />
                }}
              >
                {packages_data.tabs[activeTab].package.map(pack => (
                  <div style={{ marginBottom: "30px" }}>
                    <img
                      src={pack.img}
                      alt="Banner"
                      onClick={() => this.handleBannerClick(true, pack.id)}
                      style={{
                        cursor: "pointer",
                        height: "250px",
                        width: "90%"
                      }}
                    />
                    {pack.pseudoItemsCount ? (
                      <div
                        className={styles.slectedStatus}
                        onClick={() => this.handleBannerClick(true, pack.id)}
                      >
                        <div>
                          {pack.pseudoItemsCount}/{pack.totalQty} Products Saved
                        </div>
                        <div>View All</div>
                      </div>
                    ) : null}
                  </div>
                ))}
              </SlickSlider>
            </div>
          </div>
        </div>
        <ResponsiveModal
          classNames={{ modal: "PackageModal" }}
          onCloseModal={this.handleModal}
          open={this.state.openModal}
        >
          <div
            style={{
              background: "#F5EEEE",
              height: "50px",
              borderTopLeftRadius: "20px",
              borderTopRightRadius: "20px"
            }}
          />
          <div
            style={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            <span
              style={{
                color: "#000000",
                fontSize: "22px",
                fontWeight: 600,
                textAlign: "center",
                margin: "20px 0px",
                width: "60%",
                lineHeight: "30px"
              }}
            >
              {" "}
              Please Confirm Your Pincode To Proceed With The Package
            </span>
          </div>
          <div
            style={{ padding: "25px 20px", fontSize: "16px", color: "#000000" }}
          >
            <PackagePincode
              handleModal={this.handleModal}
              handleBannerClick={this.handleBannerClick}
            />
          </div>
        </ResponsiveModal>
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
      </div>
    );
  }
}
