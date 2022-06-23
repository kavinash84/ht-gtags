import React, { Component } from "react";
import Image from "hometown-components-dev/lib/ImageHtV1";
import Text from "hometown-components-dev/lib/TextHtV1";
import { connect } from "react-redux";

@connect(({ modularkitchen }) => ({
  modularkitchen,
  kitchenblog: modularkitchen.data.items.text.kitchenblog
}))
class KitchenBlog extends React.Component {
  render() {
    const { kitchenblog } = this.props;
    return (
      <div
        style={{
          marginTop: "5%",
          width: "80%",
          marginLeft: "10%",
          marginRight: "10%",
          display: "flex"
        }}
      >
        {kitchenblog.data.map(val => (
          <div>
            <Image
              data-src={val.image}
              src={`${val.image}?blur=30`}
              width="90%"
              height="70%"
              marginLeft="5%"
              marginRight="5%"
              style={{ objectFit: "cover" }}
            />
            <Text
              fontWeight="300"
              fontSize="18px"
              color="label"
              mt="15px"
              style={{
                textAlign: "left",
                color: "#222222",
                lineHeight: "25px",
                width: "90%",
                marginLeft: "5%"
              }}
            >
              {val.title}
            </Text>
          </div>
        ))}
      </div>
    );
  }
}

export default KitchenBlog;
