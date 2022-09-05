import React, { Component } from "react";
import createBrowserHistory from "history/createBrowserHistory";
import Div from "hometown-components-dev/lib/BoxHtV1";
import Heading from "hometown-components-dev/lib/HeadingHtV1";
import Image from "hometown-components-dev/lib/ImageHtV1";
import Text from "hometown-components-dev/lib/TextHtV1";
import Button from "hometown-components-dev/lib/ButtonHtV1";
import ResponsiveModal from "components/Modal";

const select = require("../../../static/select.png");

export class MattressForSleep extends Component {
  state = {
    open: false,
    quizSlide: "size",
    size: "",
    position: "",
    feel: "",
    sizeUrl: ""
  };

  handleQuizModal = () => {
    this.handleClick();
    this.setState({
      open: true
    });
  };

  handleModal = () => {
    this.setState({
      open: false,
      size: "",
      position: "",
      feel: "",
      quizSlide: "size"
    });
  };

  componentDidMount() {
    this.handleScrollPosition();
  }

  handleScrollPosition = () => {
    const scrollPosition = sessionStorage.getItem("scrollPosition");
    if (scrollPosition) {
      window.scrollTo(0, parseInt(scrollPosition));
      setTimeout(function() {
        sessionStorage.removeItem("scrollPosition");
      }, 500);
    }
  };

  handleClick = () => {
    sessionStorage.setItem("scrollPosition", window.pageYOffset);
  };

  getSleeperType = (position, support) => {
    // switch ((position, support)) {
    if (position === "Side" && support === "Medium Soft")
      return "Side Sleeper and Toss %26 Turn";
    else if (position === "Side" && support === "Soft")
      return "Side Sleeper and Toss %26 Turn";
    else if (position === "Side" && support === "Medium Firm")
      return "Side Sleeper, Back Sleeper and Toss %26 Turn";
    else if (position === "Side" && support === "Firm")
      return "Side Sleeper and Back Sleeper";
    else if (position === "Back" && support === "Medium Firm")
      return "Side Sleeper, Back Sleeper and Toss %26 Turn";
    else if (position === "Back" && support === "Firm")
      return "Side Sleeper and Back Sleeper";
    else if (position === "Toss & Turn" && support === "Medium Soft")
      return "Side Sleeper and Toss %26 Turn";
    else if (position === "Toss & Turn" && support === "Soft")
      return "Side Sleeper and Toss %26 Turn";
    else if (position === "Toss & Turn" && support === "Medium Firm")
      return "Side Sleeper, Back Sleeper and Toss %26 Turn";
    else return position;
  };

  getButton = () => {
    const { quizSlide, size, position, feel } = this.state;
    const history = createBrowserHistory({ forceRefresh: true });
    return (
      <Div
        style={{
          display: "flex",
          justifyContent: "center"
        }}
      >
        <Button
          style={{
            border: "1px solid orangered",
            color: "orangered",
            padding: "0.5rem 4rem",
            backgroundColor: "white",
            borderRadius: "4px"
          }}
          disabled={
            quizSlide === "size"
              ? !size
              : quizSlide === "position"
              ? !position
              : !feel
          }
          onClick={() => {
            if (quizSlide === "feel") {
              if (this.state.feel && this.state.position && this.state.size) {
                history.push(
                  `/furniture/mattresses${
                    this.state.sizeUrl
                  }?p=unbxd_category:"Furniture;furniture>Mattresses;furniture/mattresses>${
                    this.state.size
                  };furniture/mattresses${
                    this.state.sizeUrl
                  }"&pagetype=boolean&facet.multilevel=unbxd_category&filter=comfort_level_uFilter:"${
                    this.state.feel
                  }"&filter=sleeper_type_uFilter:"${this.getSleeperType(
                    this.state.position,
                    this.state.feel
                  )}" OR sleeper_type_uFilter:"${
                    this.state.position === "Toss & Turn"
                      ? "Toss%20%26%20Turn"
                      : this.state.position
                  }"&rows=20&view=grid&start=0`
                );
              }
              this.setState({
                quizSlide: "size",
                size: "",
                position: "",
                feel: "",
                open: false
              });
            } else {
              this.setState({
                quizSlide:
                  quizSlide === "size"
                    ? "position"
                    : quizSlide === "position"
                    ? "feel"
                    : ""
              });
            }
          }}
        >
          {quizSlide === "feel" ? "Submit" : "Next"}
        </Button>
      </Div>
    );
  };

