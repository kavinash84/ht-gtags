import React, { Component } from "react";
// import PropTypes from "prop-types";
// import { Link } from "react-router-dom";
// // import Box from "hometown-components/lib/Div";
// // import Image from "hometown-components/lib/Img";
// // import Text from 'hometown-components/lib/Text';
// import TextHtV1 from "hometown-components-dev/lib/TextHtV1";
// import ReactStars from "react-stars";
// import Img from "hometown-components-dev/lib/Img";

// import "./CategoryCarousel.css";

// // const arrowForward = require("../../../static");

// const CategoryItem = ({
//   image,
//   name,
//   url,
//   discount,
//   offerPrice,
//   maxPrice,
//   rating,
//   coupon,
//   couponSticker,
//   subHeading,
//   description
// }) => (
//   // if (url) {
//   //   return (
//   //     <Box>
//   //       {console.log(subHeading, 'subHeading')}
//   //       <Link to={url}>
//   //         {image ? (
//   //           <div style={{ position: 'relative' }}>
//   //             <Image src={image} alt={name} />
//   //             {coupon && <div className="coupon">{coupon}</div>}
//   //             {couponSticker && <div className="couponSticker">{couponSticker}</div>}
//   //           </div>
//   //         ) : null}

//   //         {subHeading ? (
//   //           <Text textAlign="left" variant="catSliderDiscount" mt={[10, 10, 16]}>
//   //             {subHeading}
//   //           </Text>
//   //         ) : null}

//   //         {description ? (
//   //           <Text textAlign="left" mt={[10, 10, 16]}>
//   //             {description}
//   //           </Text>
//   //         ) : null}

//   //         {discount ? (
//   //           <Text textAlign="center" variant="catSliderDiscount" mt={[10, 10, 16]}>
//   //             {discount}
//   //           </Text>
//   //         ) : null}
//   //         {name ? (
//   //           <Text
//   //             textAlign="center"
//   //             sx={{ textTransform: 'uppercase', color: 'black' }}
//   //             fontSize="0.7rem"
//   //             mt={12}
//   //             mb={3}
//   //           >
//   //             {name.split('').length > 20 ? `${name.slice(0, 20)}..` : name}
//   //           </Text>
//   //         ) : null}
//   //         {maxPrice && offerPrice ? (
//   //           <div>
//   //             <p
//   //               style={{
//   //                 fontSize: '0.7rem',
//   //                 textDecoration: 'line-through',
//   //                 textAlign: 'center',
//   //                 lineHeight: '1rem'
//   //               }}
//   //             >
//   //               MRP: {maxPrice}
//   //             </p>
//   //             <p
//   //               style={{
//   //                 fontSize: '0.8rem',
//   //                 textDecoration: 'none',
//   //                 textAlign: 'center',
//   //                 fontWeight: 'bold'
//   //               }}
//   //             >
//   //               OfferPrice: {offerPrice}
//   //             </p>
//   //           </div>
//   //         ) : null}
//   //         {rating ? (
//   //           <div className="starContainer">
//   //             <ReactStars classNames="reactStars" count={5} size={16} value={rating} half={false} color2="#f15a22" />
//   //           </div>
//   //         ) : null}
//   //       </Link>
//   //     </Box>
//   //   );
//   // }
//   <div style={{ position: "relative" }}>
//     {image ? (
//       <div style={{ position: "relative", marginBottom: "25px" }}>
//         <Img src={image} alt={name} height="auto" />
//         {coupon && <div className="coupon">{coupon}</div>}
//         {couponSticker && <div className="couponSticker">{couponSticker}</div>}
//       </div>
//     ) : null}
//     {subHeading ? (
//       <TextHtV1
//         ta="left"
//         style={{ fontWeight: "bold" }}
//         fontSize="16px"
//         mt={[10, 10, 16]}
//       >
//         {subHeading}
//       </TextHtV1>
//     ) : null}
//     {description ? (
//       <TextHtV1
//         ta="left"
//         mt={[10, 10, 16]}
//         lineHeight="1.5rem"
//         style={{ color: "#383838", letterSpacing: "1px", height: "150px" }}
//         fontWeight="bold"
//         fontSize="14px"
//       >
//         {description}
//       </TextHtV1>
//     ) : null}
//     {discount ? (
//       <TextHtV1 textAlign="center" variant="catSliderDiscount" mt={16}>
//         {discount}
//       </TextHtV1>
//     ) : null}
//     {name ? (
//       <TextHtV1
//         textAlign="center"
//         sx={{ textTransform: "uppercase", color: "black" }}
//         fontSize="0.7rem"
//         mt={12}
//         mb={3}
//       >
//         {`${name.slice(0, 20)}..`}
//       </TextHtV1>
//     ) : null}
//     {maxPrice && offerPrice ? (
//       <div>
//         <p
//           style={{
//             fontSize: "0.7rem",
//             textDecoration: "line-through",
//             textAlign: "center",
//             lineHeight: "1rem"
//           }}
//         >
//           MRP: {maxPrice}
//         </p>
//         <p
//           style={{
//             fontSize: "0.8rem",
//             textDecoration: "none",
//             textAlign: "center",
//             fontWeight: "bold"
//           }}
//         >
//           OfferPrice: {offerPrice}
//         </p>
//       </div>
//     ) : null}
//     {rating ? (
//       <div className="starContainer">
//         <ReactStars
//           classNames="reactStars"
//           count={5}
//           size={16}
//           value={rating}
//           half={false}
//           color2="#f15a22"
//         />
//         <label style={{ fontSize: "0.8rem", paddingTop: "2px" }}>
//           ({rating})
//         </label>
//       </div>
//     ) : null}
//     {url ? (
//       <Link
//         to={url}
//         style={{
//           fontSize: "12px",
//           fontWeight: "bold",
//           display: " inline-block"
//         }}
//       >
//         EXPLORE{" "}
//         <img
//           style={{
//             display: "inline",
//             marginBottom: "0px",
//             marginLeft: "-8px",
//             height: "10px",
//             width: "40px"
//           }}
//           src={arrowForward}
//           alt="Arrow"
//         />
//       </Link>
//     ) : null}
//   </div>
// );
// CategoryItem.defaultProps = {
//   image: "",
//   name: "",
//   url: "",
//   discount: "",
//   offerPrice: "",
//   maxPrice: "",
//   rating: 0,
//   coupon: "",
//   couponSticker: "",
//   subHeading: "",
//   description: ""
// };

// CategoryItem.propTypes = {
//   image: PropTypes.string,
//   name: PropTypes.string,
//   url: PropTypes.string,
//   discount: PropTypes.string,
//   offerPrice: PropTypes.string,
//   maxPrice: PropTypes.string,
//   rating: PropTypes.number,
//   coupon: PropTypes.string,
//   couponSticker: PropTypes.string,
//   subHeading: PropTypes.string,
//   description: PropTypes.string
// };

// export default CategoryItem;
class CategoryItem extends Component {
  render() {
    return <div></div>;
  }
}

export default CategoryItem;
