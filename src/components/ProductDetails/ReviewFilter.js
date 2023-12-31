import React, { Component } from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';

/** Components */
import Box from 'hometown-components-dev/lib/BoxHtV1';

class ReviewFilter extends Component {
  constructor(props) {
    super(props);
    this.reviewOptions = [
      { value: 'All-ratings', label: 'All ratings' },
      { value: '1-Star', label: '1-Star' },
      { value: '2-Star', label: '2-Star' },
      { value: '3-Star', label: '3-Star' },
      { value: '4-Star', label: '4-Star' },
      { value: '5-Star', label: '5-Star' }
    ];
  }

  render() {
    const { selectedFilterProp, onFilterChange } = this.props;

    return (
      <Box width={240} ml={16}>
        <Select
          placeholder="Filter By Ratings"
          defaultValue={null}
          value={selectedFilterProp}
          onChange={onFilterChange}
          options={this.reviewOptions}
        />
      </Box>
    );
  }
}
ReviewFilter.defaultProps = {
  selectedFilterProp: ''
};

ReviewFilter.propTypes = {
  selectedFilterProp: PropTypes.string,
  onFilterChange: PropTypes.func.isRequired
};

export default ReviewFilter;
