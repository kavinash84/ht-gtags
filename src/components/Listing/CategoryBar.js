import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Img from 'hometown-components-dev/lib/ImageHtV1';
import Section from 'hometown-components-dev/lib/SectionHtV1';
import Container from 'hometown-components-dev/lib/ContainerHtV1';
import Label from 'hometown-components-dev/lib/LabelHtV1';
import ImageShimmer from 'hometown-components-dev/lib/ImageShimmerHtV1';
import SlickSlider from '../SlickSlider';

const styles = require('./CategoryBar.scss');

const adjustSlides = () => ({
  slidesToShow: 8,
  slidesToScroll: 1,
  autoplay: false,
  infinite: false
});
const cleanTail = url => {
  if (url[url.length - 1] === '/') {
    return url.substring(0, url.length - 1);
  }
  return url;
};
const formatLink = url => {
  const paramLink = url.split('/').filter(z => z !== '');
  if (paramLink.length >= 4) {
    paramLink.splice(1, 1);
  }
  const newLink = paramLink.join('/');
  const sanitizedUrl = cleanTail(newLink);
  const newURL = sanitizedUrl.replace('catalog/', '');
  return newURL;
};
const CategoryBar = ({
 categoryBar, pathname, handleCategoryClick, ...props
}) => {
  if (pathname[pathname.length - 1] === '/') {
    pathname = pathname.slice(0, -1);
  }
  return (
    <div>
      {props.display !== 'none' && (
        <Section my={0} p={0}>
          <Container className="categoryBarCarousel">
            <SlickSlider settings={adjustSlides()}>
              {categoryBar &&
                categoryBar
                  .filter(list => list.show_l4 === '1')
                  .map((item, index) => (
                    <Box
                      key={String(index)}
                      className={`${styles.categoryBlock} ${pathname === `/${item.url_key}` ? styles.active : ''}`}
                      py={10}
                      px={20}
                      sx={{ textAlign: 'center' }}
                    >
                      <Link to={`/${formatLink(item.url_key)}`} key={item.name} onClick={handleCategoryClick}>
                        <ImageShimmer src={item.icon_url} height="80px">
                          {imageURL => <Img width="80px" m="auto" src={imageURL} alt={item.name} />}
                        </ImageShimmer>
                        <Label my={0} sx={{ textAlign: 'center', fontSize: 14, lineHeight: 1.3 }}>
                          {item.name}
                        </Label>
                      </Link>
                    </Box>
                  ))}
            </SlickSlider>
          </Container>
        </Section>
      )}
    </div>
  );
};

CategoryBar.defaultProps = {
  categoryBar: [],
  pathname: ' ',
  display: 'block'
};
CategoryBar.propTypes = {
  categoryBar: PropTypes.array,
  pathname: PropTypes.string,
  handleCategoryClick: PropTypes.func.isRequired,
  display: PropTypes.string
};
export default CategoryBar;
