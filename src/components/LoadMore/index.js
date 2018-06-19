import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { load } from 'redux/modules/products';
import { loadMore } from 'redux/modules/loadmore';
import { getProducts, getProductCount } from 'selectors/products';

const styles = require('./Loadmore.scss');

const showLoadMore = (total, count) => Math.ceil(Number(total) / count);

const onClickLoadMore = (nextPageDispatcher, loadProducts, pageNo, query, sort) => e => {
  e.preventDefault();
  nextPageDispatcher();
  loadProducts(query, Number(pageNo) + 1, sort);
};

const mapStateToProps = state => ({
  currentPageCount: state.loadmore.page,
  query: state.products.query,
  sort: state.products.sort,
  resultsCount: getProducts(state).length,
  productCount: getProductCount(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({ nextPage: loadMore, loadMoreProducts: load }, dispatch);

const LoadMore = ({
  nextPage,
  loading,
  productCount,
  currentPageCount,
  resultsCount,
  loadMoreProducts,
  query,
  sort
}) => {
  const showMore = showLoadMore(productCount, resultsCount);
  return (
    <div className={styles.loadMoreWrapper}>
      {showMore > 1 ? (
        <button onClick={onClickLoadMore(nextPage, loadMoreProducts, currentPageCount, query, sort)} disabled={loading}>
          <span className={styles.label}>Load More</span>
          {loading && (
            <svg x="0px" y="0px" width="24px" height="24px" viewBox="0 0 24 24" enableBackground="new 0 0 24 24">
              <g id="Bounding_Boxes">
                <path fill="none" d="M0,0h24v24H0V0z" />
              </g>
              {/* eslint-disable */}
              <g id="Rounded">
                <path
                  d="M17.65,6.35c-1.63-1.63-3.94-2.57-6.48-2.31c-3.67,0.37-6.69,3.35-7.1,7.02C3.52,15.91,7.27,20,12,20
            		c3.19,0,5.93-1.87,7.21-4.56c0.32-0.67-0.16-1.44-0.9-1.44h0c-0.37,0-0.72,0.2-0.88,0.53c-1.13,2.43-3.84,3.97-6.8,3.31
            		c-2.22-0.49-4.01-2.3-4.48-4.52C5.31,9.44,8.26,6,12,6c1.66,0,3.14,0.69,4.22,1.78l-1.51,1.51C14.08,9.92,14.52,11,15.41,11H19
            		c0.55,0,1-0.45,1-1V6.41c0-0.89-1.08-1.34-1.71-0.71L17.65,6.35z"
                />
              </g>
            </svg>
          )}
        </button>
      ) : (
        <div>Thats all folks !</div>
      )}
    </div>
  );
};

LoadMore.defaultProps = {
  loading: false,
  currentPageCount: 0,
  productCount: '',
  resultsCount: 0,
  query: '',
  sort: ''
};

LoadMore.propTypes = {
  loading: PropTypes.bool,
  currentPageCount: PropTypes.number,
  productCount: PropTypes.string,
  query: PropTypes.string,
  sort: PropTypes.string,
  nextPage: PropTypes.func.isRequired,
  loadMoreProducts: PropTypes.func.isRequired,
  resultsCount: PropTypes.number
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoadMore);
