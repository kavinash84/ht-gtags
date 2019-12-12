import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Container from 'hometown-components-dev/lib/Container';
import Section from 'hometown-components-dev/lib/Section';
import Row from 'hometown-components-dev/lib/Row';
import Img from 'hometown-components-dev/lib/Img';
import Div from 'hometown-components-dev/lib/Div';

const OfferBanner = ({ image, url, target }) => (
  <Section mt="1.5rem" mb="0.5rem">
    <Container pr="0" pl="0">
      <Row ml="0.3125rem" mr="0.3125rem">
        <Div>
          {target ? (
            <a href={url} target={target} rel="noopener noreferrer">
              <Img src={image} alt="" />
            </a>
          ) : (
            <Link to={url}>
              <Img src={image} alt="" />
            </Link>
          )}
        </Div>
      </Row>
    </Container>
  </Section>
);

OfferBanner.defaultProps = {
  image: '',
  url: '',
  target: ''
};

OfferBanner.propTypes = {
  image: PropTypes.string,
  url: PropTypes.string,
  target: PropTypes.string
};

export default OfferBanner;
