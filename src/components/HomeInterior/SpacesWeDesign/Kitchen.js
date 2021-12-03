import React, { Component } from "react";
import Div from "hometown-components-dev/lib/BoxHtV1";
import { connect } from "react-redux";
import DBCarousel from "./DBCarousel";
import Heading from 'hometown-components-dev/lib/HeadingHtV1';
import Image from 'hometown-components-dev/lib/ImageHtV1';
import Text from 'hometown-components-dev/lib/TextHtV1';

const styles = require("../HomeInterior.scss");

const adjustSlides = length => ({
  slidesToShow: 3,
  slidesToScroll: 1,
  infinite: false,
  autoplay: false,
  dots: true,
  customPaging: i => (
    <div
      style={{
        borderTop: "1px solid #848C7F"
      }}
    />
  )
});

@connect(({ homeinterior }) => ({
  homeinterior,
  kitchen: homeinterior.data.items.text.kitchen
}))
export default class Kitchen extends Component {
  render() {
    const { kitchen } = this.props;
    return (
      <Div
        style={{
          backgroundColor: "#FFFFFF",
          padding: "30px 0px 10px",
          textAlign: "center",
          marginTop: "40px"
        }}
      >
       <Div style={{ width:"90%", marginLeft:"5%" }}>
         <Image src={kitchen.image}/>
       </Div>
       <Div>
         <Heading
         style={{
            fontSize: '32px',
            fontWeight: 600,
            marginTop: '40px',
            marginBottom: '30px',
            color: 'black',
            textAlign: 'center'
          }}>
         {kitchen.key}</Heading>
       </Div>
       <Div style={{height: '100%', width: '100%', backgroundColor:'#F8F2F2', display:'flex'}}>
        <Div style={{width:'30%' , paddingLeft: '10%', paddingTop:'90px'}}>
           <Heading style={{fontSize:'24px', textAlign:'left'}}>{kitchen.title}</Heading>
           <Text style={{fontSize:'16px', textAlign:'left', color:'#888888', width:'80%', lineHeight:'26px', marginTop:'15px'}}>{kitchen.description}</Text>
        </Div>
        <Div style={{  paddingBottom: "40px", width: '60%', paddingTop: "80px"}}>
          <DBCarousel
            data={kitchen.values}
            settings={adjustSlides}
            component={3}
          />
        </Div>
       </Div>
        
      </Div>
    );
  }
}
