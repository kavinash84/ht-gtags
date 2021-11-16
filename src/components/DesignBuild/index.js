import React from 'react';
import BeginJourney from './BeginJourney';
import QueryDropDownContainer from './queryDropdown';
import TopBanner from './TopBanner';
import WhyChose from './Whychose';
import DandBAdvantage from './DandBAdvantage';
import RoomsWeTransform from './RoomsTransform';
// import ModularKitchenForm from './ModularKitchenForm';
import Header from './Header';

class DesignBuildContainer extends React.Component {
  render() {
    return (
      <div style={{ fontFamily: 'Helvetica Neue' }}>
        <Header />
        <TopBanner />
        <WhyChose />
        <DandBAdvantage />
        <QueryDropDownContainer />
        <BeginJourney />
        <RoomsWeTransform />
        {/* <ModularKitchenForm /> */}
      </div>
    );
  }
}

export default DesignBuildContainer;
