import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Div from 'hometown-components-dev/lib/Div';
import Row from 'hometown-components-dev/lib/Row';
import Img from 'hometown-components-dev/lib/Img';
import Section from 'hometown-components-dev/lib/Section';
import Container from 'hometown-components-dev/lib/Container';
import { Label } from 'hometown-components-dev/lib/Label';
import ImageShimmer from 'hometown-components-dev/lib/ImageShimmer';
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
const CategoryBar = ({ categoryBar, pathname }) => {
  if (pathname[pathname.length - 1] === '/') {
    pathname = pathname.slice(0, -1);
  }
  return (
    <Section mb="0" p="0">
      <Container>
        <Row justifyContent="center" className="categoryBarCarousel" mt="0" mb="-1rem">
          <SlickSlider settings={adjustSlides()}>
            {categoryBar &&
              categoryBar
                .filter(list => list.show_l4 === '1')
                .map((item, index) => (
                  <Div
                    key={String(index)}
                    className={`${styles.categoryBlock} ${pathname === `/${item.url_key}` ? styles.active : ''}`}
                    col="12"
                    display="flex"
                    pb="0.625rem"
                    pt="0.625rem"
                  >
                    <Link to={`/${formatLink(item.url_key)}`} key={item.name}>
                      <ImageShimmer src={item.icon_url} height="80px">
                        {imageURL => <Img width="80px" m="auto" src={imageURL} alt={item.name} />}
                      </ImageShimmer>
                      <Label mt="0" mb="0" display="block" ta="center">
                        {item.name}
                      </Label>
                    </Link>
                  </Div>
                ))}
          </SlickSlider>
        </Row>
      </Container>
    </Section>
  );
};

CategoryBar.defaultProps = {
  categoryBar: [],
  pathname: ' '
};
CategoryBar.propTypes = {
  categoryBar: PropTypes.array,
  pathname: PropTypes.string
};
export default CategoryBar;
