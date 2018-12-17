import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Div from 'hometown-components/lib/Div';
import Row from 'hometown-components/lib/Row';
import Img from 'hometown-components/lib/Img';
import Section from 'hometown-components/lib/Section';
import Container from 'hometown-components/lib/Container';
import { Label } from 'hometown-components/lib/Label';
import SlickSlider from '../SlickSlider';

const styles = require('./CategoryBar.scss');

const adjustSlides = () => ({
  slidesToShow: 8,
  slidesToScroll: 1,
  autoplay: false,
  infinite: false
});

const CategoryBar = ({ categoryBar, pathname }) => {
  if (pathname[pathname.length - 1] === '/') {
    pathname = pathname.slice(0, -1);
  }
  return (
    <Section mb="0" p="0">
      <Container>
        <Row justifyContent="center" className="categoryBarCarousel" mt="0" mb="-1rem">
          {/*eslint-disable*/}
          <SlickSlider settings={adjustSlides()}>
            {categoryBar.map((item, index) => {
              if (item.show_l4 === '1') {
                return (
                  <Div
                    key={String(index)}
                    className={`${styles.categoryBlock} ${pathname === `/${item.url_key}` ? styles.active : ''}`}
                    col="12"
                    display="flex"
                    pb="0.625rem"
                    pt="0.625rem"
                  >
                    <Link to={`/${item.url_key}`} key={item.name}>
                      <Img width="80px" m="auto" src={item.icon_url ? item.icon_url : '/'} alt={item.name} />
                      <Label mt="0" mb="0" display="block" ta="center">
                        {item.name}
                      </Label>
                    </Link>
                  </Div>
                );
              }
            })}
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
