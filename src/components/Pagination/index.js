import React, { Component } from 'react';
import Pager from 'react-js-pagination';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProductCount } from 'selectors/products';

@connect(state => ({
  location: state.router.location,
  productCount: getProductCount(state),
  pageno: state.pagination.page
}))
export default class Pagination extends Component {
  handleClick = pagenumber => {
    const { history } = this.props;
    history.push(`?page=${pagenumber}`);
  };

  render() {
    const { pageno, productCount, pageRangeDisplayed } = this.props;
    return (
      <div>
        <Pager
          activePage={pageno}
          itemsCountPerPage={30}
          totalItemsCount={productCount}
          pageRangeDisplayed={pageRangeDisplayed}
          onChange={this.handleClick}
        />
      </div>
    );
  }
}
Pagination.propTypes = {
  history: PropTypes.object.isRequired,
  pageno: PropTypes.number.isRequired,
  productCount: PropTypes.number.isRequired,
  pageRangeDisplayed: PropTypes.number.isRequired
};
