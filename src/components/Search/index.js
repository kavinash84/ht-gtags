import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Input from 'hometown-components/lib/Input';
import Button from 'hometown-components/lib/Buttons';
import Div from 'hometown-components/lib/Div';
import * as actionCreators from 'redux/modules/search';

const styles = require('./Search.scss');
const SearchIcon = require('../../../static/search-icon.svg');
const CloseIcon = require('../../../static/close-icon.svg');

const eventDispatcher = dispatcher => e => {
  e.preventDefault();
  dispatcher();
};

const hideResults = dispatcher => e => {
  e.preventDefault();
  if (window) window.setTimeout(dispatcher, 500);
};

const onChange = (dispatcher, load) => e => {
  const { target: { value } } = e;
  dispatcher(value);
  if (value.length >= 2) load(value);
};

const onSubmit = (searchQuery, history) => e => {
  e.preventDefault();
  return history.push(`/search/?q=${searchQuery}`);
};

const mapStateToProps = ({ search }) => ({
  ...search
});

const mapDispatchToProps = dispatch => bindActionCreators({ ...actionCreators }, dispatch);

const Search = ({
  setSearchQuery,
  searchQuery,
  load,
  loading,
  loaded,
  results,
  showResultsonFocus,
  hideResultsonBlur,
  clearSearchQuery,
  showResults,
  history
}) => (
  <Div className={styles.search} pt="0" pb="0.3125rem">
    <form onSubmit={onSubmit(searchQuery, history)}>
      <Input
        type="text"
        placeholder="Search"
        backgroundColor="rgba(0, 0, 0, 0.05)"
        borderColor="rgba(0, 0, 0, 0.03)"
        height="2.5rem"
        onChange={onChange(setSearchQuery, load)}
        onFocus={eventDispatcher(showResultsonFocus)}
        onBlur={hideResults(hideResultsonBlur)}
        value={searchQuery}
      />
    </form>
    {searchQuery === '' ? (
      <img src={SearchIcon} className={styles.searchIcon} alt="Search" />
    ) : (
      <Button
        className={styles.closeBtn}
        onClick={eventDispatcher(clearSearchQuery)}
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
        showResults &&
        results.length > 0 && (
        <ul>
          {results.map((item, index) => (
            <li key={String(index)}>
              <Link to={item.url_key}>{item.name}</Link>
            </li>
          ))}
        </ul>
      )}
    </Div>
  </Div>
);

Search.defaultProps = {
  searchQuery: '',
  loading: false,
  loaded: false,
  results: [],
  showResults: false
};

Search.propTypes = {
  searchQuery: PropTypes.string,
  showResults: PropTypes.bool,
  loading: PropTypes.bool,
  loaded: PropTypes.bool,
  results: PropTypes.array,
  load: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  showResultsonFocus: PropTypes.func.isRequired,
  hideResultsonBlur: PropTypes.func.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
  clearSearchQuery: PropTypes.func.isRequired
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Search));
