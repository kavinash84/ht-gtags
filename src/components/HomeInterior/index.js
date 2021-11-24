import React, { Component } from 'react';
import Header from './Header';
import TopBanner from './TopBanner';
import RoomsWeTransform from './RoomsTransform';
import DesignByStyle from './DesignByStyle/DesignByStyle';
import SpacesWeDesign from './Spaces';
import LetUsHelpYou from './LetusHelp';
import LivingRoom from './SpacesWeDesign/LivingRoom';
import ShopNow from './ShopNow/ShopNow';
import CustomerStories from './CustomerStories/CustomerStories';

class HomeInteriorContainer extends React.Component {
    render() { 
        return (
            <div>
            <Header />
            <TopBanner/>
            <RoomsWeTransform />
            <DesignByStyle />
            <SpacesWeDesign />
            <LivingRoom />
            <ShopNow />
            <LetUsHelpYou />
            <CustomerStories />
            </div>        
        );
    }
}
 
export default HomeInteriorContainer;