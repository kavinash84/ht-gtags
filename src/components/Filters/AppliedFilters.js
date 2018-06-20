import React from 'react';
import PropTypes from 'prop-types';
import Button from 'hometown-components/lib/Buttons';

const styles = require('./AppliedFilters.scss');

const AppliedFilters = ({ data, onClickClearFilter }) => (
  <div className={styles.appliedFilters}>
    <ul>
      {data.map(item => item.map(x => <li key={x.value}>{x.value}</li>))}
      <li>
        Clear All Filters
        <Button
          btnType="custom"
          bg="#ffffff"
          color="#5e5e5e"
          border="none"
          ml="0.625rem"
          p="8px 4px"
          lh="0"
          height="15px"
          mt="-1px"
          onClick={onClickClearFilter}
        >
          ×
        </Button>
      </li>
    </ul>
  </div>
);

AppliedFilters.defaultProps = {
  data: []
};

AppliedFilters.propTypes = {
  data: PropTypes.array,
  onClickClearFilter: PropTypes.func.isRequired
};

export default AppliedFilters;
