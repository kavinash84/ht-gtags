import React, { Component } from "react";
const styles = require("./PlanYourKitchen.scss");
import { connect } from "react-redux";
import Box from "hometown-components-dev/lib/BoxHtV1";
import Row from "hometown-components-dev/lib/RowHtV1";
import Div from "hometown-components-dev/lib/BoxHtV1";
import Heading from "hometown-components-dev/lib/HeadingHtV1";
import Text from "hometown-components-dev/lib/TextHtV1";
import Img from "hometown-components-dev/lib/ImageHtV1";
import SlickSlider from "../SlickSlider";
const style = require("./PlanYourKitchen.scss");

const LeftArrow = require("../../../static/new-home/roundedArrowLeft.svg");
const RightArrow = require("../../../static/new-home/roundedArrowRight.svg");
function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <React.Fragment>
      <img
        className={className}
        src={RightArrow}
        onClick={onClick}
        style={{ ...style, marginRight: "-3%", width: "15px" }}
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
        style={{ ...style, marginLeft: "-6%", width: "15px" }}
      />
    </React.Fragment>
  );
}
const adjustSlides = length => ({
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 5000,
  infinite: true,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />
});
const adjustSlidesitems = length => ({
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 5000,
  infinite: true,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />
});
@connect(({ planyourkitchen }) => ({
  planyourkitchen,
  stepOne: planyourkitchen.data.items.text.stepOne,
  stepTwo: planyourkitchen.data.items.text.stepTwo,
  stepThree: planyourkitchen.data.items.text.stepThree,
  stepFour: planyourkitchen.data.items.text.stepFour,
  stepFive: planyourkitchen.data.items.text.stepFive,
  stepSix: planyourkitchen.data.items.text.stepSix,
  stepSeven: planyourkitchen.data.items.text.stepSeven,
  stepEight: planyourkitchen.data.items.text.stepEight
}))
class StepsToPlanYourKitchen extends React.Component {
  render() {
    const {
      stepOne,
      stepTwo,
      stepThree,
      stepFour,
      stepFive,
      stepSix,
      stepSeven,
      stepEight
    } = this.props;
    return (
      <Div display="block">
        {/* step one */}
        <Div mt="90px">
          <Heading
            ta="center"
            pt="15px"
            pb="20px"
            m="auto"
            mb="0px"
            textAlign="center"
            fontSize="20px"
            style={{
              backgroundColor: "#252525",
              width: "25%",
              borderRadius: "15px 15px 0px 0px",
              color: "#FFFFFF"
            }}
          >
            {stepOne.step}
          </Heading>
          <Div
            style={{
              backgroundImage: "linear-gradient(to bottom, #F8F8F8, #FFFFFF)"
            }}
          >
            <Heading
              ta="center"
              pt="30px"
              pb="20px"
              color="#323131"
              fontWeight="bold"
              fontSize="30px"
              fontFamily="regular"
              textAlign="center"
            >
              {stepOne.title}
            </Heading>
            <Text
              p="0px 10% 20px"
              ta="center"
              color="#888888"
              fontSize="18px"
              textAlign="center"
              style={{
                lineHeight: "24px"
              }}
            >
              {stepOne.description}
            </Text>
          </Div>
          <div style={{ position: "relative", top: "0" }}>
            <Img
              data-src={stepOne.image}
              src={`${stepOne.image}?blur=30`}
              alt="Determine your need"
              style={{ width: "100%" }}
              zIndex="10"
            />
          </div>
          <Div
            style={{ position: "relative", top: "-100px" }}
            p="30px"
            pr="0px"
            className="offset"
            display="flex"
            alignItems="center"
            justifyContent="center"
            width="80%"
            ml="10%"
            mr="10%"
          >
            {stepOne.data.map((data, index) => (
              <Div pr="30px" width="30%" key={index}>
                <Div
                  bg="#F5F5F5"
                  p="20px"
                  pt="30px"
                  style={{ height: "300px" }}
                >
                  <Div>
                    <Img
                      m="auto"
                      style={{
                        width: "34px",
                        height: "auto",
                        display: "block"
                      }}
                      data-src={data.icon}
                      src={`${data.icon}?blur=30`}
                      alt={data.title}
                    />
                  </Div>

                  <Heading
                    color="#323131"
                    fontSize="18px"
                    mt="30px"
                    mb="15px"
                    style={{
                      textAlign: "center",
                      whiteSpace: "normal",
                      overflow: "visible"
                    }}
                  >
                    {data.title}
                  </Heading>
                  <Text
                    pb="20px"
                    color="#888888"
                    fontSize="14px"
                    style={{ lineHeight: "20px", textAlign: "center" }}
                  >
                    {data.description}
                  </Text>
                </Div>
              </Div>
            ))}
          </Div>
        </Div>
        {/* step 2 */}
        <Div mt="0px">
          <Heading
            ta="center"
            pt="15px"
            pb="20px"
            m="auto"
            mb="0px"
            textAlign="center"
            fontSize="20px"
            style={{
              backgroundColor: "#252525",
              width: "25%",
              borderRadius: "15px 15px 0px 0px",
              color: "#FFFFFF"
            }}
          >
            {stepTwo.step}
          </Heading>
          <Div
            style={{
              backgroundImage: "linear-gradient(to bottom, #F8F8F8, #FFFFFF)"
            }}
          >
            <Heading
              ta="center"
              pt="30px"
              pb="20px"
              color="#323131"
              fontWeight="bold"
              fontSize="30px"
              fontFamily="regular"
              textAlign="center"
            >
              {stepTwo.title}
            </Heading>
            <Text
              p="0px 10% 20px"
              ta="center"
              color="#888888"
              fontSize="18px"
              textAlign="center"
              style={{
                lineHeight: "24px"
              }}
            >
              {stepTwo.description}
            </Text>
          </Div>
          <div
            style={{
              justifyContent: "space-between",
              alignContent: "center",
              display: "flex",
              width: "80%",
              marginLeft: "10%",
              marginRight: "10%",
              marginBottom: "5%",
              marginTop: "2%"
            }}
          >
            <Div style={{ width: "48%" }}>
              <Img
                m="auto"
                mb="20px"
                data-src={stepTwo.principleOne.image}
                src={`${stepTwo.principleOne.image}?blur=30`}
                alt="5 zone principle"
              />
              <Text
                p="10px 0 "
                ta="center"
                color="#323131"
                fontSize="18px"
                fontFamily="regular"
                style={{ fontWeight: "bold" }}
              >
                {stepTwo.principleOne.title}
              </Text>
              <Text
                ta="center"
                color="#888888"
                fontSize="14px"
                style={{
                  lineHeight: "20px"
                }}
              >
                {stepTwo.principleOne.description}
              </Text>
            </Div>

            <Div style={{ width: "48%" }}>
              <Img
                m="auto"
                mb="20px"
                data-src={stepTwo.principleTwo.image}
                src={`${stepTwo.principleTwo.image}?blur=30`}
                alt="3C principle"
              />
              <Text
                ta="center"
                color="#323131"
                fontSize="18px"
                fontFamily="regular"
                style={{ fontWeight: "bold" }}
              >
                {stepTwo.principleTwo.title}
              </Text>
              <Text
                pt="10px"
                ta="center"
                color="#888888"
                fontSize="14px"
                style={{
                  lineHeight: "20px"
                }}
              >
                {stepTwo.principleTwo.description}
              </Text>
            </Div>
          </div>
          <div style={{ backgroundColor: "#F7F0F0" }}>
            <Div p="30px" ml="5%" pr="0px" style={{ width: "90%" }}>
              <Heading
                ml="5%"
                ta="left"
                color="#323131"
                fontSize="25px"
                mt="10px"
                mb="20px"
                style={{
                  whiteSpace: "normal",
                  overflow: "visible"
                }}
              >
                {stepTwo.data.title}
              </Heading>
              <Div className="offset" width="90%" ml="5%">
                <SlickSlider settings={adjustSlides(8)}>
                  {stepTwo.data.carouselData.map((data, index) => (
                    <Div width="95%" pr="30px" key={index} height="560px">
                      <Div pt="10px">
                        <Div>
                          <Img mb="10px" data-src={data.image} src={`${data.image}?blur=30`} alt={data.title} />
                        </Div>

                        <div
                          style={{
                            backgroundColor: "#fff",
                            marginTop: "-5%",

                            padding: "10px 10px",
                            height: "200px"
                          }}
                        >
                          <Text
                            ta="center"
                            color="#323131"
                            fontWeight="bolder"
                            fontSize="23px"
                            mb="20px"
                            style={{ fontWeight: "bold", textAlign: "center" }}
                          >
                            {data.title}
                          </Text>

                          <Text
                            ta="center"
                            mb="20px"
                            color="#888888"
                            fontSize="16px"
                            style={{ lineHeight: "22px", textAlign: "center" }}
                          >
                            {data.description}
                          </Text>
                        </div>
                      </Div>
                    </Div>
                  ))}
                </SlickSlider>
              </Div>
            </Div>
          </div>
        </Div>

        {/* step 3 */}
        <Div mt="100px">
          <Heading
            ta="center"
            pt="15px"
            pb="20px"
            m="auto"
            mb="0px"
            textAlign="center"
            fontSize="20px"
            style={{
              backgroundColor: "#252525",
              width: "25%",
              borderRadius: "15px 15px 0px 0px",
              color: "#FFFFFF"
            }}
          >
            {stepThree.step}
          </Heading>
          <Div
            style={{
              backgroundColor: "#E4E4E4"
            }}
          >
            <Heading
              ta="center"
              pt="30px"
              pb="20px"
              color="#323131"
              fontWeight="bold"
              fontSize="30px"
              fontFamily="regular"
              textAlign="center"
            >
              {stepThree.title}
            </Heading>
            <Text
              p="0px 10% 20px"
              ta="center"
              color="#888888"
              fontSize="18px"
              textAlign="center"
              style={{
                lineHeight: "24px"
              }}
            >
              {stepThree.description}
            </Text>
          </Div>

          <Div
            p="20px"
            pb="0px"
            ml="10%"
            pr="0px"
            style={{ width: "80%" }}
            className="offset"
          >
            <Heading
              ta="left"
              color="#323131"
              fontSize="25px"
              mt="30px"
              mb="20px"
              style={{
                whiteSpace: "normal",
                overflow: "visible"
              }}
            >
              {stepThree.dataOne.title}
            </Heading>
            <Text
              pb="10px"
              ta="left"
              color="#888888"
              fontSize="16px"
              style={{
                lineHeight: "22px"
              }}
            >
              {stepThree.dataOne.description}
            </Text>
            <SlickSlider settings={adjustSlidesitems(8)}>
              {stepThree.dataOne.carouselData.map((data, index) => (
                <Div pr="30px" key={index}>
                  <Div pt="10px">
                    <Div>
                      <Img mb="10px" data-src={data.image} src={`${data.image}?blur=30`} alt={data.title} />
                    </Div>

                    <Text
                      ta="left"
                      mt="20px"
                      mb="40px"
                      pt="20px"
                      color="#323131"
                      style={{ fontWeight: "bold" }}
                      fontSize="20px"
                    >
                      {data.title}
                    </Text>
                    {/* <Text
                      ta="left"
                      color="#707070"
                      mb="30px"
                      mt="10px"
                      fontSize="14px"
                      style={{ lineHeight: "14px" }}
                    >
                      {data.description}
                    </Text> */}
                  </Div>
                </Div>
              ))}
            </SlickSlider>
          </Div>
          <div style={{ backgroundColor: "#F7F0F0" }}>
            <Div
              p="20px"
              pb="0px"
              ml="10%"
              pr="0px"
              mt="30px"
              style={{ width: "80%" }}
              className="offset"
            >
              <Heading
                ta="left"
                color="#323131"
                fontSize="25px"
                mt="20px"
                mb="20px"
                style={{
                  whiteSpace: "normal",
                  overflow: "visible"
                }}
              >
                {stepThree.dataTwo.title}
              </Heading>

              <Text
                pb="10px"
                ta="left"
                color="#888888"
                fontSize="16px"
                style={{
                  lineHeight: "22px"
                }}
              >
                {stepThree.dataTwo.description}
              </Text>
              <SlickSlider settings={adjustSlidesitems(8)}>
                {stepThree.dataTwo.carouselData.map((data, index) => (
                  <Div pr="30px" key={index}>
                    <Div pt="10px">
                      <Div>
                        <Img mb="10px" data-src={data.image} src={`${data.image}?blur=30`} alt={data.title} />
                      </Div>

                      <Text
                        mt="20px"
                        ta="left"
                        color="#323131"
                        style={{ fontWeight: "bold" }}
                        fontSize="20px"
                        mb="40px"
                      >
                        {data.title}
                      </Text>
                      {/* <Text
                        ta="left"
                        color="#707070"
                        mb="30px"
                        mt="10px"
                        fontSize="14px"
                        style={{ lineHeight: "14px" }}
                      >
                        {data.description}
                      </Text> */}
                    </Div>
                  </Div>
                ))}
              </SlickSlider>
            </Div>
          </div>
        </Div>
        {/* step 4 */}
        <Div mt="100px">
          <Heading
            ta="center"
            pt="15px"
            pb="20px"
            m="auto"
            mb="0px"
            textAlign="center"
            fontSize="20px"
            style={{
              backgroundColor: "#252525",
              width: "25%",
              borderRadius: "15px 15px 0px 0px",
              color: "#FFFFFF"
            }}
          >
            {stepFour.step}
          </Heading>
          <Div
            style={{
              backgroundImage: "linear-gradient(to bottom, #F8F8F8, #FFFFFF)"
            }}
          >
            <Heading
              ta="center"
              pt="30px"
              pb="20px"
              color="#323131"
              fontWeight="bold"
              fontSize="30px"
              fontFamily="regular"
              textAlign="center"
            >
              {stepFour.title}
            </Heading>
            <Text
              p="0px 10% 20px"
              ta="center"
              color="#888888"
              fontSize="18px"
              textAlign="center"
              style={{
                lineHeight: "24px"
              }}
            >
              {stepFour.description}
            </Text>
          </Div>

          <Row
            justifyContent="center"
            ml="-5px"
            mr="-5px"
            mt="25px"
            width="80%"
            margin="1% 10%"
          >
            <Box style={{ width: "25%" }} height="100%" p="2px" mb="5px">
              <Box
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "flex-end"
                }}
                height="100%"
              >
                <Img
                  data-src={stepFour.data.imageOne.image}
                  src={`${stepFour.data.imageOne.image}?blur=30`}
                  alt="hello"
                  width="90%"
                  height="auto"
                />

