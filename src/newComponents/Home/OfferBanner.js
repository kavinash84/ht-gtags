import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Container from 'hometown-components-dev/lib/ContainerHtV1';
import Section from 'hometown-components-dev/lib/SectionHtV1';
import Row from 'hometown-components-dev/lib/RowHtV1';
import Col from 'hometown-components-dev/lib/ColHtV1';
import Image from 'hometown-components-dev/lib/ImageHtV1';

const OfferBanner = ({
 image, url, target, variant
}) => (
  <Section>
    <Container>
      <Row>
        <Col>
          {target ? (
            <a href={url} target={target} rel="noopener noreferrer">
              <Image src={image} variant={variant} />
            </a>
          ) : (
            <Link to={url}>
              <Image src={image} variant="image" />
            </Link>
          )}
        </Col>
      </Row>
    </Container>
  </Section>
);

OfferBanner.defaultProps = {
  image: '',
  url: '',
  target: '',
  variant: ''
};

OfferBanner.propTypes = {
  image: PropTypes.string,
  url: PropTypes.string,
  target: PropTypes.string,
  variant: PropTypes.string
};

export default OfferBanner;
