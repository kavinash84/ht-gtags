import React, { Component } from "react";
import createBrowserHistory from "history/createBrowserHistory";
import Heading from "hometown-components/lib/Heading";
import Div from "hometown-components/lib/Div";
import Img from "hometown-components/lib/Img";
import Text from "hometown-components/lib/Text";
import Buttons from "hometown-components/lib/Buttons";
import ResponsiveModal from "components/Modal";

const select = require("../../../static/mattresses/select.png");

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

  render() {
    const history = createBrowserHistory({ forceRefresh: true });
    const { data } = this.props;
    const { quizSlide, size, position, feel } = this.state;
    return (
      <Div>
        <Div
          mt="2rem"
          pt="1.5rem"
          style={{
            backgroundColor: "#EBF2F5"
          }}
        >
          <Heading
            mt="0.8rem"
            fontSize="22px"
            ta="center"
            p="0px 3rem"
            mb="5px"
            style={{
              fontWeight: "bold",
              color: "#323231",
              lineHeight: "36px",
              whiteSpace: "normal"
            }}
          >
            {data.title}
          </Heading>
          <div
            style={{
              width: "25px",
              borderTop: "2px solid #323231",
              margin: "auto"
            }}
          ></div>
          <Div p="0px 2rem" mt="1rem" onClick={() => this.handleQuizModal()}>
            <Img src={data.image} alt={data.title} width="100%" />
          </Div>
        </Div>
        <ResponsiveModal
          classNames={{ modal: "mkModal" }}
          onCloseModal={this.handleModal}
          open={this.state.open}
        >
          <Div pb="2rem">
            {quizSlide === "size" && (
              <Div>
                {/* <Div style={{
                                position: 'absolute',
                                top: '0',
                                zIndex: '10',
                                width: '15%'
                            }}>
                                <Text ta="center" fontSize="2rem" mt="0px" ml="0.5rem" mb="0px" color="black">←</Text>
                            </Div> */}
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
                  <ul>
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
                  pt="1.5rem"
                  fontSize="22px"
                  ta="center"
                  p="0px 3rem"
                  style={{
                    fontWeight: "bold",
                    color: "#000000",
                    lineHeight: "31px",
                    whiteSpace: "normal"
                  }}
                >
                  {data.quiz.size.title}
                </Heading>
                <Text ta="center" fontSize="14px" color="#666666">
                  {data.quiz.size.subHeading}
                </Text>
                <Div
                  p="0px 2rem"
                  mb="1rem"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  {data.quiz.size.values.display1 ? (
                    <Div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        border: "1px solid #707070",
                        borderRadius: "10px",
                        justifyContent: "space-between",
                        width: "250px"
                      }}
                      pb="0px"
                      m="0px 0.5rem"
                      p="1rem 2rem"
                      onClick={() =>
                        this.setState({
                          sizeUrl: data.quiz.size.values.urlName1,
                          size: data.quiz.size.values.name1
                        })
                      }
                    >
                      <Img
                        src={data.quiz.size.values.image1}
                        alt={data.quiz.size.values.name1}
                      />
                      <Text ta="center">{data.quiz.size.values.name1}</Text>
                      {size === data.quiz.size.values.name1 ? (
                        <Img
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
                  ) : null}
                  {data.quiz.size.values.display2 ? (
                    <Div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        border: "1px solid #707070",
                        borderRadius: "10px",
                        justifyContent: "space-between",
                        width: "250px"
                      }}
                      pb="0px"
                      m="0px 0.5rem"
                      p="1rem 2rem"
                      onClick={() =>
                        this.setState({
                          sizeUrl: data.quiz.size.values.urlName2,
                          size: data.quiz.size.values.name2
                        })
                      }
                    >
                      <Img
                        src={data.quiz.size.values.image2}
                        alt={data.quiz.size.values.name2}
                      />
                      <Text ta="center">{data.quiz.size.values.name2}</Text>
                      {size === data.quiz.size.values.name2 ? (
                        <Img
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
                  ) : null}
                </Div>
                <Div
                  p="0px 2rem"
                  mb="1rem"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  {data.quiz.size.values.display3 ? (
                    <Div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        border: "1px solid #707070",
                        borderRadius: "10px",
                        justifyContent: "space-between",
                        width: "250px"
                      }}
                      pb="0px"
                      m="0px 0.5rem"
                      p="1rem 2rem"
                      onClick={() =>
                        this.setState({
                          sizeUrl: data.quiz.size.values.urlName3,
                          size: data.quiz.size.values.name3
                        })
                      }
                    >
                      <Img
                        src={data.quiz.size.values.image3}
                        alt={data.quiz.size.values.name3}
                      />
                      <Text ta="center">{data.quiz.size.values.name3}</Text>
                      {size === data.quiz.size.values.name3 ? (
                        <Img
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
                  ) : null}
                  {data.quiz.size.values.name4 ? (
                    <Div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        border: "1px solid #707070",
                        borderRadius: "10px",
                        justifyContent: "space-between",
                        width: "250px"
                      }}
                      pb="0px"
                      m="0px 0.5rem"
                      p="1rem 2rem"
                      onClick={() =>
                        this.setState({
                          sizeUrl: data.quiz.size.values.urlName4,
                          size: data.quiz.size.values.name4
                        })
                      }
                    >
                      <Img
                        src={data.quiz.size.values.image4}
                        alt={data.quiz.size.values.name4}
                      />
                      <Text ta="center">{data.quiz.size.values.name4}</Text>
                      {size === data.quiz.size.values.name4 ? (
                        <Img
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
                  ) : null}
                </Div>
                <Div
                  style={{
                    display: "flex",
                    justifyContent: "center"
                  }}
                >
                  <Buttons
                    style={{
                      borderColor: "orangered",
                      color: "orangered",
                      padding: "0.5rem 4rem"
                    }}
                    disabled={!size}
                    onClick={() =>
                      this.setState({
                        quizSlide: "position"
                      })
                    }
                  >
                    Next
                  </Buttons>
                </Div>
              </Div>
            )}
            {quizSlide === "position" && (
              <Div>
                <Div
                  style={{
                    position: "absolute",
                    top: "0",
                    zIndex: "10",
                    width: "15%"
                  }}
                  onClick={() => this.setState({ quizSlide: "size" })}
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
                  <ul>
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
                  </ul>
                </Div>
                <Heading
                  mt="1rem"
                  pt="1.5rem"
                  fontSize="22px"
                  ta="center"
                  p="0px 3rem"
                  style={{
                    fontWeight: "bold",
                    color: "#000000",
                    lineHeight: "31px",
                    whiteSpace: "normal"
                  }}
                >
                  {data.quiz.position.title}
                </Heading>
                <Text ta="center" fontSize="14px" color="#666666">
                  {data.quiz.position.subHeading}
                </Text>
                <Div
                  p="0px 2rem"
                  mb="1rem"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  {data.quiz.position.values.display1 ? (
                    <Div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        border: "1px solid #707070",
                        borderRadius: "10px",
                        justifyContent: "space-between",
                        width: "50%"
                      }}
                      pb="0px"
                      m="0px 0.5rem"
                      p="1rem 2rem"
                      onClick={() =>
                        this.setState({
                          position: data.quiz.position.values.name1
                        })
                      }
                    >
                      <Img
                        src={data.quiz.position.values.image1}
                        alt={data.quiz.size.values.name1}
                        width="100%"
                      />
                      <Text ta="center">{data.quiz.position.values.name1}</Text>
                      {position === data.quiz.position.values.name1 ? (
                        <Img
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
                  ) : null}
                  {data.quiz.position.values.display2 ? (
                    <Div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        border: "1px solid #707070",
                        borderRadius: "10px",
                        justifyContent: "space-between",
                        width: "50%"
                      }}
                      pb="0px"
                      m="0px 0.5rem"
                      p="1rem 2rem"
                      onClick={() =>
                        this.setState({
                          position: data.quiz.position.values.name2
                        })
                      }
                    >
                      <Img
                        src={data.quiz.position.values.image2}
                        alt={data.quiz.size.values.name2}
                        width="100%"
                      />
                      <Text ta="center">{data.quiz.position.values.name2}</Text>
                      {position === data.quiz.position.values.name2 ? (
                        <Img
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
                  ) : null}
                </Div>
                <Div
                  p="0px 2rem"
                  mb="1rem"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  {data.quiz.position.values.name3 ? (
                    <Div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        border: "1px solid #707070",
                        borderRadius: "10px",
                        justifyContent: "space-between",
                        width: "50%"
                      }}
                      pb="0px"
                      m="0px 0.5rem"
                      p="1rem 2rem"
                      onClick={() =>
                        this.setState({
                          position: data.quiz.position.values.name3
                        })
                      }
                    >
                      <Img
                        src={data.quiz.position.values.image3}
                        alt={data.quiz.size.values.name3}
                        width="100%"
                      />
                      <Text ta="center">{data.quiz.position.values.name3}</Text>
                      {position === data.quiz.position.values.name3 ? (
                        <Img
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
                  ) : null}
                  {data.quiz.position.values.display4 ? (
                    <Div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        border: "1px solid #707070",
                        borderRadius: "10px",
                        justifyContent: "space-between",
                        width: "50%"
                      }}
                      pb="0px"
                      m="0px 0.5rem"
                      p="1rem 2rem"
                      onClick={() =>
                        this.setState({
                          size: data.quiz.position.values.name1
                        })
                      }
                    >
                      <Img
                        src={data.quiz.position.values.image4}
                        alt={data.quiz.size.values.name4}
                        width="100%"
                      />
                      <Text>{data.quiz.position.values.name4}</Text>
                      {position === data.quiz.position.values.name4 ? (
                        <Img
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
                  ) : null}
                </Div>
                <Div
                  style={{
                    display: "flex",
                    justifyContent: "center"
                  }}
                >
                  <Buttons
                    style={{
                      borderColor: "orangered",
                      color: "orangered",
                      padding: "0.5rem 4rem"
                    }}
                    disabled={!position}
                    onClick={() =>
                      this.setState({
                        quizSlide: "feel"
                      })
                    }
                  >
                    Next
                  </Buttons>
                </Div>
              </Div>
            )}
            {quizSlide === "feel" && (
              <Div>
                <Div
                  style={{
                    position: "absolute",
                    top: "0",
                    zIndex: "10",
                    width: "15%"
                  }}
                  onClick={() => this.setState({ quizSlide: "position" })}
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
                  <ul>
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
                  </ul>
                </Div>
                <Heading
                  mt="1rem"
                  pt="1.5rem"
                  fontSize="22px"
                  ta="center"
                  p="0px 3rem"
                  style={{
                    fontWeight: "bold",
                    color: "#000000",
                    lineHeight: "31px",
                    whiteSpace: "normal"
                  }}
                >
                  {data.quiz.feel.title}
                </Heading>
                <Text ta="center" fontSize="14px" color="#666666">
                  {data.quiz.feel.subHeading}
                </Text>
                <Div
                  p="0px 2rem"
                  mb="1rem"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  {/* {data.quiz.feel.values.display1 && position === 'Toss & Turn' ? ( */}
                  {data.quiz.feel.values.display1 && position !== "Back" ? (
                    <Div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        border: "1px solid #707070",
                        borderRadius: "10px",
                        justifyContent: "space-between",
                        width: "50%"
                      }}
                      pb="0px"
                      m="0px 0.5rem"
                      p="1rem 2rem"
                      onClick={() =>
                        this.setState({
                          feel: data.quiz.feel.values.name1
                        })
                      }
                    >
                      <Img
                        src={data.quiz.feel.values.image1}
                        alt={data.quiz.size.values.name1}
                        width="100%"
                      />
                      <Text ta="center">{data.quiz.feel.values.name1}</Text>
                      {feel === data.quiz.feel.values.name1 ? (
                        <Img
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
                  ) : null}
                  {/* {data.quiz.feel.values.display2 && position === 'Toss & Turn' ? ( */}
                  {data.quiz.feel.values.display2 && position !== "Back" ? (
                    <Div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        border: "1px solid #707070",
                        borderRadius: "10px",
                        justifyContent: "space-between",
                        width: "50%"
                      }}
                      pb="0px"
                      m="0px 0.5rem"
                      p="1rem 2rem"
                      onClick={() =>
                        this.setState({
                          feel: data.quiz.feel.values.name2
                        })
                      }
                    >
                      <Img
                        src={data.quiz.feel.values.image2}
                        alt={data.quiz.size.values.name2}
                        width="100%"
                      />
                      <Text ta="center">{data.quiz.feel.values.name2}</Text>
                      {feel === data.quiz.feel.values.name2 ? (
                        <Img
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
                  ) : null}
                </Div>
                <Div
                  p="0px 2rem"
                  mb="1rem"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  {/* {data.quiz.feel.values.display3 && (position === 'Side' || position === 'Back') ? ( */}
                  {data.quiz.feel.values.display3 ? (
                    //  &&
                    // (position === "Toss & Turn" ||
                    //   position === "Side" ||
                    //   position === "Back")
                    <Div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        border: "1px solid #707070",
                        borderRadius: "10px",
                        justifyContent: "space-between",
                        width: "50%"
                      }}
                      pb="0px"
                      m="0px 0.5rem"
                      p="1rem 2rem"
                      onClick={() =>
                        this.setState({
                          feel: data.quiz.feel.values.name3
                        })
                      }
                    >
                      <Img
                        src={data.quiz.feel.values.image3}
                        alt={data.quiz.size.values.name3}
                        width="100%"
                      />
                      <Text ta="center">{data.quiz.feel.values.name3}</Text>
                      {feel === data.quiz.feel.values.name3 ? (
                        <Img
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
                  ) : null}
                  {/* {data.quiz.feel.values.name4 && position === 'Back' ? ( */}
                  {data.quiz.feel.values.name4 && position !== "Toss & Turn" ? (
                    <Div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        border: "1px solid #707070",
                        borderRadius: "10px",
                        justifyContent: "space-between",
                        width: "50%"
                      }}
                      pb="0px"
                      m="0px 0.5rem"
                      p="1rem 2rem"
                      onClick={() =>
                        this.setState({
                          feel: data.quiz.feel.values.name4
                        })
                      }
                    >
                      <Img
                        src={data.quiz.feel.values.image4}
                        alt={data.quiz.size.values.name4}
                        width="100%"
                      />
                      <Text ta="center">{data.quiz.feel.values.name4}</Text>
                      {feel === data.quiz.feel.values.name4 ? (
                        <Img
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
                  ) : null}
                </Div>
                <Div
                  style={{
                    display: "flex",
                    justifyContent: "center"
                  }}
                >
                  <Buttons
                    style={{
                      borderColor: "orangered",
                      color: "orangered",
                      padding: "0.5rem 4rem"
                    }}
                    disabled={!feel}
                    onClick={() => {
                      if (
                        this.state.feel &&
                        this.state.position &&
                        this.state.size
                      ) {
                        history.push(
                          // `/furniture/mattresses?p=unbxd_category:"Furniture%3Bfurniture>Mattresses%3Bfurniture%2Fmattresses"&pagetype=boolean&facet.multilevel=unbxd_category&filter=comfort_level_uFilter:${
                          //   this.state.feel
                          // }&filter=sleeper_type_uFilter:${this.getSleeperType(
                          //   this.state.position,
                          //   this.state.feel
                          // )}&filter=mattress_size_uFilter:${this.state.size}&rows=20&view=grid&start=0`
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
                    }}
                  >
                    Submit
                  </Buttons>
                </Div>
              </Div>
            )}
          </Div>
        </ResponsiveModal>
      </Div>
    );
  }
}

export default MattressForSleep;
