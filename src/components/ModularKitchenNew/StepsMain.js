import React, { Component } from "react";
import Box from "hometown-components-dev/lib/BoxHtV1";
import Button from "hometown-components-dev/lib/ButtonHtV1";
import { connect } from "react-redux";
import Steps from "./Steps";

// const styles = require('./Designbuild.scss');
// const arrowForward = require("../../../static/newHomepage/newForwardArrow.svg");

@connect(({ modularkitchen }) => ({
  modularkitchen,
  stepsToDreamhome: modularkitchen.data.items.text.stepsToDreamhome
}))
export default class StepsMain extends Component {
  state = {
    initialItems: [],
    length: 0,
    isOpen: ""
  };

  handleClick = index => {
    this.setState({ isOpen: index });
  };

  componentDidMount() {
    const { stepsToDreamhome } = this.props;
    this.setState({ initialItems: stepsToDreamhome.values });
    this.setState({ length: 7 });
  }
  render() {
    const { stepsToDreamhome } = this.props;
    const { initialItems, length } = this.state;
    return (
      <Box
        style={{
          backgroundColor: "#FFFFFF",
          paddingTop: "30px",

          paddingBottom: "0px"
        }}
      >
        <Box
          style={{
            fontSize: "35px",
            lineHeight: "45px",
            fontWeight: 600,
            marginBottom: "10px",
            color: "black",
            textAlign: "left",
            marginLeft: "10%"
          }}
        >
          4 Steps to Your <br /> Kitchen
        </Box>
        <Box
          style={{
            paddingTop: "30px",
            paddingBottom: "30px",
            marginLeft: "7%"
          }}
        >
          {initialItems.map((item, i) => {
            if (i + 1 <= length) {
              return (
                <div>
                  <Steps
                    title={item.title}
                    description={item.description}
                    lenght={stepsToDreamhome.values.length}
                    handleClick={this.handleClick}
                    isOpen={this.state.isOpen}
                    index={i}
                  />
                </div>
              );
            }
          })}
          <Box
            style={{
              width: "100%",
              padding: "10px 10px 0px",
              marginTop: "20px"
            }}
          >
            <Button
              onClick={this.props.handleModal}
              style={{
                width: "200px",
                height: "50px",
                backgroundColor: "white",
                color: "#F47020",
                border: "1px solid #F47020",
                borderRadius: "5px",
                marginLeft: "9%",

                textTransform: "capitalize"
              }}
            >
              {stepsToDreamhome.button}
            </Button>
          </Box>
        </Box>
      </Box>
    );
  }
}
