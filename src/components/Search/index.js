import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Input from 'hometown-components/lib/Input';
import Button from 'hometown-components/lib/Buttons';
import Div from 'hometown-components/lib/Div';
import * as actionCreators from 'redux/modules/search';

const styles = require('./Search.scss');
const SearchIcon = require('../../../static/search.jpg');
const CloseIcon = require('../../../static/close.jpg');

const clearSearch = dispatcher => e => {
  e.preventDefault();
  dispatcher();
};

const onChange = dispatcher => e => {
  const { target: { value } } = e;
  dispatcher(value);
};

const mapStateToProps = ({ search }) => ({
  ...search
});

const mapDispatchToProps = dispatch => bindActionCreators({ ...actionCreators }, dispatch);

const Search = ({
  setSearchQuery, searchQuery, loading, loaded, results, clearSearchQuery
}) => (
  <Div className={styles.search} pt="0" pb="0.3125rem">
    <Input
      type="text"
      placeholder="Search"
      backgroundColor="rgba(0, 0, 0, 0.05)"
      borderColor="rgba(0, 0, 0, 0.03)"
      height="2.5rem"
      onChange={onChange(setSearchQuery)}
      value={searchQuery}
    />
    {searchQuery === '' ? (
      <img src={SearchIcon} className={styles.searchIcon} alt="Search" />
    ) : (
      <Button
        className={styles.closeBtn}
        onClick={clearSearch(clearSearchQuery)}
        btnType="custom"
        bg="transparent"
        border="none"
        p="0"
      >
        <img src={CloseIcon} alt="Close" />
      </Button>
    )}
    <Div className={`${styles.searchList} ${styles.active}`}>
      {loading && (
        <ul>
          <li> Searching.... </li>
        </ul>
      )}
      {loaded &&
        results.length > 0 && (
        <ul>
          <li>
            <a href="#prod 1">Product 1</a>
          </li>
          <li>
            <a href="#prod 2">Product 2</a>
          </li>
          <li>
            <a href="#prod 3">Product 3</a>
          </li>
          <li>
            <a href="#prod 4">Product 4</a>
          </li>
          <li>
            <a href="#prod 5">Product 5</a>
          </li>
          <li>
            <a href="#prod 6">Product 6</a>
          </li>
          <li>
            <a href="#prod 7">Product 7</a>
          </li>
        </ul>
      )}
    </Div>
  </Div>
);

Search.defaultProps = {
  searchQuery: PropTypes.string,
  loading: PropTypes.bool,
  loaded: PropTypes.bool,
  results: PropTypes.array
};

Search.propTypes = {
  searchQuery: PropTypes.string,
  loading: PropTypes.bool,
  loaded: PropTypes.bool,
  results: PropTypes.array,
  setSearchQuery: PropTypes.func.isRequired,
  clearSearchQuery: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
