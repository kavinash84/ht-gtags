import React, { Component } from "react";
import Text from "hometown-components-dev/lib/TextHtV1";
import Image from "hometown-components-dev/lib/ImageHtV1";
import { connect } from "react-redux";
const arrowForward = require("../../../static/new-home/newForwardArrow.svg");
@connect(({ modularkitchen }) => ({
  modularkitchen,
  seeandexperience: modularkitchen.data.items.text.seeandexperience
}))
class SeeAndExperience extends React.Component {
  render() {
    const { seeandexperience } = this.props;
    return (
      <div style={{ width: "100%", marginTop: "50px" }}>
        <div
          style={{
            width: "100%",
            margin: "auto",
            display: "flex",
            justifyContent: "center"
          }}
        >
          <Image
            src={seeandexperience.image}
            width="60%"
            style={{ objectFit: "cover" }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignContent: "flex-start",
              width: "40%",
              height: "auto",
              backgroundColor: "#FCF8F3"
            }}
          >
            <Text
              fontSize="30px"
              color="label"
              mt="10px"
              style={{
                textAlign: "left",
                color: "#222222",
                fontWeight: "600",
                marginLeft: "5%"
              }}
            >
              {seeandexperience.title}
            </Text>
            <Text
              fontWeight="300"
              fontSize="17px"
              color="label"
              mt="15px"
              style={{
                textAlign: "left",
                color: "#222222",
                lineHeight: "30px",
                width: "60%",
                marginLeft: "5%"
              }}
            >
              {seeandexperience.description}
            </Text>
            <p
              onClick={this.props.handleModal}
              fontSize="18px"
              color="label"
              mt="10px"
              style={{
                cursor: "pointer",
                textAlign: "left",
                color: "#3A3A3A",
                lineHeight: "30px",
                width: "90%",
                fontWeight: "600",
                marginLeft: "5%",
                marginTop: "4%"
              }}
            >
              LET'S MEET
              <img
                style={{
                  display: "inline",
                  marginLeft: "0px",
                  height: "10px",
                  width: "40px"
                }}
                src={arrowForward}
                alt="Arrow"
              />
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default SeeAndExperience;
