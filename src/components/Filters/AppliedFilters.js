import React from 'react';
// import PropTypes from 'prop-types';
import Button from 'hometown-components/lib/Buttons';

const styles = require('./AppliedFilters.scss');

const AppliedFilters = () => (
  <div className={styles.appliedFilters}>
    <ul>
      <li>
        One Seater Sofas
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
        >
          ×
        </Button>
      </li>
      <li>
        One Seater Sofas
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
        >
          ×
        </Button>
      </li>
    </ul>
  </div>
);

AppliedFilters.defaultProps = {
  // data: ''
};

AppliedFilters.propTypes = {
  // data: PropTypes.object
};

export default AppliedFilters;
