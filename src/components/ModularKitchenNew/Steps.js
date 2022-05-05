import React, { Component } from "react";
import Box from "hometown-components-dev/lib/BoxHtV1";
import { connect } from "react-redux";

const styles = require("./ModularKitchen.scss");
const Arrow = require("../../../static/new-home/Arrow.svg");
const ArrowRotate = require("../../../static/new-home/ArrowRotate.svg");
const dot = require("../../../static/new-home/dot.svg");
const blink = require("../../../static/new-home/blink.svg");
const line = require("../../../static/new-home/line.svg");

@connect(({ modularkitchen }) => ({
  modularkitchen,
  stepsToDreamhome: modularkitchen.data.items.text.stepsToDreamhome
}))
class Steps extends React.Component {
  render() {
    const { title, description, length, index, isOpen } = this.props;
    return (
      <Box
        style={{
          background: isOpen ? "#FFFFFF" : "#FFFFFF",
          width: "100"
        }}
      >
        {isOpen === index ? (
          <div
            style={{ padding: "0px 30px" }}
            onClick={() => {
              if (isOpen === index) {
                this.props.handleClick("");
              } else {
                this.props.handleClick(index);
              }
            }}
          >
            <Box
              style={{
                // padding: "18px 0px 22px",
                borderLeft: "2px dashed #F57831"
              }}
            >
              <Box
                style={{
                  padding:
                    index === 0
                      ? "-5px 0px 15px"
                      : index === 3
                      ? "-5px 0px 10px"
                      : "-5px 0px 22px"
                  // borderLeft: "2px dashed #F47020"
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "80%",
                    marginLeft: "0%",
                    alignItems: "center",
                    color: "black",
                    cursor: "pointer",
                    fontSize: "16px",
                    fontWeight: "bold"
                  }}
                >
                  <div style={{ display: "flex" }}>
                    <img
                      data-src={blink}
                      style={{
                        width: "20px",
                        height: "20px",
                        marginLeft: "-10px",
                        marginTop: "-2px"
                      }}
                    />
                    <div
                      style={{
                        textAlign: "left",
                        marginLeft: "7px",
                        marginTop: "-1px",
                        cursor: "pointer"
                      }}
                    >
                      {title}
                    </div>
                  </div>
                  <Box
                    style={{
                      textAlign: "right"
                    }}
                  >
                    <img
                      src={ArrowRotate}
                      alt="aarow"
                      className={styles.iconrotate}
                    />
                  </Box>
                </div>
              </Box>
              <div
                className={styles.descriptionSam}
                style={{ paddingTop: index === 3 ? "5px" : "0px" }}
              >
                {description}
              </div>
            </Box>
          </div>
        ) : (
          <div
            style={{ padding: "0px 30px" }}
            onClick={() => {
              if (isOpen === index) {
                this.props.handleClick("");
              } else {
                this.props.handleClick(index);
              }
            }}
          >
            <Box
              style={{
                padding:
                  index === 0
                    ? "0px 0px 22px"
                    : index === 3
                    ? "18px 0px 0px"
                    : "18px 0px 22px",
                borderLeft: "2px dashed #F57831"
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "80%",
                  marginLeft: "0%",
                  alignItems: "center",
                  fontSize: "16px",
                  fontWeight: "bold"
                }}
              >
                <div style={{ display: "flex" }}>
                  <img
                    src={dot}
                    style={{
                      width: "7px",
                      height: "7px",
                      marginLeft: "-5px",
                      marginTop: index === 3 ? "5px" : "0px"
                    }}
                  />
                  <div
                    style={{
                      textAlign: "left",
                      marginLeft: "15px",
                      marginTop: "-2px",
                      cursor: "pointer",
                      marginBottom: index === 3 ? "-2px" : "0px"
                    }}
                  >
                    {title}
                  </div>
                </div>
                <Box
                  style={{
                    textAlign: "right"
                  }}
                >
                  <img src={Arrow} alt="aarow" style={{ cursor: "pointer" }} />
                </Box>
              </div>
            </Box>
          </div>
        )}
      </Box>
    );
  }
}

export default Steps;
