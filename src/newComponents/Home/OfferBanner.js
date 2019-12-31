import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Container from 'hometown-components-dev/lib/ContainerHtV1';
import Section from 'hometown-components-dev/lib/SectionHtV1';
import Row from 'hometown-components-dev/lib/RowHtV1';
// import Col from 'hometown-components-dev/lib/ColHtV1';
import Image from 'hometown-components-dev/lib/ImageHtV1';

const OfferBanner = ({ image, url, target }) => (
  <Section>
    <Container>
      <Row>
        {target ? (
          <a style={{ width: '100%', height: 'auto' }} href={url} target={target} rel="noopener noreferrer">
            <Image src={image} variant="image" />
          </a>
        ) : (
          <Link style={{ width: '100%', height: 'auto' }} to={url}>
            <Image sx={{ width: '100%', height: 'auto' }} src={image} variant="image" />
          </Link>
        )}
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
