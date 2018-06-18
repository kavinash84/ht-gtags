import React from 'react';
// import PropTypes from 'prop-types';
import Div from 'hometown-components/lib/Div';
import Row from 'hometown-components/lib/Row';
import { Link } from 'react-router-dom';
import { Label } from 'hometown-components/lib/Label';

const CategoryFilters = () => (
  <Row display="block" ml="0" mr="0">
    <Div>
      <Label color="textDark" mb="1rem" fontWeight="medium" display="block">
        Categories
      </Label>

      <Label color="textLight" mt="0.625rem" mb="0.625rem" display="block">
        <Link to="/">Shoe Rack</Link>
      </Label>
      <Label color="textLight" mt="0.625rem" mb="0.625rem" display="block">
        <Link to="/">Beds</Link>
      </Label>
      <Label color="textLight" mt="0.625rem" mb="0.625rem" display="block">
        <Link to="/">Showcases</Link>
      </Label>
      <Label color="textLight" mt="0.625rem" mb="0.625rem" display="block">
        <Link to="/">Cabinets</Link>
      </Label>
    </Div>
  </Row>
);

CategoryFilters.defaultProps = {
  // data: ''
};

CategoryFilters.propTypes = {
  // data: PropTypes.object
};

export default CategoryFilters;
