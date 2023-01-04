import React, { Component } from "react";
import Header from "./Header";
import Section from "hometown-components-dev/lib/SectionHtV1";
import Flex from "hometown-components-dev/lib/FlexHtV1";
import Container from "hometown-components-dev/lib/ContainerHtV1";
import Heading from "hometown-components-dev/lib/HeadingHtV1";
import { connect } from "react-redux";
import HomeTownAdvantage from "./HomeTownAdvantage";
import TopBanner from "./TopBanner";
import RoomsWeTransform from "./RoomsTransform";
import KitchenLayout from "./KitchenLayout";
import KitchenExperts from "./KitchenExperts";
import SeeAndExperience from "./SeeAndExperience";
import ResponsiveModal from "components/Modal";
import KitchenBlog from "./KitchenBlog";
import CustomerStories from "./CustomerStories/CustomerStories";
import MakeItYourOwn from "./MakeItYourOwn";
import DreamKitchen from "./DreamKitchen";
import OurPartners from "./OurPartners";
import Helmet from "react-helmet";
import Div from "hometown-components-dev/lib/BoxHtV1";
import SeoContent from "hometown-components-dev/lib/SeoContent";
import ModularKitchenFormModal from "./ ModularKitchenFormModal";
import FourSteps from "./FourSteps";
import { allowNChar, allowTypeOf } from "utils/helper";
import { SERVICE_SIGNUPS, PINCODE as PINCODE_API } from "helpers/apiUrls";
import { sendData, getData } from "redux/modules/services";
import StepsToYourHome from "./StepsToHome";
const check = require("../../../static/new-home/check.svg");
@connect(
  ({ services, modularkitchen, userLogin, profile }) => ({
    modularkitchen,
    seoInfo:
      modularkitchen.data &&
      modularkitchen.data.seo &&
      modularkitchen.data.seo.items,
    ...services.modularkitchen
  }),
  { sendFormData: sendData, loadPincodeDetails: getData }
)
class ModularKitchenNewContainer extends React.Component {
  state = {
    openModal: false,
    open: false,
    showScript: false,
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




          {/* Facebook Pixel Code  */}
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
fbq('track', 'MKlead');
`}
            </script>
          ) :
            null}
          {showScript ? (
            <noscript>{`<img height="1" width="1" style="display:none"
              src="https://www.facebook.com/tr?id=1024172491523922&ev=MKlead&noscript=1"
            />`}</noscript>
          ) : null}

          {/* End Facebook Pixel Code */}


        </Helmet>
        <Header handleModal={this.handleModal} />
        <TopBanner handleModal={this.handleModal} />
        <HomeTownAdvantage />
        <RoomsWeTransform />
        <FourSteps />
        <KitchenLayout />
        <KitchenExperts />
        <SeeAndExperience handleModal={this.handleModal} />
        <KitchenBlog />
        <CustomerStories />
        <MakeItYourOwn handleModal={this.handleModal} />
        <DreamKitchen handleModal={this.handleModal} />
        <OurPartners />

        <Section p="0" mb="0">
          <ResponsiveModal
            classNames={{ modal: "modularKitchenModel" }}
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

export default ModularKitchenNewContainer;
