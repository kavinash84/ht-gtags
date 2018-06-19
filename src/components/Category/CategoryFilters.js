import React from 'react';
import PropTypes from 'prop-types';
import Div from 'hometown-components/lib/Div';
import Row from 'hometown-components/lib/Row';
import { Link } from 'react-router-dom';
import { Label } from 'hometown-components/lib/Label';

const CategoryFilters = ({ data }) => {
  console.log(data);
  return (
    <Row display="block" ml="0" mr="0">
      <Div>
        <Label color="textDark" mb="1rem" fontWeight="medium" display="block">
          Categories
        </Label>
        {data.map(sub => (
          <Label key={sub.id} color="textLight" mt="0.625rem" mb="0.625rem" display="block">
            <Link to={sub.url_key}>{sub.name}</Link>
          </Label>
        ))}
      </Div>
    </Row>
  );
};

CategoryFilters.defaultProps = {
  data: []
};

CategoryFilters.propTypes = {
  data: PropTypes.array
};

export default CategoryFilters;
