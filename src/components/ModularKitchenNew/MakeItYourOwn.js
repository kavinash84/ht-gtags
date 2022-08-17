import React, { Component } from "react";
import { connect } from "react-redux";
import Img from "hometown-components-dev/lib/ImageHtV1";
import Row from "hometown-components-dev/lib/RowHtV1";
import Heading from "hometown-components-dev/lib/HeadingHtV1";
import SlickSlider from "../SlickSlider";
import Text from "hometown-components-dev/lib/TextHtV1";
import Div from "hometown-components-dev/lib/BoxHtV1";
import "./Slider.css";
const LeftArrow = require("../../../static/new-home/roundedArrowLeft.svg");
const RightArrow = require("../../../static/new-home/roundedArrowRight.svg");
const arrowForward = require("../../../static/new-home/newForwardArrow.svg");
function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <React.Fragment>
      <img
        className={className}
        src={RightArrow}
        onClick={onClick}
        style={{ ...style, marginRight: "3%", width: "15px" }}
      />
    </React.Fragment>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <React.Fragment>
      <img
        className={className}
        src={LeftArrow}
        onClick={onClick}
        style={{ ...style, marginLeft: "1%", width: "15px" }}
      />
    </React.Fragment>
  );
}
const adjustSlides = length => ({
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: false,
  infinite: false,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />
});

@connect(({ modularkitchen }) => ({
  modularkitchen,
  makeItOwn: modularkitchen.data.items.text.makeItOwn
}))
class MakeItYourOwn extends React.Component {
  state = {
    openModal: false,
    makeItOwnSelect: "Organisers",
    organiser: true,
    handles: false,
    lights: false,
    countertops: false,
    showScript: false
  };
  handleModal = () => {
    this.setState({
      openModal: !this.state.openModal
    });
  };
  makeItOwnSelecter = e => {
    e.preventDefault();
  };

  handleScript = () => {
    this.setState({
      showScript: true
    });
  };
  render() {
    const { makeItOwn } = this.props;
    const { makeItOwnSelect, showScript } = this.state;
    return (
      <Div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <Heading
            mt="40px"
            color="#3A3A3A"
            fontSize="40px"
            fontFamily="regular"
            fontWeight="600"
          >
            {makeItOwn.title}
          </Heading>
          <p
            style={{
              fontSize: "20px",
              marginTop: "20px",
              color: "#666666"
            }}
          >
            {makeItOwn.explore}
          </p>
        </div>

        <Row
          marginTop="40px"
          width="50%"
          marginLeft="25%"
          marginRight="25%"
          p="0px 15px"
          display="flex"
          justifyContent="space-between"
        >
          <button
            style={{
              cursor: "pointer",
              border: "none",
              fontSize: "20px",
              color: "#3A3A3A",
              background: "transparent",
              display: "inline-block",
              paddingBottom: "15px",
              borderBottom: this.state.organiser ? "2px solid #F57831" : "none",
              fontWeight: this.state.organiser ? "bold" : "normal"
            }}
            value="Organisers"
            onClick={e => {
              this.setState({
                makeItOwnSelect: e.target.value,
                organiser: true,
                handles: false,
                lights: false,
                countertops: false
              });
            }}
          >
            Organisers
          </button>
          <button
            style={{
              cursor: "pointer",
              border: "none",
              fontSize: "20px",
              color: "#666666",
              background: "transparent",
              display: "inline-block",
              paddingBottom: "15px",
              borderBottom: this.state.handles ? "2px solid #F57831" : "none",
              fontWeight: this.state.handles ? "bold" : "normal"
            }}
            value="Handles"
            onClick={e => {
              this.setState({
                makeItOwnSelect: e.target.value,
                organiser: false,
                handles: true,
                lights: false,
                countertops: false
              });
            }}
          >
            Handles
          </button>
          <button
            style={{
              cursor: "pointer",
              border: "none",
              fontSize: "20px",
              color: "#666666",
              background: "transparent",
              display: "inline-block",
              paddingBottom: "15px",
              borderBottom: this.state.lights ? "2px solid #F57831" : "none",
              fontWeight: this.state.lights ? "bold" : "normal"
            }}
            value="Lights"
            onClick={e => {
              this.setState({
                makeItOwnSelect: e.target.value,
                organiser: false,
                handles: false,
                lights: true,
                countertops: false
              });
            }}
          >
            Lights
          </button>
          <button
            style={{
              cursor: "pointer",
              border: "none",
              fontSize: "20px",
              color: "#666666",
              background: "transparent",
              display: "inline-block",
              paddingBottom: "15px",
              borderBottom: this.state.countertops
                ? "2px solid #F57831"
                : "none",
              fontWeight: this.state.countertops ? "bold" : "normal"
            }}
            value="Countertops"
            onClick={e => {
              this.setState({
                makeItOwnSelect: e.target.value,
                organiser: false,
                handles: false,
                lights: false,
                countertops: true
              });
            }}
          >
            Countertops
          </button>
        </Row>
        <Div
          className="offset"
          pb="30px"
          style={{
            width: "80%",
            marginLeft: "10%",
            marginRight: "10%"
          }}
        >
          <Text
            mt="30px"
            mb="30px"
            ta="center"
            color="#888888"
            fontSize="23px"
            p="0px 10%"
            style={{ lineHeight: "29px", height: "90px", textAlign: "center" }}
          >
            {makeItOwn.carouselData[`${makeItOwnSelect}`].description}
          </Text>
          <SlickSlider
            settings={adjustSlides(4)}
            // style={{ width: "80%", marginLeft: "10%", marginRight: "10%" }}
          >
            {makeItOwn.carouselData[`${makeItOwnSelect}`].images.map(
              (data, index) => (
                <Div key={index} p="0px" pr="20px" pb="10px">
                  <Img height="30%" data-src={data.image} src={`${data.image}?blur=30`}/>
                </Div>
              )
            )}
          </SlickSlider>
          <Div>
            <a onClick={this.handleModal} to="">
              <div
                style={{
                  display: "flex",
                  textAlign: "center",
                  justifyContent: "center"
                }}
              >
                <Heading
                  fontSize="20px"
                  fontFamily="regular"
                  color="#3A3A3A"
                  marginTop="40px"
                >
                  {makeItOwn.choosestyle}
                </Heading>
              </div>
            </a>
          </Div>
          <div
            style={{
              display: "flex",
              textAlign: "center",
              justifyContent: "center"
            }}
          >
            <Heading
              style={{
                cursor: "pointer"
              }}
              cursor="pointer"
              onClick={this.props.handleModal}
              marginTop="20px"
              ta="center"
              fontSize="15px"
              fontFamily="regular"
              color="#323F38"
              fontWeight="600"
            >
              SPEAK TO OUR EXPERTS
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
            </Heading>
          </div>
        </Div>
      </Div>
    );
  }
}

export default MakeItYourOwn;
