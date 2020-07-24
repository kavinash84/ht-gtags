import React, { Component } from 'react';
import Select from 'react-select';

/** Components */
import Box from 'hometown-components-dev/lib/BoxHtV1';

class ReviewFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFilter: null
    };
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
    const { selectedFilterProp } = this.props;

    return (
      <Box width={1}>
        <Select
          placeholder="Select review"
          defaultValue={null}
          value={selectedFilterProp}
          onChange={this.props.onFilterChange}
          options={this.reviewOptions}
        />
      </Box>
    );
  }
}

export default ReviewFilter;
