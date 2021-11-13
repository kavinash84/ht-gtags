import React, { Component } from "react";
import ShopByCategories from "../ShopByCategories";
import CategoryCarousel from "../CategoryCarouselHome";

// Shop by room
const shopByRoom01 = require("../../../static/new-home/shopbyroom01.png");
const shopByRoom02 = require("../../../static/new-home/shopbyroom02.png");
const shopByRoom03 = require("../../../static/new-home/shopbyroom01.png");
const shopByRoom04 = require("../../../static/new-home/shopbyroom02.png");

class HomeContainer extends Component {
  state = {
    open: true,
    shopByRoom: [
      {
        image: shopByRoom01,
        name: "Living Room",
        description:
          "From classic neutrals to chic modern, our living room furniture collection has something for everyone home. Shop sofas, recliners, coffee tables, end tables, media units, ottomans and much more",
        link: "/furniture/living-room-furniture"
      },
      {
        image: shopByRoom02,
        name: "Dining",
        description:
          "Casual get-togethers or intimate soirees, our dining room furniture collection has the perfect pieces to make every moment into a memorable one. Shop dining room sets, dining chairs, bar stools, sideboards or serving trolleys",
        link: "/furniture/dining-kitchen-furniture"
      },
      {
        image: shopByRoom03,
        name: "Bedroom",
        description:
          "Grand master suites to cosy sleep rooms, our bedroom furniture collection in classic, contemporary or modern designs make for a perfect sleep haven. Shop beds, wardrobes, dressers, night stands and much more.",
        link: "/furniture/bedroom-furniture"
      },
      {
        image: shopByRoom04,
        name: "Kids room",
        description:
          "Girl bedrooms or boy bedrooms, our kids furniture range is perfect to fuel their imagination and compliment their personalities. Shop bunked beds, themed bedroom sets, study desk, book shelves and much more",
        link: "/furniture/kids-furniture"
      }
    ]
  };
  render() {
    const { shopByRoom } = this.state;
    return (
      <div>
        <ShopByCategories />
        <CategoryCarousel
          categoryName="Shop By Rooms"
          data={shopByRoom}
          colSize="45%"
        />
      </div>
    );
  }
}

export default HomeContainer;
