import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Image from 'hometown-components-dev/lib/ImageHtV1';
import ImageShimmer from 'hometown-components-dev/lib/ImageShimmerHtV1';
import Row from 'hometown-components-dev/lib/RowHtV1';
import Section from 'hometown-components-dev/lib/SectionHtV1';
import Heading from 'hometown-components-dev/lib/HeadingHtV1';

function FreebieProduct({ bogoBundle: { image, link, name } }) {
  return (
    <Section mb="10px" p="0" mt="10px">
      <Row mr="0" ml="0" flexWrap="nowrap">
        <Box col="2">
          <Link to={link}>
            <ImageShimmer src={image} height={64}>
              {imageURL => (
                <Image
                  src={imageURL}
                  alt="buy one get one"
                  width="64px"
                  height="64px"
                  sx={{ border: 'secondaryLarge' }}
                />
              )}
            </ImageShimmer>
          </Link>
        </Box>
        <Box col="10" pl="12px">
          <Link to={link}>
            <Heading as="h6" fontSize="16px" color="primary" mb="0px" mt="0px">
              Get Free
            </Heading>
            <Heading as="h6" fontSize="16px" color="textDark" mb="0px" mt="5px">
              {name}
            </Heading>
          </Link>
        </Box>
      </Row>
    </Section>
  );
}

FreebieProduct.propTypes = {
  bogoBundle: PropTypes.object.isRequired
};

export default FreebieProduct;
