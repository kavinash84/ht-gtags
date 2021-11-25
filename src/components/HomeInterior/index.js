import React, { Component } from 'react';
import Header from './Header';
import TopBanner from './TopBanner';
import ServicesWeOffer from './ServicesWeOffer';
import DesignByStyle from './DesignByStyle/DesignByStyle';
import SpacesWeDesign from './Spaces';
import LetUsHelpYou from './LetusHelp';
import LivingRoom from './SpacesWeDesign/LivingRoom';
import Kitchen from './SpacesWeDesign/Kitchen';
import BedRoom from './SpacesWeDesign/BedRoom';
import ShopNow from './ShopNow/ShopNow';
import CustomerStories from './CustomerStories/CustomerStories';

class HomeInteriorContainer extends React.Component {
    render() { 
        return (
            <div>
            <Header />
            <TopBanner/>
            <ServicesWeOffer />
            <DesignByStyle />
            <SpacesWeDesign />
            <LivingRoom />
            <Kitchen />
            <BedRoom />
            <CustomerStories />
            <ShopNow />
            <LetUsHelpYou />
            
            </div>        
        );
    }
}
 
export default HomeInteriorContainer;