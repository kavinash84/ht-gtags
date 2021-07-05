import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Image from 'hometown-components-dev/lib/ImageHtV1';
import Text from 'hometown-components-dev/lib/TextHtV1';

const BrandCategories = ({ brandCategories }) => (
  <Fragment>
    {brandCategories.map(category => (
      <Box variant="col-3" pl={5} pr={5}>
        <Link to={category.url}>
          <Image src={category.image_url} />
        </Link>
        <Text textAlign="center" p={10} fontSize={24}>
          {category.name}
        </Text>
      </Box>
    ))}
  </Fragment>
);

BrandCategories.propTypes = {
  brandCategories: PropTypes.array.isRequired
};

export default BrandCategories;
