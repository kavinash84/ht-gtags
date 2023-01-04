import React from "react";
import { connect } from "react-redux";
import Helmet from "react-helmet";
import BeginJourney from "./BeginJourney";
// import QueryDropDownContainer from './queryDropdown';
import TopBanner from "./TopBanner";
import WhyChose from "./Whychose";
import RoomsWeTransform from "./RoomsTransform";
import Header from "./Header";
import DandBAdvantage from "./DesignBuildAdavntage/DandBAdvantage";
import DesignServices from "./DesignServices/DesignServices";
import ServicesOffer from "./ServicesOffer/ServicesOffer";
import StepsToYourHome from "./StepsToHome";
// import SpeakToExperts from './SpeakToExperts';
import ShopFurniture from "./ShopFurniture/ShopFurniture";
import StyleYourHome from "./StyleYourHome/StyleYourHome";
// import Blogs from './Blogs/Blogs';
// import CustomerStories from './CustomerStories/CustomerStories';
import SeoContent from "hometown-components-dev/lib/SeoContent";
import ResponsiveModal from "components/Modal";
import Section from "hometown-components-dev/lib/SectionHtV1";
import Div from "hometown-components-dev/lib/BoxHtV1";
import Heading from "hometown-components-dev/lib/HeadingHtV1";
import Flex from "hometown-components-dev/lib/FlexHtV1";
import Container from "hometown-components-dev/lib/ContainerHtV1";
import ModularKitchenFormModal from "./ModularKitchenFormModal";
import Image from "hometown-components-dev/lib/ImageHtV1";
import ModularKitchen from "./ModularKitchenForm";

import "./Slider.css";
const styles = require("./Designbuild.scss");
const check = require("../../../static/check.svg");

import { allowNChar, allowTypeOf } from "utils/helper";
import { SERVICE_SIGNUPS, PINCODE as PINCODE_API } from "helpers/apiUrls";
import { sendData, getData } from "redux/modules/services";

@connect(
  ({ services, designbuild, userLogin, profile }) => ({
    designbuild,
    topBanner: designbuild.data.items.text.topBanner,
    seoInfo:
      designbuild.data && designbuild.data.seo && designbuild.data.seo.items,
    ...services.modularkitchen
  }),
  { sendFormData: sendData, loadPincodeDetails: getData }
)
class DesignBuildContainer extends React.Component {
  state = {
    openModal: false,
    open: false,
    showScript: false
  };
  handleModal = () => {
    this.setState({
      openModal: !this.state.openModal
    });
  };
  render() {
    const {
      whyChooseUs,
      isLoggedIn,
      fullName,
      loading,
      loaded,
      topBanner,
      seoInfo
    } = this.props;
    const { showScript } = this.state;
    return (
      <div>
        <Helmet title={`${(seoInfo && seoInfo.page_title) || ""}`}>
          <meta name="keywords" content={seoInfo && seoInfo.meta_keywords} />
          <meta
            name="description"
            content={seoInfo && seoInfo.meta_description}
          />
          {showScript ? (
            // <!-- Facebook Pixel Code -->
            <script>
              {`
               window.addEventListener('load',function(){
                var x = 0;
                var myVar = setInterval(function(){
                  if(jQuery('h2:contains(Thank You For Your)').is(":visible")){
                    if(x == 0){
                      gtag('event', 'conversion', {'send_to': 'AW-832074530/h7wJCMXmzdcCEKLm4YwD'});
                      x = 1;
                    }
                    clearInterval(myVar);
                  }
                }, 1000);
              });
              `}
            </script>
          ) : // <!-- End Facebook Pixel Code -->
            null}

          {/* Meta Pixel Code  */}
          {showScript ? (

            <script>
              {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '1024172491523922');
fbq('track', 'DBlead');
`}
            </script>

          ) :
            null}
            
          {showScript ? (
            <noscript>{`<img height="1" width="1" style="display:none"
              src="https://www.facebook.com/tr?id=1024172491523922&ev=DBlead&noscript=1"
            />`}</noscript>


          ) :
            null}
          {/* End Facebook Pixel Code  */}
        </Helmet>
        <Header handleModal={this.handleModal} />
        <TopBanner handleModal={this.handleModal} />
        <WhyChose />
        <DandBAdvantage />
        <StepsToYourHome />
        <DesignServices />
        {/* <SpeakToExperts /> */}
        <Div mt="70px">
          <Flex>
            <Image
              data-src="https://static.hometown.in/media/cms/designbuild/speaktoExperts.png"
              style={{ width: "50%", height: "700px" }}
            />
            <Div
              style={{
                width: "50%",
                height: "700px",
                backgroundColor: "#FBF2ED"
              }}
            >
              <ModularKitchen
              />
            </Div>
          </Flex>
        </Div>

        <RoomsWeTransform />
        <ServicesOffer />
        {/* <CustomerStories /> */}
        <ShopFurniture />
        <StyleYourHome />
        <BeginJourney handleModal={this.handleModal} />
        {/* <Blogs /> */}
        {/* <QueryDropDownContainer /> */}

        <Section p="0" mb="0">
          <ResponsiveModal
            classNames={{ modal: "designbuildmodal" }}
            onCloseModal={this.handleModal}
            open={this.state.openModal}
            style={{ padding: "0rem" }}
          >
            <ModularKitchenFormModal
            />
          </ResponsiveModal>
        </Section>
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

export default DesignBuildContainer;
