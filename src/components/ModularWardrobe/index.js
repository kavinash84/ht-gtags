import React, { Component } from 'react';
import Header from './Header';
import TopBanner from './TopBanner';
import WardrobesForEveryone from './WardrobesForEveryone/WardrobeForEveryone';
import WhyChose from './Whychose';

class ModularWardrobeContainer extends React.Component {
    render() { 
        return (
            <div>
                <Header />
                <TopBanner /> 
               <WhyChose />
               <WardrobesForEveryone />
            </div>
        );
    }
}
 
export default ModularWardrobeContainer;