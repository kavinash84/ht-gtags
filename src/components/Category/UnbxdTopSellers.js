import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class UnbxdTopSellers extends Component {
  componentDidMount() {
    this.setUnbxdCategory();
  }
  componentDidUpdate() {
    this.setUnbxdCategory();
  }
  setUnbxdCategory() {
    const { category } = this.props;
    window.UnbxdWidgetsConf = {
      category
    };
    if (window.refreshWidgets) window.refreshWidgets();
  }
  render() {
    return (
      <React.Fragment>
        <div id="unbxd_category_top_sellers" />
      </React.Fragment>
    );
  }
}
UnbxdTopSellers.defaultProps = {
  category: ''
};

UnbxdTopSellers.propTypes = {
  category: PropTypes.string
};
