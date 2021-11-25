import React, { Component } from 'react';
import Header from './Header';
import TopBanner from './TopBanner';
import WardrobesForEveryone from './WardrobesForEveryone/WardrobeForEveryone';
import TypesWardrobes from './TypesWardrobes/TypesWardrobes';
import Materials from './Materials/Materials';
import WhyChose from './Whychose';
import Finishes from './Finishes/Finishes';
import Accessories from './Accessories/Accessories';
import CustomerStories from './CustomerStories/CustomerStories';
import ShopFurniture from './ShopFurniture/ShopFurniture';
import Steps from './4Steps';

class ModularWardrobeContainer extends React.Component {
    render() { 
        return (
            <div>
                <Header />
                <TopBanner /> 
               <WhyChose />
               <WardrobesForEveryone />
               <Steps />
               <TypesWardrobes />
               <Materials />
               <Finishes />
               <Accessories />
               <CustomerStories />
               <ShopFurniture />
            </div>
        );
    }
}
 
export default ModularWardrobeContainer;