  getHeading = () => {
    const { data } = this.props;
    const { quizSlide } = this.state;
    return (
      <div>
        {quizSlide !== "size" ? (
          <Div
            style={{
              position: "absolute",
              top: "10px",
              zIndex: "10",
              width: "15%",
              cursor: "pointer"
            }}
            onClick={() =>
              this.setState({
                quizSlide: quizSlide === "position" ? "size" : "position"
              })
            }
          >
            <Text
              ta="center"
              fontSize="2rem"
              mt="0px"
              ml="0.5rem"
              mb="0px"
              color="black"
            >
              ←
            </Text>
          </Div>
        ) : null}
        <Div
          pt="1.3rem"
          pb="1.3rem"
          style={{
            backgroundColor: "#EBE6DC",
            borderRadius: "20px 20px 0px 0px",
            display: "flex",
            justifyContent: "center"
          }}
        >
          <ul style={{ display: "flex" }}>
            <li style={{ display: "inline" }}>
              <Div
                m="5px"
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  backgroundColor: "orangered"
                }}
              ></Div>
            </li>
            <li style={{ display: "inline" }}>
              <Div
                m="5px"
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  backgroundColor: "white"
                }}
              ></Div>
            </li>
            <li style={{ display: "inline" }}>
              <Div
                m="5px"
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  backgroundColor: "white"
                }}
              ></Div>
            </li>
          </ul>
        </Div>
        <Heading
          mt="1rem"
          fontSize="22px"
          p="0px 3rem"
          style={{
            fontWeight: "bold",
            color: "#000000",
            lineHeight: "25px",
            padding: "0px 25%",
            textAlign: "center"
          }}
        >
          {data.quiz[quizSlide].title}
        </Heading>
        <Text
          fontSize="14px"
          color="#000000"
          p="3%"
          style={{ textAlign: "center" }}
        >
          {data.quiz[quizSlide].subHeading}
        </Text>
      </div>
    );
  };

  getCard = (data, key, value) => {
    return (
      <Div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          border: "1px solid #707070",
          borderRadius: "10px",
          justifyContent: "space-between",
          width: "250px",
          position: "relative"
        }}
        pb="0px"
        m="0px 0.5rem"
        p="1rem 2rem"
        onClick={() =>
          this.setState({
            sizeUrl: key == "size" ? data.urlName : this.state.sizeUrl,
            [key]: data.name
          })
        }
      >
        <Image src={data.image} alt={data.name} />
        <Text ta="center" style={{ marginTop: "10px", fontSize: "14px" }}>
          {data.name}
        </Text>
        {value === data.name ? (
          <Image
            src={select}
            alt="select icon"
            style={{
              position: "absolute",
              top: "5px",
              right: "5px",
              width: "25px"
            }}
          />
        ) : null}
      </Div>
    );
  };

  render() {
    const { data } = this.props;
    const { quizSlide, size, position, feel } = this.state;
    return (
      <Div>
        <div
          style={{
            textAlign: "center",
            fontSize: "22px",
            fontWeight: 600,
            padding: "30x"
          }}
        >
          {data.title}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            padding: "2% 7%"
          }}
        >
          <div style={{ width: "64%" }}>
            <img
              src={data.bannerimage}
              alt="banner image"
              style={{ width: "100%" }}
            />
          </div>
          <Div
            style={{
              width: "34%",
              backgroundColor: "#EBF2F5",
              padding: "4%"
            }}
          >
            <Div
              onClick={() => this.handleQuizModal()}
              style={{ cursor: "pointer" }}
            >
              <Image src={data.image} alt={data.title} width="100%" />
            </Div>
          </Div>
        </div>
        <ResponsiveModal
          classNames={{ modal: "mattressModal" }}
          onCloseModal={this.handleModal}
          open={this.state.open}
        >
          <Div pb="2rem">
            {this.getHeading()}
            {quizSlide === "size" && (
              <Div>
                <Div
                  p="0px 2rem"
                  mb="1rem"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  {data.quiz.size.values.display1
                    ? this.getCard(
                        {
                          urlName: data.quiz.size.values.urlName1,
                          name: data.quiz.size.values.name1,
                          image: data.quiz.size.values.image1
                        },
                        "size",
                        size
                      )
                    : null}
                  {data.quiz.size.values.display2
                    ? this.getCard(
                        {
                          urlName: data.quiz.size.values.urlName2,
                          name: data.quiz.size.values.name2,
                          image: data.quiz.size.values.image2
                        },
                        "size",
                        size
                      )
                    : null}
                </Div>
                <Div
                  p="0px 2rem"
                  mb="1rem"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  {data.quiz.size.values.display3
                    ? this.getCard(
                        {
                          urlName: data.quiz.size.values.urlName3,
                          name: data.quiz.size.values.name3,
                          image: data.quiz.size.values.image3
                        },
                        "size",
                        size
                      )
                    : null}
                  {data.quiz.size.values.name4
                    ? this.getCard(
                        {
                          urlName: data.quiz.size.values.urlName4,
                          name: data.quiz.size.values.name4,
                          image: data.quiz.size.values.image4
                        },
                        "size",
                        size
                      )
                    : null}
                </Div>
              </Div>
            )}
            {quizSlide === "position" && (
              <Div>
                <Div
                  p="0px 2rem"
                  mb="1rem"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  {data.quiz.position.values.display1
                    ? this.getCard(
                        {
                          urlName: data.quiz.position.values.urlName1,
                          name: data.quiz.position.values.name1,
                          image: data.quiz.position.values.image1
                        },
                        "position",
                        position
                      )
                    : null}
                  {data.quiz.position.values.display2
                    ? this.getCard(
                        {
                          urlName: data.quiz.position.values.urlName2,
                          name: data.quiz.position.values.name2,
                          image: data.quiz.position.values.image2
                        },
                        "position",
                        position
                      )
                    : null}
                </Div>
                <Div
                  p="0px 2rem"
                  mb="1rem"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  {data.quiz.position.values.name3
                    ? this.getCard(
                        {
                          urlName: data.quiz.position.values.urlName3,
                          name: data.quiz.position.values.name3,
                          image: data.quiz.position.values.image3
                        },
                        "position",
                        position
                      )
                    : null}
                  {data.quiz.position.values.display4
                    ? this.getCard(
                        {
                          urlName: data.quiz.position.values.urlName4,
                          name: data.quiz.position.values.name4,
                          image: data.quiz.position.values.image4
                        },
                        "position",
                        position
                      )
                    : null}
                </Div>
              </Div>
            )}
            {quizSlide === "feel" && (
              <Div>
                <Div
                  p="0px 2rem"
                  mb="1rem"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  {/* {data.quiz.feel.values.display1 && position === 'Toss & Turn' ? ( */}
                  {data.quiz.feel.values.display1 && position !== "Back"
                    ? this.getCard(
                        {
                          urlName: data.quiz.feel.values.urlName1,
                          name: data.quiz.feel.values.name1,
                          image: data.quiz.feel.values.image1
                        },
                        "feel",
                        feel
                      )
                    : null}
                  {/* {data.quiz.feel.values.display2 && position === 'Toss & Turn' ? ( */}
                  {data.quiz.feel.values.display2 && position !== "Back"
                    ? this.getCard(
                        {
                          urlName: data.quiz.feel.values.urlName2,
                          name: data.quiz.feel.values.name2,
                          image: data.quiz.feel.values.image2
                        },
                        "feel",
                        feel
                      )
                    : null}
                </Div>
                <Div
                  p="0px 2rem"
                  mb="1rem"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  {data.quiz.feel.values.display3
                    ? this.getCard(
                        {
                          urlName: data.quiz.feel.values.urlName3,
                          name: data.quiz.feel.values.name3,
                          image: data.quiz.feel.values.image3
                        },
                        "feel",
                        feel
                      )
                    : null}
                  {data.quiz.feel.values.name4 && position !== "Toss & Turn"
                    ? this.getCard(
                        {
                          urlName: data.quiz.feel.values.urlName4,
                          name: data.quiz.feel.values.name4,
                          image: data.quiz.feel.values.image4
                        },
                        "feel",
                        feel
                      )
                    : null}
                </Div>
              </Div>
            )}
            {this.getButton()}
          </Div>
        </ResponsiveModal>
      </Div>
    );
  }
}

export default MattressForSleep;
