// import React from "react";
// import { Link } from "react-router-dom";
// import Box from "hometown-components-dev/lib/BoxHtV1";
// import Div from "hometown-components-dev/lib/BoxHtV1";
// import Text from "hometown-components-dev/lib/TextHtV1";
// import HeadingHtV1 from "hometown-components-dev/lib/HeadingHtV1";
// import Image from "hometown-components-dev/lib/ImageHtV1";

// const styles = require("../Slider.scss");
// // const arrowForward = require("../../../static/newHomepage/newForwardArrow.svg");
// import "./CategoryCarousel.css";
// const DBItem = ({ component, data }) => {
//   return (
//     <Box variant="section.catSliderItem">
//       <Div
//         className={`${styles.sliderItem}`}
//         style={{
//           // paddingRight: '0px',
//           backgroundColor: "#F5F5F5",
//           width: "90%",
//           display: "flex",
//           flexDirection: "row",
//           flexWrap: "wrap",
//           justifyContent: "space-evenly",
//           alignItems: "center",
//           margin: "20px 5% 0 5%"
//           // pointerEvents: ['/modular-wardrobe'].includes(data.url_key) ? 'none' : ''
//         }}
//       >
//         {/* <Link
//           className={styles.link}
//           to={data.url_key}
//           onClick={() => {
//             sessionStorage.setItem("scrollPosition", window.pageYOffset);
//           }}
//         > */}
//         <div
//           style={{
//             width: "30rem",
//             display: "flex",

//             flexDirection: "column",
//             alignItems: "flex-start",
//             justifyContent: "flex-start",
//             margin: "30px 0px 0px 0px"
//           }}
//         >
//           <Image
//             className="shopByRoom"
//             src={data.image}
//             height="auto"
//             width="90%"
//             style={{ zIndex: 10 }}
//           />

//           <HeadingHtV1
//             fontFamily="medium"
//             style={{ textAlign: "center", color: "#323131" }}
//             fontSize="20px"
//             mt="20px"
//             mb="10px"
//           >
//             {data.title}
//           </HeadingHtV1>
//           <p className="description">{data.description}</p>
//           <div className="shop-by-room-button">
//             EXPLORE
//             {/* <img
//               style={{
//                 display: "inline",
//                 marginLeft: "-3px",
//                 height: "10px",
//                 width: "40px"
//               }}
//               src={arrowForward}
//               alt="Arrow"
//             /> */}
//           </div>
//         </div>
//         {/* </Link> */}
//       </Div>
//     </Box>
//   );
// };

// export default DBItem;
