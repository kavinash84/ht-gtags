import React, { Component } from 'react';
import Div from 'hometown-components-dev/lib/BoxHtV1';
import Header from './Header';
import TopBanner from './TopBanner';
import WardrobesForEveryone from './WardrobesForEveryone/WardrobeForEveryone';
import TypesWardrobes from './TypesWardrobes/TypesWardrobes';
import Materials from './Materials/Materials';
import WhyChose from './Whychose';
import Finishes from './Finishes/Finishes';
import Accessories from './Accessories/Accessories';
import CustomerStories from './CustomerStories/CustomerStories';
import ShopNow from './ShopNow/ShopNow';
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
               <Div
          style={{
            fontSize: "40px",
            fontWeight: "600",
            marginBottom: "10px",
            color: "black",
            marginTop: "80px",
            textAlign: "center"
          }}
        >
          Select From A Range Of Wardrobe Collection
          <div
            style={{
              width: '30px',
              borderTop: '2px solid #222222',
              margin: 'auto',
              marginTop: '15px'
            }}
          />
          </Div>
               <TypesWardrobes />
               <Materials />
               <Finishes />
               <Accessories />
               <CustomerStories />
               <ShopNow />
            </div>
        );
    }
}
 
export default ModularWardrobeContainer;