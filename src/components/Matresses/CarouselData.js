import React, { Component } from "react";
import Div from "hometown-components-dev/lib/BoxHtV1";
import { Link } from "react-router-dom";
import Image from "hometown-components-dev/lib/ImageHtV1";
import Heading from "hometown-components-dev/lib/HeadingHtV1";
import Text from "hometown-components-dev/lib/TextHtV1";

// const arrowForward = require("../../../static/new-home/newForwardArrow.svg");

const renderComponent = (index, elem, component) => {
  switch (component) {
    case "1":
      return (
        <Div key={index} p="2rem" pl="1rem" pr="1rem" pb="0rem">
          <Link to={elem.link}>
            <Div
              style={{
                paddingBottom: "1rem"
              }}
            >
              <Image src={elem.image} alt={elem.heading} />
              <Div pl="0px">
                <Heading
                  fontSize="19px"
                  style={{ color: "#323131", margin: "13px 0px" }}
                  ta="left"
                  mb="0px"
                >
                  {elem.heading}
                </Heading>
                <Text
                  color="#3A3A3A"
                  fontSize="14px"
                  mt="5px"
                  style={{ lineHeight: "15px" }}
                >
                  {elem.description}
                </Text>
              </Div>
            </Div>
          </Link>
        </Div>
      );
    case "2":
      return (
        <Div key={index} p="2rem" pl="1rem" pr="0.5rem" pb="0rem">
          <Link to={elem.link}>
            <Div
              style={{
                paddingBottom: "1rem"
              }}
            >
              <Image src={elem.image} alt="brand logo" />
            </Div>
          </Link>
        </Div>
      );
    case "4":
      return (
        <Div key={index} p="2rem" pl="1.5rem" pr="0rem" pb="0rem">
          {/* <Link to={elem.link || "/"}> */}
          <Div
            style={{
              paddingBottom: "1rem"
            }}
          >
            <Image src={elem.image} alt="brand logo" />
            <Heading
              fontSize="19px"
              style={{ color: "#323131", margin: "13px 0px" }}
              ta="left"
              mb="0px"
            >
              {elem.title}
            </Heading>
            <Text
              color="#3A3A3A"
              fontSize="14px"
              mt="5px"
              style={{ lineHeight: "15px" }}
            >
              {elem.description}
            </Text>
            {/* <Div style={{ display: "flex", marginTop: "15px" }}>
                <Div
                  style={{
                    fontSize: "16px",
                    color: "#3A3A3A",
                    marginRight: "5px"
                  }}
                >
                  EXPLORE
                </Div>
                <Image
                  src={arrowForward}
                  alt="arrowForward"
                  style={{ width: "20px" }}
                />
              </Div> */}
          </Div>
          {/* </Link> */}
        </Div>
      );
    case "3":
      return (
        <Div key={index} p="2rem" pl="1.5rem" pr="0rem" pb="0rem">
          <Link to={elem.link || "/"}>
            <Div
              style={{
                paddingBottom: "1rem"
              }}
            >
              <Image src={elem.image} alt="brand logo" />
              <Text
                fontSize="16px"
                color="#323231"
                style={{ textAlign: "center", paddingTop: "10px" }}
                mb="0px"
              >
                {elem.title}
              </Text>
            </Div>
          </Link>
        </Div>
      );
    case "5":
      return (
        <Div key={index} mt="1rem" p="0rem" pl="1.5rem" pr="0rem" pb="0rem">
          <Link to={elem.link}>
            <Div
              style={{
                paddingBottom: "1rem"
              }}
            >
              <Div p="0px">
                <Image src={elem.image} alt="brand logo" />
              </Div>
              <Div p="0rem">
                <Heading
                  fontSize="0.9rem"
                  style={{ color: "#323231", textAlign: "left" }}
                  mb="0px"
                >
                  {elem.title}
                </Heading>
                {/* <Text color="#17245B" fontSize="1rem" mt="5px" ta="center">
                                        {elem.description}
                                    </Text> */}
              </Div>
            </Div>
          </Link>
        </Div>
      );
    case "6":
      return (
        <Div p="0px 1rem">
          <Div mt="2rem">
            <Image src={elem.image} alt={elem.name} />
            <Link
              to={elem.link}
              style={{
                position: "absolute",
                top: "0px",
                backgroundColor: "rgba(254, 247, 230, 0.8)",
                padding: "0px 1rem"
              }}
            >
              <Text
                fontSize="0.8rem"
                style={{
                  fontWeight: "bold"
                }}
              >
                {elem.name}
              </Text>
            </Link>
          </Div>
          <Div>
            <Text
              fontSize="1rem"
              color="#17245B"
              mt="0.5rem"
              mb="0rem"
              style={{ fontWeight: "bold" }}
            >
              {elem.customerName}
            </Text>
            <Text fontSize="12px" color="#666666" mt="0px">
              {elem.location}
            </Text>
          </Div>
          <Div>
            <Text
              fontSize="20px"
              color="#323231"
              style={{
                lineHeight: "30px",
                fontWeight: "bold"
              }}
            >
              {elem.comment}
            </Text>
            {/* <Image
              src={quotes}
              alt="Quote"
              style={{
                position: "absolute",
                top: "0px",
                height: "75px",
                width: "auto"
              }}
            /> */}
          </Div>
        </Div>
      );
    default:
      null;
  }
};

export class CarouselData extends Component {
  render() {
    const { index, elem, component } = this.props;

    return <div>{renderComponent(index, elem, component)}</div>;
  }
}

export default CarouselData;
