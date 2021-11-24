import React from 'react';
import BeginJourney from './BeginJourney';
import QueryDropDownContainer from './queryDropdown';
import TopBanner from './TopBanner';
import WhyChose from './Whychose';
import RoomsWeTransform from './RoomsTransform';
import Header from './Header';
import DandBAdvantage from './DesignBuildAdavntage/DandBAdvantage';
import DesignServices from './DesignServices/DesignServices';
import ServicesOffer from './ServicesOffer/ServicesOffer';
import StepsToYourHome from './StepsToHome';
import SpeakToExperts from './SpeakToExperts';
import ShopFurniture from './ShopFurniture/ShopFurniture';
import StyleYourHome from './StyleYourHome/StyleYourHome';
import Blogs from './Blogs/Blogs';
import CustomerStories from './CustomerStories/CustomerStories';
import ResponsiveModal from 'components/Modal';
import Section from 'hometown-components-dev/lib/SectionHtV1';
import Div from 'hometown-components-dev/lib/BoxHtV1';
import Heading from 'hometown-components-dev/lib/HeadingHtV1';
import ModularKitchenFormModal from './ModularKitchenFormModal';

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

  handleModalWithSave = () => {
    this.setState({
      openModal: false
    });
    setTimeout(() => {
      this.setState({
        open: true
      });
    }, 1000);
  };

  handleScript = () => {
    this.setState({
      showScript: true
    })
  }
  render() {
    const { whyChooseUs, isLoggedIn, fullName, loading, loaded } = this.props;
    const { showScript } = this.state;
    return (
      <div>
        <Header/>
        <TopBanner  />
        <WhyChose />
        <DandBAdvantage />
        <StepsToYourHome/>
        <DesignServices />
        <SpeakToExperts />
        <RoomsWeTransform />
        <ServicesOffer />
        <CustomerStories />
        <ShopFurniture />
        <StyleYourHome />
        <BeginJourney/>
        <Blogs />
        <QueryDropDownContainer />

         <Section p="0" mb="0">
          <ResponsiveModal
            classNames={{ modal: 'mkModal' }}
            onCloseModal={this.handleModal}
            open={this.state.openModal}
          >
            <ModularKitchenFormModal handleModalWithSave={this.handleModalWithSave} handleScript={this.handleScript}/>
          </ResponsiveModal>
          <Div>
            {!loading && loaded ? (
              <ResponsiveModal
                classNames={{ modal: 'mkModal' }}
                onCloseModal={() => this.setState({ open: false })}
                open={this.state.open}
              >
                <Div
                  mt="50px"
                  p="50px 15%"
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderBottomLeftRadius: '20px',
                    borderBottomRightRadius: '20px'
                  }}
                >
                  <Heading
                    ta="center"
                    fontSize="22px"
                    mb="50px"
                    mt="10px"
                    color="#000000"
                    style={{ whiteSpace: 'normal' }}
                  >
                    Thank you for your Interest, Our Team will get in touch with you Shortly
                  </Heading>
                  <Img m="0 auto 5px" width="100px" src={correctIcon} alt="Reload Page" />
                </Div>
              </ResponsiveModal>
            ) : null}
          </Div>
          </Section>
      </div>
    );
  }
}

export default DesignBuildContainer;
