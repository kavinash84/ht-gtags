/* eslint-disable quotes */
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Heading from 'hometown-components-dev/lib/HeadingHtV1';
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Text from 'hometown-components-dev/lib/TextHtV1';
import Container from 'hometown-components-dev/lib/ContainerHtV1';
import Button from 'hometown-components-dev/lib/ButtonHtV1';
import Flex from 'hometown-components-dev/lib/FlexHtV1';
// import CategoryCarouselItem from 'components/CategoryCarousel/CategoryCarouselItem';
// import SlickSlider from 'components/SlickSlider';

// const popularCategories = [
//   {
//     image: 'https://static.hometown.in/media/product/14/1153/43705/1',
//     title: 'Lorem ipsum',
//     url_key: 'https://static.hometown.in/media/product/14/1153/43705/1'
//   },
//   {
//     image: 'https://static.hometown.in/media/product/14/1153/43705/1',
//     title: 'Lorem ipsum',
//     url_key: 'https://static.hometown.in/media/product/14/1153/43705/1'
//   },
//   {
//     image: 'https://static.hometown.in/media/product/14/1153/43705/1',
//     title: 'Lorem ipsum',
//     url_key: 'https://static.hometown.in/media/product/14/1153/43705/1'
//   },
//   {
//     image: 'https://static.hometown.in/media/product/14/1153/43705/1',
//     title: 'Lorem ipsum',
//     url_key: 'https://static.hometown.in/media/product/14/1153/43705/1'
//   },
//   {
//     image: 'https://static.hometown.in/media/product/14/1153/43705/1',
//     title: 'Lorem ipsum',
//     url_key: 'https://static.hometown.in/media/product/14/1153/43705/1'
//   }
// ];

// const adjustSlides = length => ({
//   slidesToShow: length >= 4 ? 4 : length,
//   slidesToScroll: 3,
//   autoplaySpeed: 5000
// });

const Empty = ({
 title, subTitle, btnName, url, children, subTitleWidth, ...props
}) => (
  <Container {...props}>
    <Flex flexDirection="column" justifyContent="center" alignItems="center" display="flex">
      <Box textAlign="center">
        {children}
        <Heading
          color="text"
          ellipsis={false}
          fontFamily="medium"
          textAlign="center"
          mb={10}
          mt={20}
          lh={1.5}
          fontSize={24}
        >
          {title}
        </Heading>
        <Text subTitleWidth={subTitleWidth} textAlign="center" fontFamily="light" fontSize={16} color="text">
          {subTitle}
        </Text>
      </Box>
      <Box
        width={1}
        mt={20}
        sx={{
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Button
          as={Link}
          to={url}
          py={15}
          height="auto"
          fontFamily="medium"
          sx={{
            height: '47px',
            width: '232px',
            textAlign: 'center'
          }}
        >
          {btnName}
        </Button>
      </Box>
    </Flex>
    {/* <Box>
      <Heading
        mt={66}
        mb={17}
        sx={{
          fontFamily: 'HelveticaNeue',
          fontSize: '22px',
          fontWeight: 'bold',
          textAlign: 'center',
          color: '#474747'
        }}
      >
        SHOP BY POPULAR CATEGORIES
      </Heading>
      <SlickSlider settings={adjustSlides(popularCategories.length)} className="categoryCarousel">
        {popularCategories.map((slide, index) => (
          <div key={String(index)}>
            <CategoryCarouselItem image={`${slide.image}-product_500.jpg  `} name={slide.title} url={slide.url_key} />
          </div>
        ))}
      </SlickSlider>
    </Box> */}
  </Container>
);

Empty.defaultProps = {
  subTitleWidth: '100%'
};

Empty.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  btnName: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  subTitleWidth: PropTypes.string,
  children: PropTypes.any.isRequired
};

export default Empty;
