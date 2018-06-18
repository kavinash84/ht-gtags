import React from 'react';
// import PropTypes from 'prop-types';
import Div from 'hometown-components/lib/Div';
import Row from 'hometown-components/lib/Row';
import { Label } from 'hometown-components/lib/Label';

const CategoryFilters = () => (
  <Row display="block">
    <Div>
      <Label>Categories</Label>
      <Label>Shoe Rack</Label>
      <Label>TV Units & Cabinets</Label>
      <Label>Showcases</Label>
      <Label>Cabinets</Label>
      <Label>Beds</Label>
      <Label>Sofas</Label>
      <Label>Wardrobes</Label>
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