                <div className={style.textWrapper}>
                  {stepFour.data.imageOne.title}
                </div>
              </Box>
            </Box>

            <Box style={{ width: "25%" }} height="100%" p="2px" mb="5px">
              <Box
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "flex-end"
                }}
                height="100%"
              >
                <Img
                  data-src={stepFour.data.imageTwo.image}
                  src={`${stepFour.data.imageTwo.image}?blur=30`}
                  alt="hello"
                  width="90%"
                  height="auto"
                />

                <div className={style.textWrapper}>
                  {stepFour.data.imageTwo.title}
                </div>
              </Box>
            </Box>
            <Box style={{ width: "25%" }} height="100%" p="2px" mb="5px">
              <Box
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "flex-end"
                }}
                height="100%"
              >
                <Img
                  data-src={stepFour.data.imageThree.image}
                  src={`${stepFour.data.imageThree.image}?blur=30`}
                  alt="hello"
                  width="90%"
                  height="auto"
                />

                <div className={style.textWrapper}>
                  {stepFour.data.imageThree.title}
                </div>
              </Box>
            </Box>

            <Box style={{ width: "25%" }} height="100%" p="2px" mb="5px">
              <Box
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "flex-end"
                }}
                height="100%"
              >
                <Img
                  data-src={stepFour.data.imageFour.image}
                  src={`${stepFour.data.imageFour.image}?blur=30`}
                  alt="hello"
                  width="90%"
                  height="auto"
                />

                <div className={style.textWrapper}>
                  {stepFour.data.imageFour.title}
                </div>
              </Box>
            </Box>
          </Row>

          <Row
            justifyContent="center"
            ml="-5px"
            mr="-5px"
            mt="35px"
            width="80%"
            margin="3% 10%"
          >
            <Box style={{ width: "25%" }} height="100%" p="2px" mb="5px">
              <Box
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "flex-end"
                }}
                height="100%"
              >
                <Img
                  data-src={stepFour.data.imageFive.image}
                  src={`${stepFour.data.imageFive.image}?blur=30`}
                  alt="hello"
                  width="90%"
                  height="auto"
                />

                <div className={style.textWrapper}>
                  {stepFour.data.imageFive.title}
                </div>
              </Box>
            </Box>

            <Box style={{ width: "25%" }} height="100%" p="2px" mb="5px">
              <Box
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "flex-end"
                }}
                height="100%"
              >
                <Img
                  data-src={stepFour.data.imageSix.image}
                  src={`${stepFour.data.imageSix.image}?blur=30`}
                  alt="hello"
                  width="90%"
                  height="auto"
                />

                <div className={style.textWrapper}>
                  {stepFour.data.imageSix.title}
                </div>
              </Box>
            </Box>
            <Box style={{ width: "25%" }} height="100%" p="2px" mb="5px">
              <Box
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "flex-end"
                }}
                height="100%"
              >
                <Img
                  data-src={stepFour.data.imageSeven.image}
                  src={`${stepFour.data.imageSeven.image}?blur=30`}
                  alt="hello"
                  width="90%"
                  height="auto"
                />

                <div className={style.textWrapper}>
                  {stepFour.data.imageSeven.title}
                </div>
              </Box>
            </Box>

            <Box style={{ width: "25%" }} height="100%" p="2px" mb="5px">
              <Box
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "flex-end"
                }}
                height="100%"
              >
                <Img
                  data-src={stepFour.data.imageEight.image}
                  src={`${stepFour.data.imageEight.image}?blur=30`}
                  alt="hello"
                  width="90%"
                  height="auto"
                />

                <div className={style.textWrapper}>
                  {stepFour.data.imageEight.title}
                </div>
              </Box>
            </Box>
          </Row>
        </Div>
        {/* step 5 */}
        <Div mt="100px">
          <Heading
            ta="center"
            pt="15px"
            pb="20px"
            m="auto"
            mb="0px"
            textAlign="center"
            fontSize="20px"
            style={{
              backgroundColor: "#252525",
              width: "25%",
              borderRadius: "15px 15px 0px 0px",
              color: "#FFFFFF"
            }}
          >
            {stepFive.step}
          </Heading>
          <Div
            style={{
              backgroundImage: "linear-gradient(to bottom, #F8F8F8, #FFFFFF)"
            }}
          >
            <Heading
              ta="center"
              pt="30px"
              pb="20px"
              color="#323131"
              fontWeight="bold"
              fontSize="30px"
              fontFamily="regular"
              textAlign="center"
            >
              {stepFive.title}
            </Heading>
            <Text
              p="0px 10% 20px"
              ta="center"
              color="#888888"
              fontSize="18px"
              textAlign="center"
              style={{
                lineHeight: "24px"
              }}
            >
              {stepFive.description}
            </Text>
          </Div>

          <Div
            p="20px"
            pb="0"
            ml="10%"
            pr="0px"
            // bg="#F7F0F0"
            style={{ width: "80%" }}
            className="offset"
          >
            <Heading
              ta="left"
              color="#323131"
              fontSize="25px"
              mt="20px"
              style={{
                whiteSpace: "normal",
                overflow: "visible"
              }}
            >
              {stepFive.dataOne.title}
            </Heading>

            <Text
              pb="16px"
              pt="16px"
              ta="left"
              color="#888888"
              fontSize="16px"
              style={{
                lineHeight: "20px"
              }}
            >
              {stepFive.dataOne.description}
            </Text>
            <SlickSlider settings={adjustSlidesitems(8)}>
              {stepFive.dataOne.carouselData.map((data, index) => (
                <Div pr="30px" key={index}>
                  <Div pt="1px">
                    <Div>
                      <Img mb="10px" data-src={data.image} src={`${data.image}?blur=30`} alt={data.title} />
                    </Div>

                    <Text
                      ta="left"
                      color="#323131"
                      style={{ fontWeight: "bold", marginBottom: "20px" }}
                      fontSize="25px"
                    >
                      {data.title}
                    </Text>
                    {/* <Text
                      ta="left"
                      color="#707070"
                      mb="30px"
                      mt="10px"
                      fontSize="14px"
                      style={{ lineHeight: "14px" }}
                    >
                      {data.description}
                    </Text> */}
                  </Div>
                </Div>
              ))}
            </SlickSlider>
          </Div>
          <div style={{ backgroundColor: "#F7F0F0" }}>
            <Div
              p="20px"
              ml="10%"
              pb="0"
              pr="0px"
              mt="30px"
              style={{ width: "80%" }}
              className="offset"
            >
              <Heading
                ta="left"
                color="#323131"
                fontSize="25px"
                mt="20px"
                style={{
                  whiteSpace: "normal",
                  overflow: "visible"
                }}
              >
                {stepFive.dataTwo.title}
              </Heading>

              <Text
                pb="16px"
                pt="16px"
                ta="left"
                color="#888888"
                fontSize="16px"
                style={{
                  lineHeight: "20px"
                }}
              >
                {stepFive.dataTwo.description}
              </Text>
              <SlickSlider settings={adjustSlidesitems(8)}>
                {stepFive.dataTwo.carouselData.map((data, index) => (
                  <Div pr="30px" key={index}>
                    <Div pt="10px">
                      <Div>
                        <Img mb="50px" data-src={data.image} src={`${data.image}?blur=30`} alt={data.title} />
                      </Div>
                    </Div>
                  </Div>
                ))}
              </SlickSlider>
            </Div>
          </div>
        </Div>
        {/* step 6 */}
        <Div mt="100px">
          <Heading
            ta="center"
            pt="15px"
            pb="20px"
            m="auto"
            mb="0px"
            textAlign="center"
            fontSize="20px"
            style={{
              backgroundColor: "#252525",
              width: "25%",
              borderRadius: "15px 15px 0px 0px",
              color: "#FFFFFF"
            }}
          >
            {stepSix.step}
          </Heading>
          <Div
            style={{
              backgroundImage: "linear-gradient(to bottom, #F8F8F8, #FFFFFF)"
            }}
          >
            <Heading
              ta="center"
              pt="30px"
              pb="20px"
              color="#323131"
              fontWeight="bold"
              fontSize="30px"
              fontFamily="regular"
              textAlign="center"
            >
              {stepSix.title}
            </Heading>
            <Text
              p="0px 10% 20px"
              ta="center"
              color="#888888"
              fontSize="18px"
              textAlign="center"
              style={{
                lineHeight: "24px"
              }}
            >
              {stepSix.description}
            </Text>
          </Div>
          <Div>
            <Img data-src={stepSix.image} src={`${stepSix.image}?blur=30`} alt="top banner" height="auto" />
          </Div>
        </Div>
        {/* step 7 */}
        <Div mt="100px" mb="30px">
          <Heading
            ta="center"
            pt="15px"
            pb="20px"
            m="auto"
            mb="0px"
            textAlign="center"
            fontSize="20px"
            style={{
              backgroundColor: "#252525",
              width: "25%",
              borderRadius: "15px 15px 0px 0px",
              color: "#FFFFFF"
            }}
          >
            {stepSeven.step}
          </Heading>
          <Div
            style={{
              backgroundImage: "linear-gradient(to bottom, #F8F8F8, #FFFFFF)"
            }}
          >
            <Heading
              ta="center"
              pt="30px"
              pb="20px"
              color="#323131"
              fontWeight="bold"
              fontSize="30px"
              fontFamily="regular"
              textAlign="center"
            >
              {stepSeven.title}
            </Heading>
            <Text
              p="0px 10% 20px"
              ta="center"
              color="#888888"
              fontSize="18px"
              textAlign="center"
              style={{
                lineHeight: "24px"
              }}
            >
              {stepSeven.description}
            </Text>
          </Div>

          <Row justifyContent="center" ml="10%" mr="10%" mt="25px" width="80%">
            <Box style={{ width: "30%" }} height="100%" p="2px" mb="5px">
              <Box
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "flex-end"
                }}
                height="100%"
              >
                <Img
                  data-src={stepSeven.dataOne.imageOne.image}
                  src={`${stepSeven.dataOne.imageOne.image}?blur=30`}
                  alt="hello"
                  width="90%"
                  height="auto"
                />

                <div className={style.textWrapper}>
                  {stepSeven.dataOne.imageOne.title}
                </div>
              </Box>
            </Box>

            <Box style={{ width: "30%" }} height="100%" p="2px" mb="5px">
              <Box
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "flex-end"
                }}
                height="100%"
              >
                <Img
                  data-src={stepSeven.dataOne.imageTwo.image}
                  src={`${stepSeven.dataOne.imageTwo.image}?blur=30`}
                  alt="hello"
                  width="90%"
                  height="auto"
                />

                <div className={style.textWrapper}>
                  {stepSeven.dataOne.imageTwo.title}
                </div>
              </Box>
            </Box>
            <Box style={{ width: "30%" }} height="100%" p="2px" mb="5px">
              <Box
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "flex-end"
                }}
                height="100%"
              >
                <Img
                  data-src={stepSeven.dataOne.imageThree.image}
                  src={`${stepSeven.dataOne.imageThree.image}?blur=30`}
                  alt="hello"
                  width="90%"
                  height="auto"
                />

                <div className={style.textWrapper}>
                  {stepSeven.dataOne.imageThree.title}
                </div>
              </Box>
            </Box>
          </Row>

          <Row justifyContent="center" ml="10%" mr="10%" mt="25px" width="80%">
            <Box style={{ width: "30%" }} height="100%" p="2px" mb="5px">
              <Box
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "flex-end"
                }}
                height="100%"
              >
                <Img
                  data-src={stepSeven.dataOne.imageFour.image}
                  src={`${stepSeven.dataOne.imageFour.image}?blur=30`}
                  alt="hello"
                  width="90%"
                  height="auto"
                />

                <div className={style.textWrapper}>
                  {stepSeven.dataOne.imageFour.title}
                </div>
              </Box>
            </Box>
            <Box style={{ width: "30%" }} height="100%" p="2px" mb="5px">
              <Box
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "flex-end"
                }}
                height="100%"
              >
                <Img
                  data-src={stepSeven.dataOne.imageFive.image}
                  src={`${stepSeven.dataOne.imageFive.image}?blur=30`}
                  alt="hello"
                  width="90%"
                  height="auto"
                />

                <div className={style.textWrapper}>
                  {stepSeven.dataOne.imageFive.title}
                </div>
              </Box>
            </Box>

            <Box style={{ width: "30%" }} height="100%" p="2px" mb="5px">
              <Box
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "flex-end"
                }}
                height="100%"
              >
                <Img
                  data-src={stepSeven.dataOne.imageSix.image}
                  src={`${stepSeven.dataOne.imageSix.image}?blur=30`}
                  alt="hello"
                  width="90%"
                  height="auto"
                />

                <div className={style.textWrapper}>
                  {stepSeven.dataOne.imageSix.title}
                </div>
              </Box>
            </Box>
          </Row>
          <div style={{ backgroundColor: "#F7F0F0" }}>
            <Div
              p="20px"
              ml="10%"
              pb="0"
              pr="0px"
              mt="30px"
              style={{ width: "80%" }}
              className="offset"
            >
              <Heading
                ta="left"
                color="#323131"
                fontSize="25px"
                mt="20px"
                style={{
                  whiteSpace: "normal",
                  overflow: "visible"
                }}
              >
                {stepSeven.dataTwo.title}
              </Heading>

              <Text
                pb="16px"
                pt="16px"
                ta="left"
                color="#888888"
                fontSize="16px"
                style={{
                  lineHeight: "20px"
                }}
              >
                {stepSeven.dataTwo.description}
              </Text>
              <SlickSlider settings={adjustSlides(8)}>
                {stepSeven.dataTwo.carouselData.map((data, index) => (
                  <Div pr="30px" key={index}>
                    <Div pt="10px">
                      <Div>
                        <Img mb="10px" data-src={data.image} src={`${data.image}?blur=30`} alt={data.title} />
                      </Div>

                      <Text
                        mt="20px"
                        ta="left"
                        color="#323131"
                        style={{ fontWeight: "bold" }}
                        fontSize="20px"
                        mb="40px"
                      >
                        {data.title}
                      </Text>
                      {/* <Text
                        ta="left"
                        color="#707070"
                        mb="30px"
                        mt="10px"
                        fontSize="14px"
                        style={{ lineHeight: "14px" }}
                      >
                        {data.description}
                      </Text> */}
                    </Div>
                  </Div>
                ))}
              </SlickSlider>
            </Div>
          </div>
        </Div>
        {/* step 8 */}
        <Div mt="90px">
          <Heading
            ta="center"
            pt="15px"
            pb="20px"
            m="auto"
            mb="0px"
            textAlign="center"
            fontSize="20px"
            style={{
              backgroundColor: "#252525",
              width: "25%",
              borderRadius: "15px 15px 0px 0px",
              color: "#FFFFFF"
            }}
          >
            {stepEight.step}
          </Heading>
          <Div
            style={{
              backgroundImage: "linear-gradient(to bottom, #F8F8F8, #FFFFFF)"
            }}
          >
            <Heading
              ta="center"
              pt="30px"
              pb="20px"
              color="#323131"
              fontWeight="bold"
              fontSize="30px"
              fontFamily="regular"
              textAlign="center"
            >
              {stepEight.title}
            </Heading>
            <Text
              p="0px 10% 20px"
              ta="center"
              color="#888888"
              fontSize="18px"
              textAlign="center"
              style={{
                lineHeight: "24px"
              }}
            >
              {stepEight.description}
            </Text>
          </Div>

          <Row justifyContent="center" ml="10%" mr="10%" mt="25px" width="80%">
            <Box style={{ width: "30%" }} height="100%" p="2px" mb="5px">
              <Box
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "flex-end"
                }}
                height="100%"
              >
                <Img
                  data-src={stepEight.data.imageOne.image}
                  src={`${stepEight.data.imageOne.image}?blur=30`}
                  alt="hello"
                  width="90%"
                  height="auto"
                />

                <div className={style.textWrapper}>
                  {stepEight.data.imageOne.title}
                </div>
              </Box>
            </Box>

            <Box style={{ width: "30%" }} height="100%" p="2px" mb="5px">
              <Box
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "flex-end"
                }}
                height="100%"
              >
                <Img
                  data-src={stepEight.data.imageTwo.image}
                  src={`${stepEight.data.imageTwo.image}?blur=30`}
                  alt="hello"
                  width="90%"
                  height="auto"
                />

                <div className={style.textWrapper}>
                  {stepEight.data.imageTwo.title}
                </div>
              </Box>
            </Box>
            <Box style={{ width: "30%" }} height="100%" p="2px" mb="5px">
              <Box
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "flex-end"
                }}
                height="100%"
              >
                <Img
                  data-src={stepEight.data.imageThree.image}
                  src={`${stepEight.data.imageThree.image}?blur=30`}
                  alt="hello"
                  width="90%"
                  height="auto"
                />

                <div className={style.textWrapper}>
                  {stepEight.data.imageThree.title}
                </div>
              </Box>
            </Box>
          </Row>

          <Row justifyContent="center" ml="10%" mr="10%" mt="25px" width="80%">
            <Box style={{ width: "30%" }} height="100%" p="2px" mb="5px">
              <Box
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "flex-end"
                }}
                height="100%"
              >
                <Img
                  data-src={stepEight.data.imageFour.image}
                  src={`${stepEight.data.imageFour.image}?blur=30`}
                  alt="hello"
                  width="90%"
                  height="auto"
                />

                <div className={style.textWrapper}>
                  {stepEight.data.imageFour.title}
                </div>
              </Box>
            </Box>
            <Box style={{ width: "30%" }} height="100%" p="2px" mb="5px">
              <Box
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "flex-end"
                }}
                height="100%"
              >
                <Img
                  data-src={stepEight.data.imageFive.image}
                  src={`${stepEight.data.imageFive.image}?blur=30`}
                  alt="hello"
                  width="90%"
                  height="auto"
                />

                <div className={style.textWrapper}>
                  {stepEight.data.imageFive.title}
                </div>
              </Box>
            </Box>

            <Box style={{ width: "30%" }} height="100%" p="2px" mb="5px">
              <Box
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "flex-end"
                }}
                height="100%"
              >
                <Img
                  data-src={stepEight.data.imageSix.image}
                  src={`${stepEight.data.imageSix.image}?blur=30`}
                  alt="hello"
                  width="90%"
                  height="auto"
                />

                <div className={style.textWrapper}>
                  {stepEight.data.imageSix.title}
                </div>
              </Box>
            </Box>
          </Row>
        </Div>
      </Div>
    );
  }
}

export default StepsToPlanYourKitchen;
