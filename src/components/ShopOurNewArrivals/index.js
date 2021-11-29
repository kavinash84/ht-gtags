import SlideItems from "./SlideItems";
import React from "react";
import HeadingHtV1 from "hometown-components-dev/lib/HeadingHtV1";
class ShopOurNewArrivals extends React.Component {
  render() {
    const { shopOurNewArrivalFurniture } = this.props;
    return (
      <div>
        <HeadingHtV1
          mb="20px"
          mt="70px"
          fontSize="30px"
          style={{
            textAlign: "center",
            color: "#222222",
            fontFamily: "medium"
          }}
        >
          {shopOurNewArrivalFurniture.mainTitle}
        </HeadingHtV1>
        <div
          style={{
            width: "30px",
            borderTop: "2px solid #222222",
            margin: "auto",
            marginBottom: "10px"
          }}
        />

        {shopOurNewArrivalFurniture.data.map(val => (
          <SlideItems src={val.image} url={val.url_key} />
        ))}
      </div>
    );
  }
}

export default ShopOurNewArrivals;
