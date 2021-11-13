import React, { Component } from "react";
// import PropTypes from "prop-types";
// // import BoxHtV1 from "hometown-components/lib/Div";
// // import Heading from "hometown-components/lib/Heading";
// import HeadingHtV1 from "hometown-components-dev/lib/HeadingHtV1";

// import SlickSlider from "components/SlickSlider";
// import CategoryCarouselItem from "components/CategoryCarouselHome/CategoryCarouselItem";

// import "./CategoryCarousel.css";

// const adjustSlides = length => ({
//   slidesToShow: length >= 1 ? 1 : length,
//   slidesToScroll: 1,
//   autoplaySpeed: 5000,
//   autoplay: false,
//   dots: true,
//   arrows: false
// });

// export default class CategoryCarousel extends Component {
//   render() {
//     const { categoryName, data } = this.props;
//     return (
//       <div
//         p="20px 30px"
//         pt="30px"
//         mb="15px"
//         pb="40px"
//         style={{
//           backgroundImage: "linear-gradient(to right, #EAEAEA , white)",
//           display: "block"
//         }}
//       >
//         {(categoryName !== "" || categoryName !== null) && (
//           // <Title
//           //   title={categoryName}
//           //   // subTitle={subTitle}
//           //   headerProps={{
//           //     variant: 'heading.medium',
//           //     fontFamily: 'medium',
//           //     textAlign: 'center'
//           //   }}
//           //   subHeaderProps={{ textAlign: 'center' }}
//           //   // mb={5}
//           //   color="#323131"
//           //   fontWeight="bold"
//           //   fontSize="22px"
//           // />
//           <HeadingHtV1
//             fontFamily="medium"
//             style={{ textAlign: "center", color: "#323131" }}
//             fontSize="22px"
//             mt="0px"
//             mb="10px"
//           >
//             {categoryName}
//           </HeadingHtV1>
//         )}
//         <div
//           style={{
//             width: "30px",
//             borderTop: "2px solid #222222",
//             margin: "auto",
//             marginBottom: "20px"
//           }}
//         />
//         <SlickSlider className="mainSlider" settings={adjustSlides(8)}>
//           {data.map(slide => (
//             <CategoryCarouselItem
//               image={slide.image}
//               subHeading={slide.name}
//               description={slide.description}
//               url={slide.link}
//             />
//           ))}
//         </SlickSlider>
//       </div>
//     );
//   }
// }

// CategoryCarousel.defaultProps = {
//   data: [],
//   categoryName: ""
//   // subTitle: '',
//   // description: '',
//   // link: ''
// };

// CategoryCarousel.propTypes = {
//   data: PropTypes.array,
//   categoryName: PropTypes.string
//   // subTitle: PropTypes.string,
//   // description: PropTypes.string,
//   // link: PropTypes.string
// };
class CategoryCarousel extends Component {
  render() {
    return <div></div>;
  }
}

export default CategoryCarousel;
