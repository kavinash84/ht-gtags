import React, { Component } from "react";
import Div from "hometown-components-dev/lib/BoxHtV1";
import { connect } from "react-redux";
import DBCarousel from "./DBcarousel";

// const styles = require("../Home.scss");

const adjustSlides = length => ({
  slidesToShow: 2,
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

// @connect(({ homepagecmsdata }) => ({
//   homepagecmsdata,
//   shopByRooms: homepagecmsdata.data.items.text.shopByRooms
// }))
export default class ShopByRooms extends Component {
  state = {
    shopByRoom: [
      {
        image:
          "https://www.hometown.in/media/cms/hometownnew/desktopnewhomepage/shopbycat/shopbyroom01.png",
        title: "Living Room",
        description:
          "From classic neutrals to chic modern, our living room furniture collection has something for everyone home. Shop sofas, recliners, coffee tables, end tables, media units, ottomans and much more",
        url_key: "/furniture/living-room-furniture"
      },
      {
        image:
          "https://www.hometown.in/media/cms/hometownnew/homepage/shopByRooms/ShopByRoom02.png",
        title: "Dining",
        description:
          "Casual get-togethers or intimate soirees, our dining room furniture collection has the perfect pieces to make every moment into a memorable one. Shop dining room sets, dining chairs, bar stools, sideboards or serving trolleys",
        url_key: "/furniture/dining-kitchen-furniture"
      },
      {
        image:
          "https://www.hometown.in/media/cms/hometownnew/homepage/shopByRooms/ShopByRoom03.png",
        title: "Bedroom",
        description:
          "Grand master suites to cosy sleep rooms, our bedroom furniture collection in classic, contemporary or modern designs make for a perfect sleep haven. Shop beds, wardrobes, dressers, night stands and much more.",
        url_key: "/furniture/bedroom-furniture"
      },
      {
        image:
          "https://www.hometown.in/media/cms/hometownnew/homepage/shopByRooms/ShopByRoom04.png",
        title: "Kids room",
        description:
          "Girl bedrooms or boy bedrooms, our kids furniture range is perfect to fuel their imagination and compliment their personalities. Shop bunked beds, themed bedroom sets, study desk, book shelves and much more",
        url_key: "/furniture/kids-furniture"
      },
      {
        image:
          "https://www.hometown.in/media/cms/hometownnew/homepage/shopByRooms/ShopByRoom05.png",
        title: "Home Office",
        description:
          "Formal study or cozy work area, create a space you'll love to work in. Shop study table, office chairs, filling storage cabinets and book shelves",
        url_key: "/furniture/study-office-furniture"
      }
    ]
  };
  render() {
    // console.log("998888999999999", shopByRooms);
    const { shopByRoom } = this.state;
    return (
      <Div
        style={{
          backgroundColor: "#FFFFFF",
          padding: "30px 30px 10px",
          textAlign: "center",
          marginTop: "40px"
        }}
      >
        <Div
          style={{
            fontSize: "40px",
            fontWeight: "600",
            marginBottom: "20px",
            color: "black"
          }}
        >
          Shop By Rooms
          <div
            style={{
              width: "30px",
              borderTop: "2px solid #222222",
              margin: "auto",
              marginTop: "15px"
            }}
          />
        </Div>
        <Div style={{ fontSize: "12px", color: "#000", margin: "0 10px 0 0" }}>
          {shopByRoom.description}
        </Div>
        <Div
          style={{
            width: "90%",
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-evenly",
            alignItems: "center",
            margin: "20px 5% 0 5%"
          }}
        >
          <DBCarousel data={shopByRoom} settings={adjustSlides} component={3} />
        </Div>
      </Div>
    );
  }
}
